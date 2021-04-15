import React, { useState, useEffect } from "react";
import SwitchBtn from "@material-ui/core/Switch";

const DarkModeBtn = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode"));

  useEffect(() => {
    if (darkMode === "dark") {
      localStorage.setItem("darkMode", "dark");
    } else {
      localStorage.setItem("darkMode", "light");
    }
  });
  return (
    <SwitchBtn
      checked={darkMode==="dark"}
      onChange={() => setDarkMode(darkMode => (darkMode === "dark" ? "light" : "dark")
      )}
    />
  );
};

export default DarkModeBtn;
