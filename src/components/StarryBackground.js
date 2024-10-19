// Daniela Castorena 2024
// Weather App - StarryBackground.js

import { useEffect } from 'react';
import { gsap } from 'gsap';

const StarryBackground = () => {
  useEffect(() => {
    const stars = [];
    const starCount = 100; //number of stars

    //create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.position = 'absolute';
      star.style.borderRadius = '50%';
      star.style.backgroundColor = 'white';
      star.style.opacity = Math.random();
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width; 
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.left = `${Math.random() * window.innerWidth}px`;

      document.body.appendChild(star);
      stars.push(star);

      //GSAP animation for sparkle effect
      gsap.to(star, {
        opacity: Math.random(),
        repeat: -1,
        yoyo: true,
        duration: Math.random() * 2 + 1,
      });
    }

    return () => {
      stars.forEach(star => {
        document.body.removeChild(star);
      });
    };
  }, []);

  return null;
};

export default StarryBackground;
