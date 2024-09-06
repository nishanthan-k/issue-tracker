import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { RxMoon as MoonIcon, RxSun as SunIcon } from "react-icons/rx";


const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      className="p-2"
    >
      {theme === "light" ? <MoonIcon size={18} /> : <SunIcon size={18} />}
    </button>
  );
};

export default ThemeChanger;
