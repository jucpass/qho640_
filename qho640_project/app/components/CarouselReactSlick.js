import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import useProducts from '../database/products';

const Carousel = () => {
    const { products } = useProducts();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
        centerMode: true,
        centerPadding: '50px'
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }} className="slider-container">
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.id} className='card' style={{ padding: '0 15px' }}>
                        <figure className="image is-2by3">
                        <Image src={product.Image} alt={product.Model} width={500} height={100} />
                        </figure>
                        <h3>{product.Model}</h3>
                        <p>Price: £{product.Price}</p>
                    </div>
                    
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;
