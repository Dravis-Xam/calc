import { useEffect, useState, useRef } from 'react';
import './Calculator.css';

export default function Calculator() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('0');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);
    const [oldInput, setOldInput] = useState(''); // Store the old input for display

    const [prevCalculation, setPrevCalculation] = useState(() => {
        const storedData = localStorage.getItem('prevCalculation');
        return storedData ? JSON.parse(storedData) : [];
    });
    const [currentIndex, setCurrentIndex] = useState(-1);

    const inputRef = useRef(null); // Create a ref for the input field

    useEffect(() => {
        inputRef.current.focus(); // Focus the input field when the component mounts
    }, []);

    const safeEval = (expression) => {
        try {
            return new Function(`return ${expression}`)();
        } catch (error) {
            setError('Invalid expression');
            setVisible(true);
            setTimeout(() => {
                setError('');
                setVisible(false);
            }, 3000);
            return 'Error';
        }
    };

    useEffect(() => {
        localStorage.setItem('prevCalculation', JSON.stringify(prevCalculation));
    }, [prevCalculation]);

    const handleButtonClick = (value) => {
        setInput((prev) => prev + value);
    };

    const calculate = () => {
        const result = safeEval(input);
        setOutput(result.toString());
        setPrevCalculation((prev) => [
            ...prev,
            { input: input, output: result },
        ]);
        setCurrentIndex(prevCalculation.length);
        setOldInput(input); // Store the old input for display
        setInput(''); // Clear the input for new typing
    };

    const clearInput = () => {
        setInput('');
        setOutput('0');
        setCurrentIndex(-1);
        setOldInput(''); // Clear the old input
    };

    const deleteLastChar = () => {
        setInput((prev) => prev.slice(0, -1));
    };

    const memoryUp = () => {
        if (prevCalculation.length === 0) {
            setMessage('No previous calculations available.');
            setVisible(true);
            setTimeout(() => {
                setMessage('');
                setVisible(false);
            }, 3000);
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
            }, 3000);
        }
    };

    const memoryDown = () => {
        if (prevCalculation.length === 0) {
            setMessage('No previous calculations available.');
            setVisible(true);
            setTimeout(() => {
                setMessage('');
                setVisible(false);
            }, 3000);
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
            }, 3000);
        }
    };

    const forgetMemory = () => {
        clearInput();
        localStorage.removeItem('prevCalculation');
        setPrevCalculation([]);
        setCurrentIndex(-1);
        setMessage('Memory Cleared');
        setVisible(true);
        setTimeout(() => {
            setMessage('');
            setVisible(false);
        }, 3000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            calculate();
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value); // Update input as the user types
    };

    return (
        <div className='calculator'>
            <div className='input-container'>
                {oldInput && <span className='old-input'>{oldInput} =</span>}
                <input
                    type='text'
                    placeholder='0'
                    value={input}
                    className='input'
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
            </div>
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
            {visible && <div className='message'>{message}</div>}
            {visible && <div className='error'>{error}</div>}
        </div>
    );
}