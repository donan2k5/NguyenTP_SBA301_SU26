import { useReducer } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

const initialState = {
  values: { name: "", email: "", password: "", confirm: "" },
  errors: {},
  touched: {},
  submitted: false,
};

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }
  if (!values.email.includes("@")) {
    errors.email = "Email must contain @";
  }
  if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (values.confirm !== values.password) {
    errors.confirm = "Confirm password must match";
  }

  return errors;
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD": {
      const { field, value } = action.payload;
      const values = { ...state.values, [field]: value };

      return {
        ...state,
        values,
        errors: validate(values),
        touched: { ...state.touched, [field]: true },
        submitted: false,
      };
    }
    case "SUBMIT": {
      const errors = validate(state.values);

      return {
        ...state,
        errors,
        touched: { name: true, email: true, password: true, confirm: true },
        submitted: Object.keys(errors).length === 0,
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function Ex05_FormValidation() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function getError(field) {
    return state.touched[field] ? state.errors[field] : undefined;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", payload: { field: name, value } });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
  }

  return (
    <Card className="mx-auto" style={{ maxWidth: 480 }}>
      <Card.Header>
        <strong>Bai 5 - Form Validation</strong>
      </Card.Header>
      <Card.Body>
        {state.submitted && (
          <Alert variant="success" data-testid="form-success">
            Dang ky thanh cong!
          </Alert>
        )}

        <Form onSubmit={handleSubmit} data-testid="register-form" noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Ho ten</Form.Label>
            <Form.Control
              data-testid="input-name"
              name="name"
              value={state.values.name}
              onChange={handleChange}
              placeholder="Ho va ten"
              isInvalid={!!getError("name")}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-name">
              {getError("name")}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              data-testid="input-email"
              name="email"
              value={state.values.email}
              onChange={handleChange}
              placeholder="email@example.com"
              isInvalid={!!getError("email")}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-email">
              {getError("email")}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mat khau</Form.Label>
            <Form.Control
              type="password"
              data-testid="input-password"
              name="password"
              value={state.values.password}
              onChange={handleChange}
              placeholder="Toi thieu 6 ky tu"
              isInvalid={!!getError("password")}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-password">
              {getError("password")}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Xac nhan mat khau</Form.Label>
            <Form.Control
              type="password"
              data-testid="input-confirm"
              name="confirm"
              value={state.values.confirm}
              onChange={handleChange}
              placeholder="Nhap lai mat khau"
              isInvalid={!!getError("confirm")}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-confirm">
              {getError("confirm")}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" data-testid="btn-submit">
              Dang ky
            </Button>
            <Button
              type="button"
              variant="secondary"
              data-testid="btn-reset"
              onClick={() => dispatch({ type: "RESET" })}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
