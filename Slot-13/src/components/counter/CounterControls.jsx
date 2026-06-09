import { useCounter } from '../../context/CounterContext'

export default function CounterControls() {
  const { increment, decrement, reset } = useCounter()

  return (
    <div>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  )
}
