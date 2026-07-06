import { useState, createContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import useLocalStorageState from "../hooks/useLocalStorageState";

const CounterContext = createContext();

const CounterContextProvider = ({ children }) => {
  const [mode, setMode] = useLocalStorageState("mode", "work");
  const [theme, setTheme] = useLocalStorageState("theme", "cream");
  const [customColor, setCustomColor] = useLocalStorageState("customColor", "#FDFBF7");
  const [counterLap, setCounterLap] = useLocalStorageState("counterLap", 4);
  const [initialCounterLap, setInitialCounterLap] = useLocalStorageState("initialCounterLap", 4);
  const [workMinutes, setWorkMinutes] = useLocalStorageState("workMinutes", 25);
  const [SRMinutes, setSRMinutes] = useLocalStorageState("SRMinutes", 5);
  const [LRMinutes, setLRMinutes] = useLocalStorageState("LRMinutes", 15);
  const [soundToggle, setSoundToggle] = useState(false);

  useEffect(() => {
    if (theme !== "custom") {
      document.documentElement.setAttribute("data-theme", theme);
      const properties = [
        "--theme-bg",
        "--theme-text",
        "--theme-candle",
        "--theme-accent",
        "--theme-card-bg",
        "--theme-btn-bg",
        "--theme-btn-hover",
        "--theme-shadow"
      ];
      properties.forEach(prop => document.documentElement.style.removeProperty(prop));
    } else {
      document.documentElement.setAttribute("data-theme", "custom");
      
      const hexToHsl = (hex) => {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
        
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
          h = s = 0;
        } else {
          let d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        
        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
      };

      const [H, S, L] = hexToHsl(customColor);
      const style = document.documentElement.style;

      if (L > 50) {
        style.setProperty("--theme-bg", `hsl(${H}, ${S}%, ${L}%)`);
        style.setProperty("--theme-text", `hsl(${H}, ${Math.max(10, S - 12)}%, 22%)`);
        style.setProperty("--theme-candle", `hsl(${(H + 180) % 360}, ${Math.max(40, S)}%, 65%)`);
        style.setProperty("--theme-accent", `hsl(${H}, 70%, 50%)`);
        style.setProperty("--theme-card-bg", `rgba(255, 255, 255, 0.4)`);
        style.setProperty("--theme-btn-bg", `hsl(${H}, ${S}%, ${Math.max(10, L - 7)}%)`);
        style.setProperty("--theme-btn-hover", `hsl(${H}, ${S}%, ${Math.max(10, L - 12)}%)`);
        style.setProperty("--theme-shadow", `0 10px 30px -10px hsla(${H}, ${S}%, 20%, 0.08)`);
      } else {
        style.setProperty("--theme-bg", `hsl(${H}, ${S}%, ${L}%)`);
        style.setProperty("--theme-text", `hsl(${H}, ${Math.min(20, S)}%, 90%)`);
        style.setProperty("--theme-candle", `hsl(${(H + 180) % 360}, ${Math.max(30, S)}%, 55%)`);
        style.setProperty("--theme-accent", `hsl(${H}, 80%, 65%)`);
        style.setProperty("--theme-card-bg", `rgba(0, 0, 0, 0.3)`);
        style.setProperty("--theme-btn-bg", `hsl(${H}, ${S}%, ${Math.min(95, L + 8)}%)`);
        style.setProperty("--theme-btn-hover", `hsl(${H}, ${S}%, ${Math.min(95, L + 14)}%)`);
        style.setProperty("--theme-shadow", `0 10px 30px -10px rgba(0, 0, 0, 0.3)`);
      }
    }
  }, [theme, customColor]);

  const modes = useMemo(() => ({
    work: { minutes: workMinutes, bgColor: "background-W" },
    shortBreak: { minutes: SRMinutes, bgColor: "background-SB" },
    longBreak: { minutes: LRMinutes, bgColor: "background-LB" },
  }), [workMinutes, SRMinutes, LRMinutes]);

  return (
    <CounterContext.Provider
      value={{
        mode,
        setMode,
        theme,
        setTheme,
        customColor,
        setCustomColor,
        counterLap,
        setCounterLap,
        modes,
        setWorkMinutes,
        setSRMinutes,
        setLRMinutes,
        workMinutes,
        SRMinutes,
        LRMinutes,
        initialCounterLap,
        setInitialCounterLap,
        soundToggle,
        setSoundToggle,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

CounterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CounterContext, CounterContextProvider };
