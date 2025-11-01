# Number Guesser Game

A fun and interactive number guessing game built with React and Vite.

## 🎮 How to Play

1. The game randomly selects a secret number between 1 and 100
2. Choose your difficulty level (Easy, Medium, or Hard)
3. Enter your guess in the input field
4. Receive feedback if your guess is too high or too low
5. Win by guessing the correct number before running out of attempts!

## ✨ Features

### Core Features

- ✅ Random number generation (1-100)
- ✅ User input validation
- ✅ Real-time feedback (too high/too low/correct)
- ✅ Attempt tracking and limits
- ✅ Win/Loss messages
- ✅ Restart functionality without page reload

### Optional Features Implemented

- ✅ Three difficulty levels:
  - Easy: 15 attempts
  - Medium: 10 attempts
  - Hard: 5 attempts
- ✅ Guess history display
- ✅ Animated UI with gradient backgrounds
- ✅ Responsive design
- ✅ Visual feedback with colors and icons

### Error Handling

- ✅ Validates input is a number
- ✅ Ensures numbers are within 1-100 range
- ✅ Prevents invalid inputs (non-integers, empty values)
- ✅ Clear error messages for users

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd number-guesser

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🛠️ Technologies Used

- React 18
- Vite
- Tailwind CSS
- Lucide React (icons)

## 📁 Project Structure

``` folder structure
number-guesser/
├── src/
│   ├── App.jsx          # Main game component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/
├── index.html
├── package.json
└── README.md
```

## 🎯 Game Rules

1. Select difficulty before making your first guess
2. You cannot change difficulty mid-game
3. Each guess counts as one attempt
4. The game ends when you guess correctly or run out of attempts
5. Click "New Game" to restart anytime

## 🌐 Live Demo

[Your deployed link here]

## 👨‍💻 Development

This project follows git workflow best practices:

- Feature branches for isolated development
- Meaningful commit messages
- Pull request management
- Clean merge history

## 📝 License

MIT

## 👤 Author

Adeyemo Samuel - Web3Bridge Cohort XIV
