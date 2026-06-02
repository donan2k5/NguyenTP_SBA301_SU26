import { useReducer } from "react";
import { Card, Button, ButtonGroup, Form, Badge } from "react-bootstrap";

const initialState = { count: 0, step: 1, history: [] };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + state.step,
        history: [...state.history.slice(-9), state.count],
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - state.step,
        history: [...state.history.slice(-9), state.count],
      };
    case "RESET":
      return initialState;
    case "SET_STEP":
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

export default function Ex02_CounterWithStep() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card className="mx-auto" style={{ maxWidth: 480 }}>
      <Card.Header>
        <strong>Bai 2 - Counter voi Step & History</strong>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-3">
          <h1 data-testid="count-display">{state.count}</h1>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Step</Form.Label>
          <Form.Control
            type="number"
            data-testid="step-input"
            min={1}
            value={state.step}
            onChange={(e) =>
              dispatch({ type: "SET_STEP", payload: Number(e.target.value) })
            }
          />
        </Form.Group>

        <ButtonGroup className="w-100 mb-3">
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

        <div>
          <small className="text-muted">History:</small>
          <div
            data-testid="history-list"
            className="mt-1 d-flex flex-wrap gap-1"
          >
            {state.history.map((item, index) => (
              <Badge
                bg="secondary"
                key={`${item}-${index}`}
                data-testid="history-item"
              >
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
