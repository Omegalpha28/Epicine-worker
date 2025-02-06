import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

const useTheme = () => {
  const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDark, setIsDark] = useLocalStorage("isDark", undefined);

  useEffect(() => {
    if (isDark === undefined) {
      setIsDark(systemPreference);
    }
  }, [isDark, systemPreference, setIsDark]);

  useEffect(() => {
    if (isDark === undefined) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (event) => {
        setIsDark(event.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, [isDark, setIsDark]);

  return [isDark, setIsDark];
};

export default useTheme;