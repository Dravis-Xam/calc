import { useEffect, useState } from 'react';
import './Calculator.css';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('0');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);

    const [prevCalculation, setPrevCalculation] = useState(() => {
        const storedData = localStorage.getItem('prevCalculation');
        return storedData ? JSON.parse(storedData) : [];
    });
    const [currentIndex, setCurrentIndex] = useState(-1); // Track current index in prevCalculation

    // Safe evaluation function
    const safeEval = (expression) => {
        try {
            return new Function(`return ${expression}`)();
        } catch (error) {
            setError('Invalid expression');
            setVisible(true);
            setTimeout(() => {
                setError('');
                setVisible(false);
            }, 3000); // Clear error after 3 seconds
            return 'Error' + error.message;
        }
    };

    // Update local storage whenever prevCalculation changes
    useEffect(() => {
        localStorage.setItem('prevCalculation', JSON.stringify(prevCalculation));
    }, [prevCalculation]);

    // Handle button clicks for numbers and operations
    const handleButtonClick = (value) => {
        setInput((prev) => prev + value);
    };

    // Perform calculation
    const calculate = () => {
        const result = safeEval(input);
        setOutput(result.toString());

        // Update previous calculations
        setPrevCalculation((prev) => [
            ...prev,
            { input: input, output: result },
        ]);
        setCurrentIndex(prevCalculation.length); // Set index to the latest calculation
    };

    // Clear input
    const clearInput = () => {
        setInput('');
        setOutput('0');
        setCurrentIndex(-1); // Reset index
    };

    // Delete last character
    const deleteLastChar = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    // Memory Up: Display the previous calculation
    const memoryUp = () => {
        if (prevCalculation.length === 0) {
            setMessage('No previous calculations available.');
            setVisible(true);
            setTimeout(() => {
                setMessage('');
                setVisible(false);
            }, 3000); // Clear message after 3 seconds
            return;
        }

        const newIndex = currentIndex - 1;
        if (newIndex >= 0) {
            setInput(prevCalculation[newIndex].input);
            setOutput(prevCalculation[newIndex].output);
            setCurrentIndex(newIndex);
        } else {
            setMessage('No more previous calculations.');
            setVisible(true);
            setTimeout(() => {
                setMessage('');
                setVisible(false);
            }, 3000); // Clear message after 3 seconds
        }
    };

    // Memory Down: Display the next calculation
    const memoryDown = () => {
        if (prevCalculation.length === 0) {
            setMessage('No previous calculations available.');
            setVisible(true);
            setTimeout(() => {
                setMessage('');
                setVisible(false);
            }, 3000); // Clear message after 3 seconds
            return;
        }

        const newIndex = currentIndex + 1;
        if (newIndex < prevCalculation.length) {
            setInput(prevCalculation[newIndex].input);
            setOutput(prevCalculation[newIndex].output);
            setCurrentIndex(newIndex);
        } else {
            setMessage('No more next calculations.');
            setVisible(true);
            setTimeout(() => {
                setMessage('');
                setVisible(false);
            }, 3000); // Clear message after 3 seconds
        }
    };

    // Clear calculation history
    const forgetMemory = () => {
        clearInput();
        localStorage.removeItem('prevCalculation'); // Remove from local storage
        setPrevCalculation([]); // Reset state
        setCurrentIndex(-1); // Reset index
        setMessage('Memory Cleared');
        setVisible(true);
        setTimeout(() => {
            setMessage('');
            setVisible(false);
        }, 3000); // Clear message after 3 seconds
    };

    return (
        <div className='calculator'>
            <input
                type='text'
                placeholder='0'
                value={input}
                className='input'
                readOnly
            />
            <div className='output'>{output}</div>
            <div className='keypad'>
                <button onClick={() => handleButtonClick('+')}>+</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
                <button onClick={() => handleButtonClick('*')}>*</button>
                <button onClick={() => handleButtonClick('/')}>/</button>
                <button onClick={deleteLastChar}>del</button>
                <button onClick={clearInput}>AC</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('.')}>.</button>
                <button onClick={calculate}>=</button>
            </div>
            <div className='memory'>
                <button onClick={memoryUp} className='memoryUp'>
                    Up
                </button>
                <button onClick={memoryDown} className='memoryDown'>
                    Down
                </button>
                <button onClick={forgetMemory} className='forgetMemory'>
                    Forget
                </button>
            </div>
            {visible && (
                <div className='message'>{message}</div>
            )}
            {visible && (
                <div className='error'>{error}</div>
            )}
        </div>
    );
}