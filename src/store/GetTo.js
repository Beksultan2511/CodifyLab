const defaultState = {
  toEdit: []
};
export const GetTo = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_TO_EDIT":
      return {
        ...state,
        toEdit: action.payload,
      };
    default:
      return state;
  }
};
