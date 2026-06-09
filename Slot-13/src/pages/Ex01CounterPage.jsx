import { CounterProvider } from '../context/CounterContext'
import CounterControls from '../components/counter/CounterControls'
import CounterDisplay from '../components/counter/CounterDisplay'
import StatusMessage from '../components/counter/StatusMessage'

export default function Ex01CounterPage() {
  return (
    <CounterProvider>
      <div>
        <CounterDisplay />
        <CounterControls />
        <StatusMessage />
      </div>
    </CounterProvider>
  )
}
