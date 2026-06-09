import { useCounter } from '../../context/CounterContext'

export default function CounterDisplay() {
  const { count } = useCounter()

  return <div>{count}</div>
}
