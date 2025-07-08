import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCuisinesData } from '../utils/cusinesData';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/global.css';
import koreanCuisineImg from '../assets/korean-cuisine.jpg';

function Arrow(props) {
  const { className, style, onClick, left } = props;
  return (
    <div
      className={className + ' cuisine-slider-arrow'}
      style={{ ...style, display: 'block', [left ? 'left' : 'right']: 0, zIndex: 2 }}
      onClick={onClick}
    >
      {left ? <FaChevronLeft /> : <FaChevronRight />}
    </div>
  );
}

export default function CuisinesNav() {
  const navigate = useNavigate();
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    fetchCuisinesData().then(setCuisines);
  }, []);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <Arrow left={false} />,
    prevArrow: <Arrow left={true} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 5 }
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2.5 }
      }
    ]
  };

  return (
    <div className="cuisines-nav-slider">
      <Slider {...settings}>
        {cuisines.map(cuisine => (
          <div key={cuisine.id || cuisine.name} className="cuisine-slider-item">
            <div
              className="cuisine-btn"
              onClick={() => navigate(`/recipes/${cuisine.name.toLowerCase()}`)}
              tabIndex={0}
              role="button"
              aria-label={cuisine.name}
            >
              {cuisine.name === 'Korean' ? (
                <img src={koreanCuisineImg} alt={cuisine.name} className="cuisine-img" />
              ) : cuisine.image ? (
                <img src={cuisine.image} alt={cuisine.name} className="cuisine-img" />
              ) : (
                <div className="cuisine-img cuisine-img-empty"></div>
              )}
              <div className="cuisine-label">{cuisine.name.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
} 