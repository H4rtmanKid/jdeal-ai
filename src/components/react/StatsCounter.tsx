import React, { useState, useEffect } from 'react';

interface StatItem {
  value: string;
  label: string;
  isActive?: boolean;
}

interface StatsCounterProps {
  stats: StatItem[];
}

const StatsCounter: React.FC<StatsCounterProps> = ({ stats }) => {
  const [animatedValues, setAnimatedValues] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isAnimating) {
      // เริ่มการ animation หลังจาก component mount
      const timer = setTimeout(() => {
        setIsAnimating(true);
        animateNumbers();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const animateNumbers = () => {
    const newAnimatedValues = stats.map(() => '0');
    setAnimatedValues(newAnimatedValues);

    stats.forEach((stat, index) => {
      const finalText = stat.value.trim();
      let targetNumber = 0;
      let suffix = '';

      // ดึงตัวเลขและ suffix ออกมา
      if (finalText.includes('M')) {
        targetNumber = parseFloat(finalText.replace('M', '')) * 1000000;
        suffix = 'M';
      } else if (finalText.includes('K')) {
        targetNumber = parseFloat(finalText.replace('K', '')) * 1000;
        suffix = 'K';
      } else {
        targetNumber = parseInt(finalText.replace(/[^\d]/g, ''));
      }

      if (targetNumber > 0) {
        let current = 0;
        const increment = targetNumber / 60; // แบ่งเป็น 60 step

        const timer = setInterval(() => {
          current += increment;

          if (current >= targetNumber) {
            // แสดงค่าจริงตอนจบ
            setAnimatedValues(prev => {
              const newValues = [...prev];
              newValues[index] = finalText;
              return newValues;
            });
            clearInterval(timer);
          } else {
            // แสดงค่าปัจจุบัน
            let displayValue = '';
            if (suffix === 'M') {
              displayValue = (current / 1000000).toFixed(1) + 'M';
            } else if (suffix === 'K') {
              displayValue = Math.floor(current / 1000) + 'K';
            } else {
              displayValue = Math.floor(current).toLocaleString();
            }

            setAnimatedValues(prev => {
              const newValues = [...prev];
              newValues[index] = displayValue;
              return newValues;
            });
          }
        }, 30); // ทุก 30ms = 1.8 วินาที total
      }
    });
  };

  return (
    <div className="info-cards hero-home">
      {stats.map((stat, index) => (
        <div key={index} className="info-card stat-item">
          <h4 className={stat.isActive ? 'info-active' : ''}>
            {animatedValues[index] || stat.value}
          </h4>
          <p className={stat.isActive ? 'info-active' : ''}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;