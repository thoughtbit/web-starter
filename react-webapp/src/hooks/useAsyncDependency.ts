import useAsync from "./useAsync";

// Allows simple dynamic imports in the components
export const useAsyncDependency = (importStatement: Promise<any>) => {
  const state = useAsync(async () => {
    return await importStatement;
  });

  return {
    ...state,
    dependency: state.value,
  };
};


/*
export const ReactMonacoEditorLazy = (props: ReactMonacoEditorProps) => {
  const { loading, error, dependency } = useAsyncDependency(
    import('./ReactMonacoEditor')
    );

    if (loading) {
      return <LoadingPlaceholder text={''} />;
    }
  
    if (error) {
      return (
        <ErrorWithStack
          title="React Monaco Editor failed to load"
          error={error}
          errorInfo={{ componentStack: error?.stack || '' }}
        />
      );
    }
  
    const ReactMonacoEditor = dependency.ReactMonacoEditor;
    return <ReactMonacoEditor {...props} />;
  };
  Footer  
*/