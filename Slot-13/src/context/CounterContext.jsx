import { createContext, useContext, useState } from 'react'

const CounterContext = createContext(null)

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0)

  const increment = () => setCount((current) => current + 1)
  const decrement = () => setCount((current) => current - 1)
  const reset = () => setCount(0)

  return (
    <CounterContext.Provider value={{ count, increment, decrement, reset }}>
      {children}
    </CounterContext.Provider>
  )
}

export function useCounter() {
  const context = useContext(CounterContext)

  if (!context) {
    throw new Error('useCounter phải được dùng trong <CounterProvider>')
  }

  return context
}
