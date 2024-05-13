import React from "react";
import { useEffect } from "react";
import { UserAuth } from "../app/auth/AuthContext";
import Carousel from "../app/components/CarouselReactSlick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function IndexPage() {
    const { user } = UserAuth();
  useEffect(() => {
    console.log("Current user in Index:", user);
}, [user]);
    return (
        <section className="section is-large">
          <h1 className="title">INDEX PAGE</h1>
        <p>This is the index Page</p>
        <Carousel />
      </section>
    );
  }
  
  export default IndexPage;