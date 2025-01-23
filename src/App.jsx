import { useState, useCallback, useRef, useEffect } from 'react'
import './App.css'
import { use } from 'react';

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passRef = useRef(null);

const generatePassword = useCallback(()=>{
  let pass='';
  let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if(numAllowed) {str += '0123456789'};
  if(charAllowed) {str += '!@#$%^&*()-_=+[]{}|;:,.<>?/'};

  for (let i = 1; i <= length; i++) {
   pass += str.charAt(Math.floor(Math.random()*str.length)+1);
    
   
    
  }
  ;
  setPassword(pass);
},
[length,numAllowed,charAllowed,setPassword])

const copyPass = useCallback(()=>{window.navigator.clipboard.writeText(password)
  passRef.current?.select()},[password])


// useEffect(()=>{
//   generatePassword()

// },[length,numAllowed,charAllowed,setPassword])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-center text-gray-800">Password Generator</h1>

    <div className="mt-4">
      <label
       
        className="block text-sm font-medium text-gray-700"
      >
        Generated Password
      </label>
      <div className="relative mt-2">
        <input
        value={password}
          id="password"
          type="text"
          readOnly
          ref={passRef}
          className="block w-full px-4 py-2 text-sm text-gray-900 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
        onClick={copyPass}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none"
        >
          Copy
        </button>
      </div>
    </div>

    <div className="mt-6 space-y-2">
      <label className="flex items-center">
        <input
          type="checkbox"
          onChange={()=>{
            setNumAllowed((prev)=>!prev)
          }}
          defaultChecked={numAllowed}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span className="ml-2 text-sm text-gray-700">Include Numbers</span>
      </label>
      <label className="flex items-center">
        <input
        defaultChecked={charAllowed}
          type="checkbox"
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <span className="ml-2 text-sm text-gray-700">Include Special Characters</span>
      </label>
    </div>

    <div className="mt-6">
      <label
        
        className="block text-sm font-medium text-gray-700"
      >
        Password Length: <span id="slider-value" className="font-bold">{length}</span>
      </label>
      <input
        id="length-slider"
        type="range"
        min="6"
        max="25"
        value={length}
        className="w-full mt-2 accent-indigo-600"
        onChange={(e)=>{
          setLength(e.target.value)
        }}
        
      />
    </div>

    <button onClick={generatePassword}
      className="w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none"
    >
      Generate Password
    </button>
  </div>
</div>


  )
}

export default App
