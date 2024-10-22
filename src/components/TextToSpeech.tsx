import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speechRate, setSpeechRate] = useState(1); // Initial speech rate
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      // Manually specify a subset of natural-sounding voices
      const naturalVoices = availableVoices.filter(voice => [
        "Google US English", 
        "Google UK English Female",
        "Microsoft Zira - English (United States)",
        "Microsoft David - English (United States)",
        "Microsoft Mark - English (United States)"
      ].includes(voice.name));

      setVoices(naturalVoices);
      setSelectedVoice(naturalVoices[0] || null); // Default to the first natural voice
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
    }
    fetchVoices();
  }, []);

  const speak = () => {
    if ('speechSynthesis' in window && selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = speechRate;
      utterance.onend = () => setIsSpeaking(false);
      utteranceRef.current = utterance;
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = voices.find(voice => voice.name === e.target.value);
    setSelectedVoice(selected || null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="voiceSelect" className="block text-sm font-medium text-gray-700">Choose Voice</label>
        <select
          id="voiceSelect"
          value={selectedVoice?.name || ''}
          onChange={handleVoiceChange}
          className="w-full mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 bg-yellow-100 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>{voice.name} ({voice.lang})</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="speechRate" className="block text-sm font-medium text-gray-700">Speech Speed</label>
        <input
          type="range"
          id="speechRate"
          min="0.5"
          max="2"
          step="0.1"
          value={speechRate}
          onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <button
        onClick={isSpeaking ? stop : speak}
        className="flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
        <span className="ml-2">{isSpeaking ? 'Stop' : 'Read Aloud'}</span>
      </button>
    </div>
  );
};

export default TextToSpeech;
