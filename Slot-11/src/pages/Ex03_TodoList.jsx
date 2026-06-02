import { useReducer, useState } from "react";
import {
  Card,
  Form,
  Button,
  ListGroup,
  Badge,
  ButtonGroup,
} from "react-bootstrap";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo,
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "CLEAR_DONE":
      return state.filter((todo) => !todo.done);
    default:
      return state;
  }
}

export default function Ex03_TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState("");

  function handleAdd() {
    const value = text.trim();
    if (!value) return;

    dispatch({
      type: "ADD_TODO",
      payload: { id: Date.now(), text: value, done: false },
    });
    setText("");
  }

  const pendingCount = state.filter((t) => !t.done).length;

  return (
    <Card className="mx-auto" style={{ maxWidth: 500 }}>
      <Card.Header>
        <strong>Bai 3 - Todo List</strong>{" "}
        <Badge bg="primary" data-testid="pending-count">
          {pendingCount}
        </Badge>{" "}
        pending
      </Card.Header>
      <Card.Body>
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            data-testid="todo-input"
            placeholder="Nhap cong viec..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button data-testid="btn-add-todo" onClick={handleAdd}>
            Them
          </Button>
        </div>

        <ListGroup data-testid="todo-list" className="mb-3">
          {state.map((todo) => (
            <ListGroup.Item
              key={todo.id}
              data-testid={`todo-item-${todo.id}`}
              className="d-flex justify-content-between align-items-center"
            >
              <span
                style={{ textDecoration: todo.done ? "line-through" : "none" }}
              >
                {todo.text}
              </span>
              <ButtonGroup size="sm">
                <Button
                  variant={todo.done ? "outline-secondary" : "outline-success"}
                  data-testid={`btn-toggle-${todo.id}`}
                  onClick={() =>
                    dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                  }
                >
                  Toggle
                </Button>
                <Button
                  variant="outline-danger"
                  data-testid={`btn-delete-${todo.id}`}
                  onClick={() =>
                    dispatch({ type: "DELETE_TODO", payload: todo.id })
                  }
                >
                  Delete
                </Button>
              </ButtonGroup>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Button
          variant="outline-danger"
          size="sm"
          data-testid="btn-clear-done"
          onClick={() => dispatch({ type: "CLEAR_DONE" })}
        >
          Clear Done
        </Button>
      </Card.Body>
    </Card>
  );
}
