import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import initWasm, * as wasm from './wasm/img_processing.js'

function App() {
  const [count, setCount] = useState(0)
  const [wasmReady, setWasmReady] = useState(false)

  useEffect(() => {
    initWasm().then(() => {
      setWasmReady(true)
    })
  }, [])

  const handleInvert = () => {
    if (!wasmReady) return
    const newCount = wasm.invert_color(count)
    setCount(newCount)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + WASM</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => setCount(0)}>
          Reset
        </button>
        <button onClick={handleInvert} disabled={!wasmReady}>
          Invert count
        </button>
        {!wasmReady && <p>Cargando WebAssembly...</p>}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App