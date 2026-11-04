import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SLIDE_INTERVAL_MS = 5000;

interface SlideshowProps {
  images: { url: string; alt?: string }[];
  imageClassName?: string;
}

const Slideshow: React.FC<SlideshowProps> = ({ images, imageClassName }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow-container">
      <div className="slideshow-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((image, index) => (
          <div key={image.url} className="slide">
            <div className="slide-content">
              <img
                src={image.url}
                alt={image.alt ?? ''}
                className={imageClassName}
                loading={index < 3 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          </div>
        ))}
      </div>
      <button className="slide-arrow slide-arrow-left" onClick={prevSlide} aria-label="Previous image">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className="slide-arrow slide-arrow-right" onClick={nextSlide} aria-label="Next image">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Slideshow;
