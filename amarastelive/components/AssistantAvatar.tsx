import React from 'react';

interface AssistantAvatarProps {
  className?: string;
}

const AssistantAvatar: React.FC<AssistantAvatarProps> = ({ className }) => {
  return (
    <div className={className} aria-hidden="true" role="img" aria-label="Chat avatar">
      <svg
        viewBox="0 0 100 86.6"
        className="w-full h-full avatar-triangle-rotate"
      >
        <polygon
          points="50,0 100,86.6 0,86.6"
          fill="#5c3a21"
          className="avatar-triangle-glow"
        />
      </svg>
    </div>
  );
};

export default AssistantAvatar;
