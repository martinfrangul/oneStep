import { motion } from "framer-motion";
import PropTypes from "prop-types";

const VisualTimer = ({ mode, minutes, seconds, totalMinutes, playPause }) => {
  // Calculate progress (from 1 to 0) and clamp it between 0 and 1
  const totalSeconds = totalMinutes * 60;
  const currentSeconds = minutes * 60 + seconds;
  const rawProgress = totalSeconds > 0 ? currentSeconds / totalSeconds : 0;
  const progress = Math.min(1, Math.max(0, rawProgress));

  // Candle height limits
  const maxCandleHeight = 90;
  const minCandleHeight = 15;
  const candleHeight =
    minCandleHeight + (maxCandleHeight - minCandleHeight) * progress;
  const candleY = 160 - candleHeight;

  // Incense stick limits (slanted stick from bottom-left to top-right)
  const stickBaseX = 80;
  const stickBaseY = 160;
  const stickMaxLenX = 50; // runs to x = 130
  const stickMaxLenY = 60; // runs to y = 100
  const stickTipX = stickBaseX + stickMaxLenX * progress;
  const stickTipY = stickBaseY - stickMaxLenY * progress;

  // Ash calculation: falls off every 33% burned
  const fallInterval = 0.33;
  const burned = 1 - progress;
  const ashPortion = burned % fallInterval;
  const ashTipProgress = Math.min(1, progress + ashPortion);
  const ashTipX = stickBaseX + stickMaxLenX * ashTipProgress;
  const ashTipY = stickBaseY - stickMaxLenY * ashTipProgress;
  const currentAshIndex = Math.floor(burned / fallInterval);
  
  // Coordinates for the currently falling piece
  const fallProgressBottom = 1 - currentAshIndex * fallInterval;
  const fallProgressTop = 1 - (currentAshIndex - 1) * fallInterval;
  const fallBottomX = stickBaseX + stickMaxLenX * fallProgressBottom;
  const fallBottomY = stickBaseY - stickMaxLenY * fallProgressBottom;
  const fallTopX = stickBaseX + stickMaxLenX * fallProgressTop;
  const fallTopY = stickBaseY - stickMaxLenY * fallProgressTop;

  // Tea Cup calculations
  const teaY = 148 - (148 - 106) * progress;
  const liquidLeft = 87 - (87 - 75) * progress;
  const liquidRight = 113 + (125 - 113) * progress;

  // Flicker animation variants for the candle flame
  const flameVariants = {
    flicker: {
      scaleY: [1, 1.08, 0.95, 1.05, 1],
      scaleX: [1, 0.92, 1.05, 0.95, 1],
      skewX: [0, 1.5, -1, 0.5, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    paused: {
      scaleY: 1,
      scaleX: 1,
      skewX: 0,
    },
  };

  return (
    <div className="w-full max-w-[220px] h-[220px] flex items-center justify-center mx-auto my-4 select-none">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="cup-interior">
            <path d="M 74 102 C 74 102, 76 148, 87 148 L 113 148 C 124 148, 126 102, 126 102 Z" />
          </clipPath>
        </defs>

        {/* WORK MODE: CANDLE */}
        {mode === "work" && (
          <g>
            {/* Candle Holder (Base Plate) */}
            <path
              d="M60 165 C 60 165, 100 178, 140 165"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-theme-text opacity-90"
            />
            <path
              d="M80 167 L 80 174 M 120 167 L 120 174"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-theme-text opacity-90"
            />

            {/* Melted Wax Puddle (grows slightly at the base as time passes) */}
            {progress < 0.95 && (
              <path
                d={`M 78 160 Q 100 ${162 + (1 - progress) * 4} 122 160 Q 100 157 78 160`}
                fill="currentColor"
                className="text-theme-candle opacity-80"
              />
            )}

            {/* Candle Body */}
            <motion.rect
              x="83"
              y={candleY}
              width="34"
              height={candleHeight}
              rx="4"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="3"
              className="text-theme-candle transition-all duration-300"
              style={{ stroke: "var(--theme-text)" }}
            />

            {/* Wick */}
            <line
              x1="100"
              y1={candleY}
              x2="100"
              y2={candleY - 9}
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-theme-text"
            />

            {/* Flame (Always rendered if there is time remaining; freezes on pause) */}
            {progress > 0 && (
              <motion.g
                variants={flameVariants}
                animate={playPause ? "flicker" : "paused"}
                style={{ originX: "100px", originY: `${candleY - 9}px` }}
              >
                {/* Flame Outer Glow */}
                <circle
                  cx="100"
                  cy={candleY - 18}
                  r="14"
                  fill="var(--theme-accent)"
                  className="opacity-20 blur-sm"
                />
                {/* Flame Outer Body */}
                <path
                  d={`M 100 ${candleY - 26} C 94 ${candleY - 17}, 93 ${candleY - 9}, 100 ${candleY - 9} C 107 ${candleY - 9}, 106 ${candleY - 17}, 100 ${candleY - 26} Z`}
                  fill="var(--theme-accent)"
                  className="opacity-90"
                />
                {/* Flame Inner Core */}
                <path
                  d={`M 100 ${candleY - 21} C 96 ${candleY - 15}, 96 ${candleY - 10}, 100 ${candleY - 10} C 104 ${candleY - 10}, 104 ${candleY - 15}, 100 ${candleY - 21} Z`}
                  fill="#FFF"
                  className="opacity-95"
                />
              </motion.g>
            )}

            {/* Small smoke trail when candle finishes completely */}
            {progress === 0 && (
              <motion.path
                d={`M 100 ${candleY - 9} Q 96 ${candleY - 19} 104 ${candleY - 29} T 98 ${candleY - 45}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-theme-text opacity-40"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            )}
          </g>
        )}

        {/* SHORT BREAK MODE: INCENSE */}
        {mode === "shortBreak" && (
          <g>
            {/* Incense Burner / Bowl */}
            <path
              d="M 50 162 Q 100 178 150 162 Q 100 168 50 162"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-theme-candle opacity-80"
              style={{ stroke: "var(--theme-text)" }}
            />
            <path
              d="M 75 165 L 70 174 M 125 165 L 130 174"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-theme-text"
            />

            {/* Incense Stick (Ash/Consumed part) - Grows as it burns, falls every 33% */}
            {progress < 1 && ashPortion > 0.005 && (
              <line
                x1={stickTipX}
                y1={stickTipY}
                x2={ashTipX}
                y2={ashTipY}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-theme-text opacity-25"
              />
            )}

            {/* Falling Ash Animation (Triggers when currentAshIndex changes) */}
            {currentAshIndex > 0 && progress > 0 && (
              <motion.line
                key={`falling-ash-${currentAshIndex}`}
                x1={fallBottomX}
                y1={fallBottomY}
                x2={fallTopX}
                y2={fallTopY}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-theme-text"
                initial={{ opacity: 0.25, y: 0, x: 0, rotate: 0 }}
                animate={
                  playPause
                    ? { opacity: 0, y: 60, x: -15, rotate: -25 }
                    : { opacity: 0.25, y: 0, x: 0, rotate: 0 }
                }
                transition={
                  playPause
                    ? { duration: 1.5, ease: "easeIn" }
                    : { duration: 0 }
                }
                style={{ originX: `${fallBottomX}px`, originY: `${fallBottomY}px` }}
              />
            )}

            {/* Incense Stick (Unconsumed part) - Shrinks as it burns */}
            <line
              x1={stickBaseX}
              y1={stickBaseY}
              x2={stickTipX}
              y2={stickTipY}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-theme-text"
            />

            {/* Glowing Red Ember Aura (Incandescent Glow) */}
            {progress > 0 && (
              <motion.circle
                cx={stickTipX}
                cy={stickTipY}
                fill="var(--theme-accent)"
                className="opacity-40 blur-[1.5px]"
                animate={{
                  r: playPause ? [6, 9, 6] : 6,
                }}
                transition={{
                  r: playPause ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 },
                }}
              />
            )}

            {/* Glowing Red Ember at the tip */}
            {progress > 0 && (
              <motion.circle
                cx={stickTipX}
                cy={stickTipY}
                fill="var(--theme-accent)"
                animate={{
                  r: playPause ? [3.5, 4.5, 3.5] : 3.5,
                  opacity: playPause ? [0.8, 1, 0.8] : 0.9,
                }}
                transition={{
                  r: playPause ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 },
                  opacity: playPause ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 },
                }}
              />
            )}

            {/* Wavy Smoke rising from the ember (freezes on pause) */}
            {progress > 0 && (
              <g transform={`translate(${stickTipX}, ${stickTipY})`}>
                <path
                  d="M 0 0 Q -10 -20 0 -40 T 5 -75"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-theme-text opacity-40 animate-smoke-1"
                  style={{ animationPlayState: playPause ? "running" : "paused" }}
                />
                <path
                  d="M 0 0 Q 12 -18 -3 -36 T -8 -68"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="text-theme-text opacity-30 animate-smoke-2"
                  style={{ animationPlayState: playPause ? "running" : "paused" }}
                />
              </g>
            )}
          </g>
        )}

        {/* LONG BREAK MODE: TEA CUP */}
        {mode === "longBreak" && (
          <g>
            {/* Saucer / Plate */}
            <path
              d="M 60 155 C 60 155, 100 168, 140 155"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-theme-text opacity-90"
            />

            {/* Tea Liquid (levels down with progress) */}
            {progress > 0 && (
              <rect
                x="70"
                y={teaY}
                width="60"
                height={150 - teaY}
                fill="currentColor"
                className="text-theme-candle opacity-80"
                clipPath="url(#cup-interior)"
              />
            )}

            {/* Tea Liquid Surface Line */}
            {progress > 0 && (
              <line
                x1={liquidLeft}
                y1={teaY}
                x2={liquidRight}
                y2={teaY}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-theme-text opacity-90"
              />
            )}

            {/* Tea Cup Body */}
            <path
              d="M 72 100 L 128 100 C 128 100, 126 150, 114 150 L 86 150 C 74 150, 72 100, 72 100 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="round"
              className="text-theme-text"
            />

            {/* Handle */}
            <path
              d="M 126 112 C 142 112, 142 138, 126 138"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-theme-text"
            />

            {/* Tea bag string & tag (loops over the rim) */}
            <path
              d="M 88 105 Q 78 90 70 102 L 64 118"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-theme-text opacity-70"
            />
            <rect
              x="60"
              y="118"
              width="8"
              height="10"
              rx="1"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
              className="text-theme-candle"
              style={{ stroke: "var(--theme-text)" }}
            />

            {/* Steam rising (only if progress > 0, freezes on pause) */}
            {progress > 0 && (
              <g>
                <path
                  d="M 92 92 Q 86 78 94 65 T 90 45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-theme-text opacity-40 animate-steam-1"
                  style={{ animationPlayState: playPause ? "running" : "paused" }}
                />
                <path
                  d="M 108 92 Q 114 78 106 65 T 110 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="text-theme-text opacity-30 animate-steam-2"
                  style={{ animationPlayState: playPause ? "running" : "paused" }}
                />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};

VisualTimer.propTypes = {
  mode: PropTypes.string.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
  totalMinutes: PropTypes.number.isRequired,
  playPause: PropTypes.bool.isRequired,
};

export default VisualTimer;
