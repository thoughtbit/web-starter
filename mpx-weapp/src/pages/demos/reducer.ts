export function countReducer(state: any, setState: any, action: any) {
  const { type } = action;

  switch (type) {
    case 'PLUS':
      setState(state.value + 1);
      break;
    case 'MINUS':
      setState(state.value - 1);
      break;
    default:
      break;
  }
}
