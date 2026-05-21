import { useState } from "react";
import { Container, Button, Stack } from "react-bootstrap";

export default function CounterApp() {
  const [count, setCount] = useState(0);
  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const handleReset = () => {
    setCount(0);
  };
  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">Counter App</h1>
      <h2 className="mb-4">{count}</h2>
      <Stack direction="horizontal" gap={3} className="justify-content-center">
        <Button variant="success" onClick={handleIncrease}>
          Tăng
        </Button>
        <Button
          variant="danger"
          onClick={handleDecrease}
          disabled={count === 0}
        >
          Giảm
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Stack>
    </Container>
  );
}
