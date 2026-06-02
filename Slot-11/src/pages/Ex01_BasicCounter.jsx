import { useReducer } from "react";
import { Card, Button, ButtonGroup } from "react-bootstrap";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function Ex01_BasicCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card className="mx-auto" style={{ maxWidth: 400 }}>
      <Card.Header>
        <strong>Bai 1 - Basic Counter</strong>
      </Card.Header>
      <Card.Body className="text-center">
        <h1 data-testid="count-display">{state.count}</h1>

        <ButtonGroup className="mt-3">
          <Button
            variant="danger"
            data-testid="btn-decrement"
            onClick={() => dispatch({ type: "DECREMENT" })}
          >
            -
          </Button>
          <Button
            variant="secondary"
            data-testid="btn-reset"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Reset
          </Button>
          <Button
            variant="success"
            data-testid="btn-increment"
            onClick={() => dispatch({ type: "INCREMENT" })}
          >
            +
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}
