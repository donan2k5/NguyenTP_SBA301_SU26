import { useReducer } from "react";
import { Alert, Button, Card, Form, Modal } from "react-bootstrap";
import { listOfUser } from "../../data/userData";

const initialState = {
  values: {
    username: "",
    password: "",
  },
  errors: {},
  touched: {},
  loginUser: null,
  showSuccessModal: false,
};

function validate(values) {
  const errors = {};

  if (!values.username.trim()) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
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
      };
    }
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
        touched: { username: true, password: true },
        loginUser: null,
        showSuccessModal: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        errors: {},
        touched: { username: true, password: true },
        loginUser: action.payload,
        showSuccessModal: true,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        errors: { form: "Username or password is incorrect" },
        touched: { username: true, password: true },
        loginUser: null,
        showSuccessModal: false,
      };
    case "CLOSE_SUCCESS_MODAL":
      return {
        ...state,
        showSuccessModal: false,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function Ex06_LoginForm({ onLoginSuccess = () => {} }) {
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

    const errors = validate(state.values);

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errors });
      return;
    }

    const loginUser = listOfUser.find(
      (user) =>
        user.username === state.values.username &&
        user.password === state.values.password,
    );

    if (loginUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: loginUser });
    } else {
      dispatch({ type: "LOGIN_FAILED" });
    }
  }

  function handleCloseSuccessModal() {
    dispatch({ type: "CLOSE_SUCCESS_MODAL" });
    onLoginSuccess(state.loginUser);
  }

  return (
    <>
      <Card className="mx-auto" style={{ maxWidth: 420 }}>
        <Card.Header>
          <strong>Bai 6 - Login Form</strong>
        </Card.Header>
        <Card.Body>
          {state.errors.form && (
            <Alert variant="danger" data-testid="login-error">
              {state.errors.form}
            </Alert>
          )}

          <Form onSubmit={handleSubmit} data-testid="login-form" noValidate>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                data-testid="input-username"
                name="username"
                value={state.values.username}
                onChange={handleChange}
                placeholder="admin"
                isInvalid={!!getError("username")}
              />
              <Form.Control.Feedback
                type="invalid"
                data-testid="error-username"
              >
                {getError("username")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                data-testid="input-login-password"
                name="password"
                value={state.values.password}
                onChange={handleChange}
                placeholder="123456"
                isInvalid={!!getError("password")}
              />
              <Form.Control.Feedback
                type="invalid"
                data-testid="error-login-password"
              >
                {getError("password")}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" data-testid="btn-login">
                Login
              </Button>
              <Button
                type="button"
                variant="secondary"
                data-testid="btn-login-reset"
                onClick={() => dispatch({ type: "RESET" })}
              >
                Reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Modal
        show={state.showSuccessModal}
        onHide={handleCloseSuccessModal}
        centered
        animation={false}
        data-testid="login-success-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Welcome, {state.loginUser?.fullName || state.loginUser?.username}!
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseSuccessModal} data-testid="btn-go-home">
            Go to Home
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
