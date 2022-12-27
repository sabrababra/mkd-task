import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      localStorage.setItem('role', action.payload.role);
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('state', JSON.stringify({
        isAuthenticated: true,
        user: action.payload.user_id,
        token: action.payload.token,
        role: action.payload.role,
      }));
      window.location.href = "/" + action.payload.role + "/dashboard";
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user_id,
        token: action.payload.token,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'STATE':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "LOGOUT",
    });
    window.location.href = "/" + role + "/login";
  }
};


const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const role = localStorage.getItem("role");

    console.log(state);
    dispatch({ type: 'STATE', payload: JSON.parse(localStorage.getItem('state')) })


    if (role) {
      sdk.check(role)
        .then(res => {
          console.log('check', res, state);
          dispatch({ type: 'STATE', payload: JSON.parse(localStorage.getItem('state')) });

        })
        .catch(error => {
          tokenExpireError(dispatch, error.message)
        })
    }

  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
