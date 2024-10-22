import React, { useState, useRef, useEffect } from 'react';

interface ReadingRulerProps {
  fontSize: number;
  lineSpacing: number;
  textColor: string;
  backgroundColor: string;
  children: React.ReactNode;
}

const ReadingRuler: React.FC<ReadingRulerProps> = ({
  fontSize,
  lineSpacing,
  textColor,
  backgroundColor,
  children
}) => {
  const [rulerPosition, setRulerPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        setRulerPosition(relativeY);
      }
    };

    if (contentRef.current) {
      contentRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      className="relative"
      ref={contentRef}
      style={{
        fontFamily: 'OpenDyslexic, Arial, sans-serif', // Apply dyslexia-friendly font
        fontSize: `${fontSize}px`, // Dynamically apply font size
        color: textColor, // Dynamically apply text color
        backgroundColor: backgroundColor, // Dynamically apply background color
        lineHeight: lineSpacing, // Dynamically apply line spacing
        padding: '16px', // Optional padding for better readability
        borderRadius: '8px', // Optional border radius for a softer look
        transition: 'all 0.3s ease' // Smooth transitions when changing settings
      }}
    >
      {/* Reading ruler highlight */}
      <div
        className="absolute w-full h-12 bg-yellow-300 opacity-50 pointer-events-none transition-all duration-75 ease-linear"
        style={{ top: `${rulerPosition - 24}px` }} // Centered ruler
      ></div>

      {children}
    </div>
  );
};

export default ReadingRuler;
