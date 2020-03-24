import React from 'react';
import Slider from 'react-slick';
import Cartridge from './imgs/cartridge_front.png';
import ColorThief from 'colorthief';
import './sass/carousel.scss';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

export default class Carousel extends React.Component {

  render(){
    const { Games, setInProps, setCurrentGame, importImage, setColorSet } = this.props;
    const { inProps } = this.props;
    const ArrowPrev = ({currentSlide, slideCount, children, ...props}) => (
      <button
        {...props}
        className="slick-prev slick-arrow arrow-shadow">
          <IoIosArrowUp size={50} />
        </button>
    );
    const ArrowNext = ({currentSlide, slideCount, children, ...props}) => (
      <button
        {...props}
        className="slick-next slick-arrow arrow-shadow">
          <IoIosArrowDown size={50} />
        </button>
    );
    const getColorSet = () => {
      const colorThief = new ColorThief();
      const img = document.querySelector('div.slick-current img.game-main-image');
      if (img.complete) {
        setColorSet(colorThief.getPalette(img, 7));
      } else {
        img.addEventListener('load', function() {
          setColorSet(colorThief.getPalette(img, 7));
        });
      }
    }
    const images = importImage(require.context('./imgs', false, /main\.(png|jpe?g|svg)$/));
    const settings = {
      className: "game-carousel",
      infinite: true,
      vertical: true,
      prevArrow: <ArrowPrev />,
      nextArrow: <ArrowNext />,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: function(currentSlide, nextSlide) {
        setCurrentGame(Object.keys(Games)[nextSlide]);
        setInProps(!inProps);
      },
      afterChange: function(){
        getColorSet();
      }
    };
    return(
      <Slider {...settings}>
        {Object.keys(Games).map((key, i) => (
          <div className="carousel-wrapper" key={i}>
            <div className="active-glow" />
            <img className="carousel-image" rel="preload" src={Cartridge} alt="cartridge" width="300px" />
            <img className="game-main-image" rel="preload" src={images[`${key}_main.jpg`]} alt="main_image" width="165px" height="110px" />
            <div className="game-border"><p>{Games[key].serial}</p></div>
          </div>
        ))}
      </Slider>
    )
  }
}