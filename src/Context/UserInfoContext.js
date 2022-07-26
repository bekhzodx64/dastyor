import {createContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import {getUserInfo} from "../Repository/UserApi";
import {useCookies} from "react-cookie";

const UserInfoContext = createContext({
  userInfo: [],
  setUserInfo: () => {
  }
});

export function UserInfoContextProvider({children}) {
  const [userInfo, setUserInfo] = useState([]);
  const [cookie] = useCookies(["access"]);

  useEffect(() => {
    if (cookie.access) {
      const {user_id} = jwt_decode(cookie.access);
      getUserInfo(user_id - 1)
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [cookie.access]);

  const context = {userInfo, setUserInfo}
  return (
    <UserInfoContext.Provider value={context}>
      {children}
    </UserInfoContext.Provider>
  )
}


export default UserInfoContext;