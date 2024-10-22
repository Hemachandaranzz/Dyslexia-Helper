import React, { useState } from 'react';
import TextCustomizer from './TextCustomizer'; // Import TextCustomizer
import ReadingRuler from './ReadingRuler'; // Example of applying customizations

const ReadingArea: React.FC = () => {
  // Initialize the fontFamily with 'OpenDyslexic' to ensure it's the default font
  const [fontSize, setFontSize] = useState(18); // Default font size
  const [lineSpacing, setLineSpacing] = useState(1.5); // Default line spacing
  const [fontFamily, setFontFamily] = useState('OpenDyslexic'); // Set OpenDyslexic as default font
  const [textColor, setTextColor] = useState('#333333'); // Default text color
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default background color

  return (
    <div>
      <TextCustomizer
        fontSize={fontSize}
        setFontSize={setFontSize}
        lineSpacing={lineSpacing}
        setLineSpacing={setLineSpacing}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        textColor={textColor}
        setTextColor={setTextColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />

      {/* Example of applying the font and other customizations */}
      <ReadingRuler
        fontSize={fontSize}
        lineSpacing={lineSpacing}
        fontFamily={fontFamily}
        textColor={textColor}
        backgroundColor={backgroundColor}
      >
        <p>This is an example of customizable text with dyslexia-friendly options.</p>
        <p>Adjust font, size, spacing, and colors for better readability.</p>
      </ReadingRuler>
    </div>
  );
};

export default ReadingArea;
