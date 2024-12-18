export type { CreateScope, Scope } from "./createContext";
export { createContext, createContextScope } from "./createContext";

/*
const AVATAR_NAME = 'Avatar';
const [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME, [createXxxxContext]);

type HoverAvatarContextValue = {
  open: boolean;
  onOpen(): void;
  onClose(): void;
};

const [HoverAvatarProvider, useHoverAvatarContext] = createAvatarContext<HoverAvatarContextValue>(AVATAR_NAME, {
    forceMount: undefined,
});

const context = useHoverAvatarContext(AVATAR_NAME, __scopeHoverCard);

<HoverAvatarProvider scope open onOpen={} onClose={}>
 {children}
</HoverAvatarProvider>
*/