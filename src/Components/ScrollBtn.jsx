import React, { useEffect } from 'react';
import '../Styles/ScrollBtn.css';

const ScrollBtn = () => {
    useEffect(() => {
        const scrollProgress = document.getElementById('progress');
        if (!scrollProgress) {
            console.error('Scroll progress element not found');
            return;
        }

        const calcScrollValue = () => {
            const pos = document.documentElement.scrollTop || 0;
            const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            console.log('Scroll Position: ', pos);
            console.log('Calculated Height: ', calcHeight);
        
            if (calcHeight <= 0) {
                const calcHeight = 1;
                const scrollValue = Math.round((pos * 100) / calcHeight);
                console.warn('Using default height to prevent NaN: ', scrollValue);
                
                scrollProgress.style.background = `conic-gradient(#03CC65 ${scrollValue}%, #D7D7D7 ${scrollValue}%)`;
            }
            else {
                const scrollValue = Math.round((pos * 100) / calcHeight);
                console.log('Scroll Value: ', scrollValue);

                scrollProgress.style.background = `conic-gradient(#03CC65 ${scrollValue}%, #D7D7D7 ${scrollValue}%)`;
            }

            if (pos > 50) {
                scrollProgress.style.opacity = 1;
            }
            else {
                scrollProgress.style.opacity = 0;
            }
        };

        const handleClick = () => {
            document.documentElement.scrollTop = 0;
        };
      
        window.onscroll = calcScrollValue;
        window.onload = calcScrollValue;
        scrollProgress.addEventListener('click', handleClick);
    });

    return (
        <div id = "progress">
            <span id = "progress-value">▲</span>
        </div>
    );
}

export default ScrollBtn;