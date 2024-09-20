import styles from "./App.module.css";
import React, { useState } from "react";
import useLocalStorage from "use-local-storage";

import { Toggle } from "./components/Toggle/Toggle";
import { Navbar } from './components/Navbar/Navbar';
import { ConnectGoogle } from "./components/Account/Account";

function App() {
  const preference = window.matchMedia("prefers-color-scheme: dark)").matches;
  const [isDark, setisDark] = useLocalStorage("isDark", preference);

  return (
    <div className={styles.App} data-theme={isDark ? "dark" : "light"}>
      <Toggle style={{ visibility: 'hidden'}} isChecked={isDark} handleChange={() => setisDark(!isDark)} />
      <Navbar />
      <ConnectGoogle />
    </div>
  )
}

export default App
