import React, { useState, useEffect } from 'react';
import { Trophy, X, ArrowUp, ArrowDown, RotateCcw, AlertCircle } from 'lucide-react';
// import Main from './main';

export default function NumberGuessingGame() {
  // Difficulty configurations
  const difficulties = {
    easy: { label: 'Easy', attempts: 15, color: 'bg-green-500' },
    medium: { label: 'Medium', attempts: 10, color: 'bg-yellow-500' },
    hard: { label: 'Hard', attempts: 5, color: 'bg-red-500' }
  };

  // Game state management
  const [difficulty, setDifficulty] = useState('medium');
  const [secretNumber, setSecretNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(difficulties.medium.attempts);
  const [feedback, setFeedback] = useState('');
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
  const [guessHistory, setGuessHistory] = useState([]);
  const [error, setError] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  // Generate random number between 1 and 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Initialize game
  useEffect(() => {
    setMaxAttempts(difficulties[difficulty].attempts);
  }, []);

  // Validate input
  function validateInput(value) {
    if (value.trim() === '') {
      return 'Please enter a number';
    }
    
    if (isNaN(value)) {
      return 'Input must be a valid number';
    }
    
    const num = parseFloat(value);
    
    if (!Number.isInteger(num)) {
      return 'Please enter a whole number';
    }
    
    if (num < 1 || num > 100) {
      return 'Number must be between 1 and 100';
    }
    
    return null;
  }

  // Handle guess submission
  function handleGuess() {
    // Mark game as started on first guess
    if (!gameStarted) {
      setGameStarted(true);
    }

    // Validate input
    const validationError = validateInput(guess);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Clear any previous errors
    setError('');

    const guessNum = parseInt(guess);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Add to history
    const historyEntry = {
      number: guessNum,
      type: guessNum < secretNumber ? 'low' : guessNum > secretNumber ? 'high' : 'correct'
    };
    setGuessHistory([...guessHistory, historyEntry]);

    // Check guess
    if (guessNum === secretNumber) {
      setFeedback(`🎉 Correct! You won in ${newAttempts} attempt${newAttempts > 1 ? 's' : ''}!`);
      setGameStatus('won');
    } else if (newAttempts >= maxAttempts) {
      setFeedback(`😔 Game Over! The number was ${secretNumber}`);
      setGameStatus('lost');
    } else {
      const remaining = maxAttempts - newAttempts;
      if (guessNum > secretNumber) {
        setFeedback(`Too high! ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining`);
      } else {
        setFeedback(`Too low! ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining`);
      }
    }

    // Clear input
    setGuess('');
  }

  // Handle Enter key press
  function handleKeyPress(e) {
    if (e.key === 'Enter' && gameStatus === 'playing') {
      handleGuess();
    }
  }

  // Handle difficulty change
  function handleDifficultyChange(newDifficulty) {
    if (!gameStarted) {
      setDifficulty(newDifficulty);
      setMaxAttempts(difficulties[newDifficulty].attempts);
    }
  }

  // Restart game
  function handleRestart() {
    setSecretNumber(generateRandomNumber());
    setGuess('');
    setAttempts(0);
    setFeedback('');
    setGameStatus('playing');
    setGuessHistory([]);
    setError('');
    setGameStarted(false);
  }

  // Handle input change
  function handleInputChange(e) {
    setGuess(e.target.value);
    if (error) {
      setError('');
    }
  }

  // Get feedback styling
  function getFeedbackStyle() {
    if (gameStatus === 'won') return 'bg-green-100 text-green-800 border-green-300';
    if (gameStatus === 'lost') return 'bg-red-100 text-red-800 border-red-300';
    if (feedback.includes('Too high')) return 'bg-purple-100 text-purple-800 border-purple-300';
    if (feedback.includes('Too low')) return 'bg-orange-100 text-orange-800 border-orange-300';
    return 'bg-blue-100 text-blue-800 border-blue-300';
  }

  // Get guess badge styling
  function getGuessBadgeStyle(type) {
    if (type === 'correct') return 'bg-green-500 text-white';
    if (type === 'high') return 'bg-purple-500 text-white';
    if (type === 'low') return 'bg-orange-500 text-white';
    return 'bg-gray-500 text-white';
  }

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
    <div className="flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center justify-center bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md>">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Number Guessing Game</h1>
          <p className="text-gray-600">Guess a number between 1 and 100</p>
        </div>

        {/* Difficulty Selector */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-2">Difficulty:</p>
          <div className="flex gap-2">
            {Object.entries(difficulties).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleDifficultyChange(key)}
                disabled={gameStarted}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  difficulty === key
                    ? `${config.color} text-white shadow-lg scale-105`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${gameStarted ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Attempts Counter */}
        <div className="mb-4 text-center">
          <p className="text-gray-700">
            <span className="font-semibold">{attempts}/{maxAttempts}</span> attempts used
            <span className="text-gray-500 ml-2">({maxAttempts - attempts} remaining)</span>
          </p>
        </div>

        {/* Input and Button */}
        {gameStatus === 'playing' && (
          <div className="mb-4">
            <input
              type="text"
              value={guess}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter your guess"
              className={`w-full text-lg px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              autoFocus
            />
            
            {/* Error Message */}
            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-sm animate-fade-in">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleGuess}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            >
              Guess
            </button>
          </div>
        )}

        {/* Feedback Message */}
        {feedback && (
          <div className={`mb-4 p-4 rounded-lg border-2 flex items-center gap-3 animate-fade-in ${getFeedbackStyle()}`}>
            {gameStatus === 'won' && <Trophy size={24} />}
            {gameStatus === 'lost' && <X size={24} />}
            {feedback.includes('Too high') && <ArrowDown size={24} />}
            {feedback.includes('Too low') && <ArrowUp size={24} />}
            <span className="font-semibold">{feedback}</span>
          </div>
        )}

        {/* Guess History */}
        {guessHistory.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Your Guesses:</p>
            <div className="flex flex-wrap gap-2">
              {guessHistory.map((entry, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getGuessBadgeStyle(entry.type)} animate-fade-in`}
                >
                  {entry.number}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Restart Button */}
        <button
          onClick={handleRestart}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
        >
          <RotateCcw size={20} />
          New Game
        </button>
      </div>
    </div>
    </div>
  );
}