import React, { useState } from 'react';
import { CONFIG } from '../utils/constants';

// Shows the real headshot (public/headshot.jpg) and transparently falls back to
// the Gravatar if that file isn't present yet, so the hero never renders a
// broken image before a photo is added.
const Avatar = ({ className = '', alt }) => {
  const [src, setSrc] = useState(CONFIG.headshotUrl);
  return (
    <img
      src={src}
      alt={alt || CONFIG.name}
      width="160"
      height="160"
      decoding="async"
      onError={() => {
        if (src !== CONFIG.gravatarUrl) setSrc(CONFIG.gravatarUrl);
      }}
      className={className}
    />
  );
};

export default Avatar;
