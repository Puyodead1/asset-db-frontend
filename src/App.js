import React, { useEffect } from "react";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen";
import LoadingScreen from "./LoadingScreen";
import "./App.css";

export default function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const lsUser = localStorage.getItem("user");
    if (lsUser) {
      setUser(JSON.parse(lsUser));
      console.debug("Loaded user from local storage", lsUser);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.debug("Updated localstore user");
    }
  }, [user]);

  if (isLoading)
    return (
      <LoadingScreen
        size={150}
        color="#fff"
        isLoading={isLoading}
        className="main-loader"
      />
    );

  if (!user) return <LoginScreen setUser={setUser} />;

  return <MainScreen user={user} logout={logout} />;
}
