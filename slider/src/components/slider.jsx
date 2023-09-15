import React, {useState, useRef} from 'react';
import './slider.scss';

const Slider = ({ photo }) => {
  //состояние для активного фото
  const [pages, setPages] = useState(0);

  //для текста внутри кнопки "автопроигрывание"
  const [isAuto, setIsAuto] = useState('Включить автопроигрывание')

  //состояние для автопроигрывания
  const autoPlay = useRef(null);

  //функциональность кнопок
  const plusPages = () => {
    setPages((pages) => pages + 1);
    stopAutoPlay();
  };

  const minusPages = () => {
    setPages((pages) => pages - 1);
    if(pages <= 0){
      setPages((pages) => Math.abs(pages - 1))
    }
    stopAutoPlay();
  };

  const autoPages = () => {
    if (!autoPlay.current) {
      setIsAuto('Отключить автопроигрывание')
      
      autoPlay.current = setInterval(() => {
        setPages((pages) => (pages + 1) % photo.length);
      }, 2000);
    } else {
      setIsAuto('Включить автопроигрывание')
      clearInterval(autoPlay.current);
      autoPlay.current = null;
    }
  };

  const stopAutoPlay = () => {
    if (autoPlay.current) {
      setIsAuto('Включить автопроигрывание')
      clearInterval(autoPlay.current);
      autoPlay.current = null;
    }
  };

  const currentPhoto = photo[pages % photo.length];

  return (
    <div className="gallery">
      <h3 className="gallery__title">{currentPhoto.name}</h3>

      <button
        className="prev-button"
        aria-label="Посмотреть предыдущий слайд"
        onClick={minusPages}
      >
        &lt;
      </button>

      <img
        className="gallery__photo"
        src={currentPhoto.photos}
        alt={currentPhoto.name}
      />

      <button
        className="next-button"
        aria-label="Посмотреть следующий слайд"
        onClick={plusPages}
      >
        &gt;
      </button>

      <button 
        onClick={autoPages} 
        className="gallery__button"
        aria-label="Включить/отключить автопроигрывание"
      >
        {isAuto}
      </button>
    </div>
  );
};

export default Slider;