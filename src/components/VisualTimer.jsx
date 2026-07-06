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

            {/* Flame */}
            {playPause && (
              <motion.g
                transform-origin="100px 150px"
                variants={flameVariants}
                animate="flicker"
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

            {/* Small smoke trail if paused */}
            {!playPause && progress < 1 && (
              <motion.path
                d={`M 100 ${candleY - 12} Q 96 ${candleY - 22} 104 ${candleY - 32} T 98 ${candleY - 48}`}
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

        {/* BREAK MODES: INCENSE */}
        {(mode === "shortBreak" || mode === "longBreak") && (
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

            {/* Incense Stick (Ash/Consumed part) */}
            {progress < 1 && (
              <motion.line
                x1={stickTipX}
                y1={stickTipY}
                x2={stickBaseX + stickMaxLenX}
                y2={stickBaseY - stickMaxLenY}
                initial={{ x1: stickBaseX + stickMaxLenX, y1: stickBaseY - stickMaxLenY }}
                animate={{ x1: stickTipX, y1: stickTipY }}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="2 3"
                strokeLinecap="round"
                className="text-theme-text opacity-30"
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}

            {/* Incense Stick (Unconsumed part) */}
            <motion.line
              x1={stickBaseX}
              y1={stickBaseY}
              initial={{ x2: stickBaseX, y2: stickBaseY }}
              animate={{ x2: stickTipX, y2: stickTipY }}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-theme-text"
              transition={{ duration: 0.5, ease: "easeOut" }}
            />

            {/* Glowing Red Ember at the tip */}
            {playPause && progress > 0 && (
              <motion.circle
                r="3"
                fill="var(--theme-accent)"
                initial={{ cx: stickBaseX, cy: stickBaseY }}
                animate={{
                  cx: stickTipX,
                  cy: stickTipY,
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  cx: { duration: 0.5, ease: "easeOut" },
                  cy: { duration: 0.5, ease: "easeOut" },
                  scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            )}

            {/* Wavy Smoke rising from the ember */}
            {playPause && progress > 0 && (
              <g>
                <motion.path
                  d={`M ${stickTipX} ${stickTipY} 
                      Q ${stickTipX - 10} ${stickTipY - 20} ${stickTipX} ${stickTipY - 40} 
                      T ${stickTipX + 5} ${stickTipY - 75}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-theme-text opacity-40"
                  initial={{ strokeDasharray: "120", strokeDashoffset: 120 }}
                  animate={{ strokeDashoffset: 0, opacity: [0.1, 0.4, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.path
                  d={`M ${stickTipX} ${stickTipY} 
                      Q ${stickTipX + 12} ${stickTipY - 18} ${stickTipX - 3} ${stickTipY - 36} 
                      T ${stickTipX - 8} ${stickTipY - 68}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="text-theme-text opacity-30"
                  initial={{ strokeDasharray: "100", strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0, opacity: [0.05, 0.3, 0] }}
                  transition={{
                    duration: 4.2,
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
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
