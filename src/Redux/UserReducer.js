const initialState = {
    id: localStorage.getItem("id") ? localStorage.getItem("id") : false,
    name: localStorage.getItem("name") ? localStorage.getItem("name") : false,
    email: localStorage.getItem("email") ? localStorage.getItem("email") : false,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : false,
  };
  
  const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_LOGIN":
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          token: action.payload.token,
          avatar_url: action.payload.avatar_url,
        };
  
      default:
        return state;
    }
  };
  
  export default UserReducer;
  