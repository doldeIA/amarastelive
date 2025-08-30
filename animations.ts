import React from 'react';

// --- Animation Helper ---
export const applyClickAnimation = (e: React.MouseEvent<HTMLElement>) => {
  const target = e.currentTarget;
  target.classList.remove('animate-click');
  // Reading offsetWidth is a trick to trigger reflow and restart the animation
  void target.offsetWidth;
  target.classList.add('animate-click');
};
