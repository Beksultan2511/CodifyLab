const defaultState = {
  book: null,
};

export const Get = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_BOOKS":
      return {
        ...state,
        book: action.payload,
      };
    default:
      return state;
  }
};
