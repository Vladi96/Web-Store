const initialState = {
  filters: {},
  userId: null,
  token: null,
  email: ""
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
    case "REMEVE_ALL_FILTERS":
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
    default:
      return { ...state };
  }
};

export default reducer;
