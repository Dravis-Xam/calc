import { useState } from 'react'
import './Calculator.css'
export default function Calculator() {

    const [input, setInput] = useState('')
    const [output, setOutput] = useState('0')

    const add = () => {
        setInput(prev => prev + '+')
    }
    const sub = () => {
        setInput(prev => prev + '-')
    }
    const mul = () => {
        setInput(prev => prev + '*')
    }
    const div = () => {
        setInput(prev => prev + '/')
    }
    const del = () => {
        setInput(prev => prev.slice(0, -1))
    }
    const ac = () => {
        setInput("")
    }
    const nine = () => {
        setInput(prev => prev + '9')
    }
    const eight = () => {
        setInput(prev => prev + '8')
    }
    const seven = () => {
        setInput(prev => prev + '7')
    }
    const six = () => {
        setInput(prev => prev + '6')
    }
    const five = () => {
        setInput(prev => prev + '5')
    }
    const four = () => {
        setInput(prev => prev + '4')
    }
    const three = () => {
        setInput(prev => prev + '3')
    }
    const two = () => {
        setInput(prev => prev + '2')
    }
    const one = () => {
        setInput(prev => prev + '1')
    }
    const dot = () => {
        setInput(prev => prev + '.')
    }
    const zero = () => {
        setInput(prev => prev + '0')
    }

    function calculate() {
        setOutput(eval(input))
    }

  return (
    <div className='calculator'>
      <input type='text' placeholder="0" value={input === "0" ? 0 : input} className='input'/>
      <div className='output'>{output}</div>
      <div className='keypad'>
        <button onClick={add}>+</button>
        <button onClick={sub}>-</button>
        <button onClick={mul}>*</button>
        <button onClick={div}>/</button>
        <button onClick={del}>del</button>
        <button onClick={ac}>AC</button>
        <button onClick={nine}>9</button>
        <button onClick={eight}>8</button>
        <button onClick={seven}>7</button>
        <button onClick={six}>6</button>
        <button onClick={five}>5</button>
        <button onClick={four}>4</button>
        <button onClick={three}>3</button>
        <button onClick={two}>2</button>
        <button onClick={one}>1</button>
        <button onClick={zero}>0</button>
        <button onClick={dot}>.</button>
        <button onClick={calculate}>=</button>
      </div>
    </div>
  )
}
