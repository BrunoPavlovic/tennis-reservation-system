import React from "react";
import {
  MDBCarousel,
  MDBCarouselItem,
  MDBCarouselCaption,
  MDBBtn
} from "mdb-react-ui-kit";

const Home: React.FC = () => {
  return (
    <div className="home-carousel-container">
      <MDBCarousel showIndicators showControls fade className="home-carousel">
        <MDBCarouselItem itemId={1}>
          <img
            src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            className="d-block w-100"
            alt="Tennis Court"
          />
          <MDBCarouselCaption>
            <h2 className="text-white fw-bold display-4">Welcome to Match Point</h2>
            <p className="text-white fs-5">Your premier tennis court reservation system</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={2}>
          <img
            src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            className="d-block w-100"
            alt="Tennis Match"
          />
          <MDBCarouselCaption>
            <h2 className="text-white fw-bold display-4">Professional Courts</h2>
            <p className="text-white fs-5">Experience the best tennis facilities in the city</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>

        <MDBCarouselItem itemId={3}>
          <img
            src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            className="d-block w-100"
            alt="Tennis Equipment"
          />
          <MDBCarouselCaption>
            <h2 className="text-white fw-bold display-4">Easy Booking System</h2>
            <p className="text-white fs-5">Reserve your court in seconds with our intuitive platform</p>
          </MDBCarouselCaption>
        </MDBCarouselItem>
      </MDBCarousel>
    </div>
  );
};

export default Home;