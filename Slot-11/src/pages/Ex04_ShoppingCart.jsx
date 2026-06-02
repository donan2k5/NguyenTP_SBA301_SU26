import { useReducer } from "react";
import { Card, Button, Table, Badge, Row, Col } from "react-bootstrap";

const PRODUCTS = [
  { id: 1, name: "Ao thun", price: 150_000 },
  { id: 2, name: "Quan jean", price: 350_000 },
  { id: 3, name: "Giay vai", price: 280_000 },
];

const initialState = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        };
      }

      return { ...state, items: [...state.items, { ...product, qty: 1 }] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QTY": {
      const { id, qty } = action.payload;

      if (qty <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, qty } : item,
        ),
      };
    }
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
}

export default function Ex04_ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const itemCount = state.items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Card className="mx-auto" style={{ maxWidth: 650 }}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <strong>Bai 4 - Shopping Cart</strong>
        <Badge bg="danger" data-testid="item-count">
          {itemCount}
        </Badge>
      </Card.Header>
      <Card.Body>
        <h6>San pham</h6>
        <Row className="mb-4">
          {PRODUCTS.map((p) => (
            <Col key={p.id} xs={4}>
              <Card>
                <Card.Body className="p-2 text-center">
                  <div>
                    <strong>{p.name}</strong>
                  </div>
                  <div className="text-muted small">
                    {p.price.toLocaleString()}d
                  </div>
                  <Button
                    size="sm"
                    className="mt-1"
                    data-testid={`btn-add-${p.id}`}
                    onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}
                  >
                    + Them
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h6>Gio hang</h6>
        <Table size="sm" bordered data-testid="cart-table">
          <thead>
            <tr>
              <th>San pham</th>
              <th>Don gia</th>
              <th>So luong</th>
              <th>Thanh tien</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.items.map((item) => (
              <tr key={item.id} data-testid={`cart-row-${item.id}`}>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}d</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    value={item.qty}
                    data-testid={`qty-input-${item.id}`}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_QTY",
                        payload: { id: item.id, qty: Number(e.target.value) },
                      })
                    }
                    style={{ width: 70 }}
                  />
                </td>
                <td>{(item.price * item.qty).toLocaleString()}d</td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    data-testid={`btn-remove-${item.id}`}
                    onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", payload: item.id })
                    }
                  >
                    Xoa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between align-items-center">
          <strong data-testid="cart-total">
            Tong: {total.toLocaleString()}d
          </strong>
          <Button
            variant="outline-danger"
            size="sm"
            data-testid="btn-clear-cart"
            onClick={() => dispatch({ type: "CLEAR_CART" })}
          >
            Clear Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
