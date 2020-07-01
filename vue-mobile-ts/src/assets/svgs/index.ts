const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
const requireSvgs = require.context("./", true, /\.svg$/);
requireAll(requireSvgs);
