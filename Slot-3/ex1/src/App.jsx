import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Orchid from './components/OrchidCard';
import orchids from './data/orchids';
import {Row} from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import BannerCarousel from './components/Carousel';
import banners from './data/banner';
function App() {
  return(
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Single Page Application</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Container className='mb-5'>
      <BannerCarousel banners={banners}/>
    </Container>

    <Container>
      <Row>
        {
          orchids.map((orchid) => (
            <Col
            md={3}
            className='mb-4'
            key={orchid.id}
            >
            <Orchid orchids={orchid}/>
            </Col>
          ))
        }
      </Row>
    </Container>
    </>
  )
}
export default App;
