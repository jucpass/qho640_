import React from "react";
import { useEffect } from "react";
import { UserAuth } from "../app/auth/AuthContext";
import Carousel from "../app/components/CarouselReactSlick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function IndexPage() {
    const { user } = UserAuth(); // Get the current user
    
  useEffect(() => {
    console.log("Current user in Index:", user);
}, [user]);
    return (
        <section className="section is-medium">
          <h1 className="title has-text-centered">Welcome to Connect Shop</h1>
          <div className="block"></div>
        <h2 className="subtitle has-text-centered">Check out our current promotions</h2>
        <Carousel />
      </section>
    );
  }
  
  export default IndexPage;