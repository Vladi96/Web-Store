const initialState = {
  filters: {},
  userId: null,
  token: null,
  email: "",
  cart: localStorage.cart ? localStorage.cart.split(",") : []
};

const reducer = (state = initialState, action) => {
  const filters = { ...state.filters };
  switch (action.type) {
    case "ADD_FILTER":
      const key = Object.keys(action.data)[0];
      const value = Object.values(action.data)[0];

      if (filters.hasOwnProperty(key)) {
        value.unshift(...filters[key]);
      }
      filters[key] = value;
      return {
        ...state,
        filters
      };

    case "REMOVE_FILTER": {
      const key = Object.keys(action.data)[0];
      const value = Object.values(action.data)[0];
      const filters = { ...state.filters };

      filters[key].splice(filters[key].indexOf(value), 1);

      if (filters[key].length < 1) {
        delete filters[key];
      }
      return {
        ...state,
        filters: { ...filters }
      };
    }
    case "REMOVE_ALL_FILTERS":
      return {
        ...state,
        filters: {}
      };

    case "SIGN_IN_USER":
      return {
        ...state,
        localId: action.data.localId,
        token: action.data.token,
        email: action.data.email
      };

    case "LOG_OUT_USER":
      localStorage.clear();
      return {
        ...state,
        userId: null,
        token: null,
        email: ""
      };

    case "MAKE_PURCHASE":
      const updatedPurchases = [...state.cart];
      updatedPurchases.push(action.data.productId);
      localStorage.setItem("cart", updatedPurchases);

      return {
        ...state,
        cart: updatedPurchases
      };

    case "REMOVE_PURCHASE":
      let updatedCart = [...state.cart];
      updatedCart.splice(updatedCart.indexOf(action.data.key), 1);

      localStorage.setItem("cart", updatedCart);
      return {
        ...state,
        cart: updatedCart
      };

    case "CHANGE_NUMBER_PRODUCT":
      let newUpdatedCart = [...state.cart];

      newUpdatedCart = newUpdatedCart.filter(el => el !== action.data.key);

      newUpdatedCart.push(
        ...Array(Number(action.data.newNumber)).fill(action.data.key)
      );
      localStorage.setItem("cart", newUpdatedCart);

      return {
        ...state,
        cart: newUpdatedCart
      };

    default:
      return { ...state };
  }
};

export default reducer;
