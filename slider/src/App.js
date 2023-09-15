import React, {useState, useEffect} from 'react';
import Slider from './components/slider';

function App() {
  //состояние для получения фото из запроса
  const [photo, setPhoto] = useState([]);
  const [status, setStatus] = useState('Загрузка данных...')

  //удобно будет редактировать,если ссылка поменяется
  const galleryURL = 'https://648b049d17f1536d65ea229b.mockapi.io/Sliders';

  //запрос за "сервер"  для получения данных
  //сначала хотел через цепочку then
  //но подумал, что читабельнее будет через async/await
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(galleryURL);
        const json = await response.json();
        setPhoto(json);
      } catch (err) {
        console.warn(err);
        setStatus('Ошибка при получении пользователей. Обновите страницу');
      } finally {
        console.log('Запрос отработал');
      }
    };
  
    fetchData();
  }, []);

  //через тернарный сделал ожидание, пока данные не придут
  return (
    <div className="App">
      {photo.length > 0 ? (
        <Slider photo={photo} />
      ) : (
        <p>{status}</p>
      )}
    </div>
  );
}

export default App;
