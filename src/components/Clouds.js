// Daniela Castorena 2024
// Weather App - Clouds.js

import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../App.css';

const cloudImages = [
  '/images/cloud1.png',
  '/images/cloud2.png',
  '/images/cloud3.png',
  '/images/cloud4.png',
  '/images/cloud5.png'
];

const Clouds = () => {
  const createClouds = () => {
    const cloudContainer = document.querySelector('.clouds-container');

    for (let i = 0; i < 5; i++) {
      const cloud = document.createElement('img');
      cloud.src = cloudImages[Math.floor(Math.random() * cloudImages.length)];
      cloud.classList.add('cloud');

      cloud.style.left = `${-Math.random() * 50 - 150}px`;
      cloud.style.top = `${Math.random() * 80}vh`;
      cloud.style.opacity = Math.random() * 0.3 + 0.3;
      cloud.style.width = `${Math.random() * 50 + 100}px`;
      cloudContainer.appendChild(cloud);

      const duration = 40;
      gsap.to(cloud, {
        x: window.innerWidth + 'px',
        duration: duration,
        repeat: -1,
        ease: 'linear',
        onRepeat: () => {
          cloud.style.left = `${-Math.random() * 50 - 100}px`;
        }
      });
    }
  };

  useEffect(() => {
    createClouds();
  }, []);

  return <div className="clouds-container" />;
};

export default Clouds;
