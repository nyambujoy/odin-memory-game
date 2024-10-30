import { useState } from 'react';
import './index.css';
import Welcome from './components/welcome';
import Cards from './components/cards';
// import { flushSync } from 'react-dom';

function App() {
  const [gifs, setGifs] = useState([]); // Changed from setGif to setGifs
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true)


  async function getGif() {
    setLoading(true);



    const limit = 12;
    const apiKey = 'JVVbZPF2CSxAkYT1OJsACWsnCr2BJ06j';
    const fetchedGifs = [];
    // const displayedGifIds = new Set();

    while (fetchedGifs.length < limit) {
      const offset = Math.floor(Math.random() * 100);
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=disney&limit=${limit}&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`)
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        fetchedGifs.push(...data.data);
      }

    }
    setGifs(fetchedGifs); // Fixed to setGifs
    setLoading(false);
  }

  function handleEasy() {
    getGif();
    setShowWelcome(false)
  }

  return (
    <>
      {showWelcome && <Welcome handleEasy={handleEasy} />}
      <Cards gifs={gifs} loading={loading} />

    </>
  )
}

export default App;

