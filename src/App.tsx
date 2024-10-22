import React, { useState } from 'react';
import { Book, Settings, Volume2 } from 'lucide-react';
import TextCustomizer from './components/TextCustomizer';
import ReadingRuler from './components/ReadingRuler';
import TextToSpeech from './components/TextToSpeech';

const sampleText = `The Adventure of Leo the Little Squirrel
In the heart of a bustling oak forest lived a young squirrel named Leo. Leo was smaller than his friends, but what he lacked in size, he made up for in curiosity and bravery.

One sunny morning, Leo decided he was ready for a real adventure. He wanted to find the legendary Golden Acorn that the old tales spoke about. The Golden Acorn was said to be hidden deep in the forest, glowing with an inner light and holding the magic of the forest within it.

With a tiny backpack filled with berries and a big heart, Leo waved goodbye to his family and scampered off. His mother called after him, "Stay sharp, Leo! And remember, the forest is friendlier than it seems!"

Leo hopped and darted through the underbrush, his eyes wide with wonder. He met Mr. Owl, who hooted solemnly, "The path you seek is swirled in mist, but a true heart always finds a way!" Leo nodded, not fully understanding but grateful for the wise words.

As the day wore on, Leo found himself by a sparkling stream. There, he helped a young fish who was trapped under a fallen leaf. "Thank you, Leo!" the fish bubbled. "If you’re looking for the Golden Acorn, it lies beyond the Whispering Waterfalls."

Guided by the fish’s directions, Leo ventured towards the waterfalls. The sounds grew louder, and the air felt misty. Just as Leo wondered if he had made a mistake, he saw it—a beautiful glow not far ahead.

Climbing a small hill, Leo finally saw the Golden Acorn. It was perched high up in an ancient tree, surrounded by a halo of light. With a deep breath, Leo climbed. The task was tough, his small claws tired, but his heart was stout.

Finally, with one last leap, Leo reached the Golden Acorn. The moment he touched it, the forest lit up in dazzling hues, and he felt a warm glow in his heart. He had done it! He had found the magic hidden deep in the forest and proved that even the smallest can achieve great things.

Leo returned home a hero. The forest animals celebrated his bravery, and Leo knew he had not only found the Golden Acorn but also courage, friends, and a great story to tell.

"And that," Leo would say many years later, sitting by the same old oak tree, "is how even the littlest squirrel can have the biggest adventure.`;

function App() {
  const [fontSize, setFontSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <Book className="mr-2" /> DyslexiaReader
          </h1>
          <nav>
            <button className="p-2 hover:bg-blue-700 rounded">
              <Settings />
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <section className="md:w-1/4 bg-white p-4 rounded shadow">
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
        </section>

        <section className="md:w-3/4 bg-white p-4 rounded shadow">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Reading Area</h2>
            <TextToSpeech text={sampleText} />
          </div>
          <div
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineSpacing,
              fontFamily,
              color: textColor,
              backgroundColor,
            }}
            className="p-4 rounded"
          >
            <ReadingRuler>
              {sampleText}
            </ReadingRuler>
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; 2024 DyslexiaReader. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;