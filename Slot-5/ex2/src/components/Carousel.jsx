import { Carousel } from "react-bootstrap";

function BannerCarousel({ banners }) {
  return (
    <Carousel interval={3000} pause="hover">
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt="Banner"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerCarousel;
