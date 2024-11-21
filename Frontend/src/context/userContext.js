import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({ name: "", password: "" });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
