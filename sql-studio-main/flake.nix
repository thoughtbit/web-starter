{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs = {
        nixpkgs.follows = "nixpkgs";
        flake-utils.follows = "flake-utils";
      };
    };
    crane = {
      url = "github:ipetkov/crane";
      inputs = {
        nixpkgs.follows = "nixpkgs";
      };
    };
  };
  outputs = { self, nixpkgs, flake-utils, rust-overlay, crane }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [ (import rust-overlay) ];
        pkgs = import nixpkgs {
          inherit system overlays;
        };

        rustToolchain = pkgs.rust-bin.stable.latest.default;
        craneLib = (crane.mkLib pkgs).overrideToolchain rustToolchain;

        src = pkgs.lib.cleanSourceWith {
          src = ./.;
          filter = path: type:
            (pkgs.lib.hasSuffix "\.css" path) ||
            (pkgs.lib.hasSuffix "\.js" path) ||
            (pkgs.lib.hasSuffix "\.svg" path) ||
            (pkgs.lib.hasSuffix "\.sqlite3" path) ||
            (craneLib.filterCargoSources path type)
          ;
        };
        commonArgs = {
          inherit src;
          buildInputs = [ pkgs.git ];
        };

        ui = pkgs.buildNpmPackage {
          pname = "ui";
          version = "0.0.0";
          src = ./ui;
          npmDepsHash = "sha256-Tu4ANFEne0eV2E6JEnRTz6PKh9TdPX6GL5HfIwAV3q0=";
          installPhase = ''
            cp -pr --reflink=auto -- dist "$out/"
          '';
        };

        cargoArtifacts = craneLib.buildDepsOnly commonArgs;
        bin = craneLib.buildPackage (commonArgs // {
          inherit cargoArtifacts;
          preBuild = ''
            cp -pr --reflink=auto -- ${ui} ui/dist
          '';
        });

        docker = pkgs.dockerTools.buildLayeredImage {
          name = "sql-studio";
          tag = "latest";
          created = "now";
          config.Cmd = [ "${bin}/bin/sql-studio" "--address=0.0.0.0:3030" "sqlite" "preview" ];
          config.Expose = "3030";
        };
      in
      {
        packages = {
          default = bin;
          docker = docker;
        };

        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.bacon
            pkgs.emmet-ls
            pkgs.cargo-dist
            pkgs.cargo-watch
            pkgs.rust-analyzer
            rustToolchain

            pkgs.nodejs
            pkgs.nodePackages.typescript-language-server
            pkgs.nodePackages.vscode-langservers-extracted
            pkgs.nodePackages."@tailwindcss/language-server"

            pkgs.httpie
            pkgs.sqlite
          ];
        };

        formatter = pkgs.nixpkgs-fmt;
      }
    );
}
