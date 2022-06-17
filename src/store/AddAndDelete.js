let cart = JSON.parse(localStorage.getItem("cart"));

const defaultState = {
  productsCount: cart ? cart.products.length : 0,
};

export const AddAndDelete = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_AND_DELETE":
      return {
        ...state,
        productsCount: action.payload,
      };
    default:
      return state;
  }
};
