import produce from "immer";

export const initialState = {
  data: null,
  error: null,
  isLoading: true,
};

const reducer = (state, action) =>
  produce(state, (draftState) => {
    switch (action.type) {
      case "GET_DATA": {
        draftState.isLoading = true;
        draftState.data = null;
        draftState.error = null;
        break;
      }
      case "GET_DATA_SUCCEEDED": {
        draftState.data = action.data;
        draftState.isLoading = false;
        draftState.error = null;
        break;
      }
      case "GET_DATA_ERROR": {
        draftState.isLoading = false;
        draftState.data = null;
        draftState.error = action.error;
        break;
      }
      default:
        return draftState;
    }
  });

export default reducer;
