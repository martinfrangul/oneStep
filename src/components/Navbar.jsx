import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";
import { AlertContext } from "../context/AlertContext";
import { Settings, History, Volume2, VolumeX, Palette } from "lucide-react";

const Navbar = () => {
  const { setTheme, customColor, setCustomColor } = useContext(CounterContext);
  const alertCtx = useContext(AlertContext);

  // If Navbar is outside AlertContextProvider during transition, alertCtx might be undefined
  const soundToggle = alertCtx ? alertCtx.soundToggle : false;
  const setSoundToggle = alertCtx ? alertCtx.setSoundToggle : () => {};

  return (
    <header className="w-full flex items-center justify-between px-6 md:px-12 py-5 bg-transparent border-b border-theme-ui/10">
      {/* Brand Title */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold tracking-tight font-sans">
          oneStep<span className="text-theme-accent font-bold">.</span>
        </span>
      </div>

      {/* Right controls: Color Picker + Icons */}
      <div className="flex items-center gap-6">
        {/* Custom Color Selector */}
        <div className="relative w-8 h-8 flex items-center justify-center bg-theme-ui/35 rounded-full p-1 shadow-sm">
          <button
            onClick={() => document.getElementById("custom-color-picker").click()}
            className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-inner bg-gradient-to-tr from-red-400 via-green-400 to-blue-400"
            title="Choose custom background color"
            aria-label="Choose custom color"
          >
            <Palette className="h-3 w-3 text-white" />
          </button>
          <input
            id="custom-color-picker"
            type="color"
            value={customColor}
            onChange={(e) => {
              setTheme("custom");
              setCustomColor(e.target.value);
            }}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer pointer-events-none"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundToggle(!soundToggle)}
            className="p-2 rounded-full hover:bg-theme-ui/50 text-[var(--theme-text)] transition-all duration-200"
            title={soundToggle ? "Mute sounds" : "Enable sounds"}
            aria-label="Toggle alert sound"
          >
            {soundToggle ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5 opacity-60" />
            )}
          </button>

          {/* History */}
          <button
            onClick={() =>
              document.getElementById("completed-tasks-modal").showModal()
            }
            className="p-2 rounded-full hover:bg-theme-ui/50 text-[var(--theme-text)] transition-all duration-200"
            title="Completed tasks"
            aria-label="Show completed tasks"
          >
            <History className="h-5 w-5" />
          </button>

          {/* Settings */}
          <button
            onClick={() => document.getElementById("config-modal").showModal()}
            className="p-2 rounded-full hover:bg-theme-ui/50 text-[var(--theme-text)] transition-all duration-200"
            title="Timer settings"
            aria-label="Open settings configuration"
          >
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
