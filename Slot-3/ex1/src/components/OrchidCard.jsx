import { Card, Button } from 'react-bootstrap';

function Orchid({orchids}) {
    return (
        <Card>
            <Card.Img variant="top" src={orchids.image} style={{height: '250px', objectFit: 'cover'}}/>
            <Card.Body>
                <Card.Title>{orchids.name}</Card.Title>
                <Card.Text>{orchids.category}</Card.Text>
            <Button variant="primary">
                Detail
            </Button>
            </Card.Body>
        </Card>
    )
}

export default Orchid