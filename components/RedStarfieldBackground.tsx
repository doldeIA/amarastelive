import React, { useMemo } from 'react';

const RedStarfieldBackground: React.FC = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const size = Math.random() * 2 + 1; // 1px to 3px
      const moveAnimation = `star-move-${Math.ceil(Math.random() * 3)}`;
      
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#ff0000',
        animation: `
          ${moveAnimation} ${20 + Math.random() * 30}s linear infinite,
          star-flicker ${2 + Math.random() * 3}s ease-in-out infinite
        `,
        animationDelay: `${Math.random() * 50}s, ${Math.random() * 5}s`,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-white">
      {stars.map(style => (
        <div
          key={style.id}
          className="absolute rounded-full"
          style={{
            top: style.top,
            left: style.left,
            width: style.width,
            height: style.height,
            backgroundColor: style.backgroundColor,
            animation: style.animation,
            animationDelay: style.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default RedStarfieldBackground;