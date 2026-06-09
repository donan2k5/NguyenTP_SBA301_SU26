import { useCounter } from '../../context/CounterContext'

export default function StatusMessage() {
  const { count } = useCounter()

  if (count > 0) {
    return <p>Dương</p>
  }

  if (count < 0) {
    return <p>Âm</p>
  }

  return <p>Bằng 0</p>
}
