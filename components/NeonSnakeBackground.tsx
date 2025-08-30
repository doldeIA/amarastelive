import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const NeonSnakeBackground: React.FC = () => {
  // Generate 12 lines with random properties for a dynamic effect
  const lines = useMemo(() => Array.from({ length: 12 }).map((_, i) => {
    // Randomize path, duration, and dash properties for each line
    const pathType = Math.random();
    let d;
    // Generate different types of curves for variety
    if (pathType < 0.33) {
      // Horizontal-style curve
      d = `M-100 ${Math.random() * 600} Q400 ${Math.random() * 600} 900 ${Math.random() * 600}`;
    } else if (pathType < 0.66) {
      // Vertical-style curve
      d = `M${Math.random() * 800} -100 Q${Math.random() * 800} 300 ${Math.random() * 800} 700`;
    } else {
      // More complex curve with two control points for more serpentine movement
      d = `M-100 ${Math.random() * 600} C${Math.random() * 800} ${Math.random() * 600}, ${Math.random() * 800} ${Math.random() * 600}, 900 ${Math.random() * 600}`;
    }
    
    const dash = 20;
    const gap = 150 + Math.random() * 150;
    
    return {
      key: i,
      d,
      dash,
      gap,
      duration: 5 + Math.random() * 10, // 5 to 15 seconds
    };
  }), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        preserveAspectRatio="none"
        style={{ transform: 'translate3d(0, 0, 0)' }} // GPU acceleration
      >
        {lines.map(line => (
          <motion.path
            key={line.key}
            d={line.d}
            stroke="rgba(255,0,0,0.95)"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={`${line.dash} ${line.gap}`}
            strokeLinecap="round"
            className="drop-shadow-[0_0_12px_#ff0000] animate-flicker"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -(line.dash + line.gap) }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default NeonSnakeBackground;
