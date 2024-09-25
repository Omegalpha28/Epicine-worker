import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

const useTheme = () => {
  const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;

    console.log(systemPreference);
  const [isDark, setIsDark] = useLocalStorage("isDark", systemPreference);
  console.log("and");
  console.log(isDark);
  console.log("----------------------------");
  useEffect(() => {
    console.log("System preference changed:", systemPreference);
    setIsDark(systemPreference);
  }, [systemPreference, setIsDark]);

  console.log(systemPreference);
  console.log("------------------------------");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      setIsDark(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setIsDark]);
  return [isDark, setIsDark];
};

export default useTheme;
