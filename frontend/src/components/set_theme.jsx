import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

const useTheme = () => {

  const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [isDark, setIsDark] = useLocalStorage("isDark", systemPreference);

  useEffect(() => {
    setIsDark(systemPreference);
  }, [systemPreference, setIsDark]);

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
