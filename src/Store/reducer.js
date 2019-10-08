const initialState = {
  filters: {},
  userId: localStorage.localId ? localStorage.localId : "",
  token: localStorage.token ? localStorage.token : "",
  email: "",
  cart: localStorage.cart ? localStorage.cart.split(",") : [],
  totalPrice: 0,
  productData: {}
};

const reducer = (state = initialState, action) => {
  const filters = { ...state.filters };
  let totalPrice = state.totalPrice;
  let cart = [...state.cart];
  let productData = { ...state.productData };

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
        userId: action.data.localId,
        token: action.data.token,
        email: action.data.email
      };

    case "LOG_OUT_USER":
      localStorage.clear();
      localStorage.setItem("cart", cart);
      return {
        ...state,
        userId: null,
        token: null,
        email: ""
      };

    case "MAKE_PURCHASE":
      cart.push(action.data.id);
      localStorage.setItem("cart", cart);
      totalPrice += action.data.price;

      productData[action.data.id] = action.data.productData;

      return {
        ...state,
        cart,
        totalPrice,
        productData
      };

    case "REMOVE_PURCHASE":
      totalPrice -= productData[action.data.key].productData.price;
      cart.splice(cart.indexOf(action.data.key), 1);

      if (!cart.includes(action.data.key)) {
        delete productData[action.data.key];
      }

      localStorage.setItem("cart", cart);
      return {
        ...state,
        cart,
        totalPrice,
        productData
      };

    case "CHANGE_NUMBER_PRODUCT":
      cart = cart.filter(el => el !== action.data.key);

      cart.push(...Array(Number(action.data.newNumber)).fill(action.data.key));

      totalPrice = 0;
      cart.forEach(el => {
        totalPrice += productData[el].productData.price;
      });

      localStorage.setItem("cart", cart);

      return {
        ...state,
        cart: cart,
        totalPrice
      };

    case "MAKE_ORDER":
      return { ...state, totalPrice: action.data.totalPrice };

    case "UPDATE_ORDER_DATA":
      totalPrice = action.data.totalPrice;
      productData = action.data.productData;

      return { ...state, totalPrice, productData };

    case "SUBMIT_ORDER":
      cart = [];
      totalPrice = 0;
      productData = {};
      localStorage.removeItem("cart");

      return {
        ...state,
        cart,
        totalPrice,
        productData
      };

    default:
      return { ...state };
  }
};

export default reducer;
