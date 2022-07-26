import {createContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {refreshToken} from "../Repository/UserApi";
import {useNavigate} from "react-router";

const AuthenticationContext = createContext({
  authenticated: false,
  setAuthenticated: () => {
  },
  logOut: () => {
  }
});

export function AuthenticationContextProvider({children}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["refresh", "access"]);
  const navigate = useNavigate();


  useEffect(() => {
    if (authenticated) {
      refreshToken(cookies.refresh)
        .then(res => setCookie("access", res.data.access, {path: "/"}))
        .catch(err => console.log(err));

      const thirtyMinutes = 1000 * 60 * 30;
      setInterval(() => {
        refreshToken(cookies.refresh)
          .then(res => setCookie("access", res.data.access, {path: "/"}))
          .catch(err => console.log(err));
      }, thirtyMinutes);
    }
  }, [authenticated, cookies.refresh, setCookie]);

  useEffect(() => {
    if (typeof cookies.access === "undefined" && typeof cookies.refresh === "undefined") {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, [cookies]);

  function logOut() {
    removeCookie('access', {path: '/'});
    removeCookie('refresh', {path: '/'});
    setAuthenticated(false);
    navigate('/');
  }

  const context = {
    authenticated, setAuthenticated, logOut
  }
  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext;