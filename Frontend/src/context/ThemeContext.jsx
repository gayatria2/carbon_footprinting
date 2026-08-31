import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(() => {

    const savedTheme =
      localStorage.getItem("appTheme");

    return savedTheme || "Light";

  });


  // =====================================================
  // APPLY THEME
  // =====================================================

  useEffect(() => {

    const root =
      document.documentElement;

    let appliedTheme = theme;


    // SYSTEM THEME
    if (theme === "System") {

      const isDark =
        window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;

      appliedTheme =
        isDark ? "Dark" : "Light";

    }


    // REMOVE OLD THEME
    root.classList.remove("dark");


    // ADD DARK
    if (appliedTheme === "Dark") {

      root.classList.add("dark");

    }


    // SAVE
    localStorage.setItem(
      "appTheme",
      theme
    );


  }, [theme]);


  // =====================================================
  // SYSTEM THEME LISTENER
  // =====================================================

  useEffect(() => {

    if (theme !== "System") {
      return;
    }


    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      );


    const handleSystemTheme = () => {

      const root =
        document.documentElement;


      root.classList.remove("dark");


      if (mediaQuery.matches) {

        root.classList.add("dark");

      }

    };


    handleSystemTheme();


    mediaQuery.addEventListener(
      "change",
      handleSystemTheme
    );


    return () => {

      mediaQuery.removeEventListener(
        "change",
        handleSystemTheme
      );

    };

  }, [theme]);


  return (

    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

};


// =====================================================
// CUSTOM HOOK
// =====================================================

export const useTheme = () => {

  const context =
    useContext(ThemeContext);


  if (!context) {

    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );

  }


  return context;

};