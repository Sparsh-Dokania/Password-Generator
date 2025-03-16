import { useState, useCallback, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    let password = '';
    let str = chars;

    if (includeNumbers) {
      str += numbers;
    }

    if (includeSpecialChars) {
      str += specialChars;
    }

    for (let i = 0; i < length; i++) {
      const charIndex = Math.floor(Math.random() * str.length);
      password += str.charAt(charIndex);
    }

    setGeneratedPassword(password);
    toast.success('Password generated!', { duration: 2000 }); // Show a toast notification
  }, [length, includeNumbers, includeSpecialChars]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(generatedPassword)
      .then(() => {
        toast.success('Password copied to clipboard!', { duration: 2000 }); // Notify on copy
      })
      .catch(() => {
        toast.error('Failed to copy password!', { duration: 2000 });
      });
  }, [generatedPassword]);

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const handleIncludeNumbersChange = () => {
    setIncludeNumbers(!includeNumbers);
  };

  const handleIncludeSpecialCharsChange = () => {
    setIncludeSpecialChars(!includeSpecialChars);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeSpecialChars, generatePassword]);

  return (
    <div className="flex bg-black flex-col items-center justify-center h-screen">
      <Toaster position="top-center" />
      <div className="bg-white p-8 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
        <h2 className="text-2xl font-bold mb-4">Password Generator</h2>
        <div className="flex flex-col mb-4">
          <label className="text-lg font-medium mb-2">Password Length:</label>
          <input
            id="password-length"
            type="number"
            min={6}
            max={20}
            value={length}
            onChange={handleLengthChange}
            className="cursor-pointer w-full border-1 p-2 pl-10 text-sm text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="flex flex-col mb-4">
          <div className="option flex items-center mb-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={handleIncludeNumbersChange}
              className="mr-2"
            />
            <label className="text-lg font-medium">Include Numbers:</label>
          </div>
          <div className="option flex items-center mb-2">
            <input
              type="checkbox"
              checked={includeSpecialChars}
              onChange={handleIncludeSpecialCharsChange}
              className="mr-2"
            />
            <label className="text-lg font-medium">Include Special Characters:</label>
          </div>
        </div>
        <button
          onClick={generatePassword}
          className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-600 transition-all duration-300 ease-in-out"
        >
          Generate Password
        </button>
        <input
          id="generated-password"
          type="text"
          value={generatedPassword}
          readOnly
          ref={passwordRef}
          className="w-full p-2 pl-10 text-sm text-gray-700 border-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mt-4 transition-all duration-300 ease-in-out"
        />
        <button
          onClick={copyPassword}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 ease-in-out"
        >
          Copy Password
        </button>
      </div>
    </div>
  );
}

export default App;