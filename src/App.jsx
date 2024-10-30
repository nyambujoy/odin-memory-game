import { useState } from 'react';
import './index.css';

function App() {
  const [gifs, setGifs] = useState([]); // Changed from setGif to setGifs
  const [loading, setLoading] = useState(false);

  async function getGif() {
    setLoading(true);
    const disneyPrincesses = [
      "Snow White",
      "Cinderella",
      "Moana",
      "Aurora",
      "Ariel",
      "Belle",
      "Jasmine",
      "Pocahontas",
      "Mulan",
      "Tiana",
      "Rapunzel",
      "Merida",
    ];
    const limit = 12;
    const apiKey = 'JVVbZPF2CSxAkYT1OJsACWsnCr2BJ06j';
    const fetchedGifs = [];

    for (const princess of disneyPrincesses) {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(princess)}&limit=${limit}`);
      const data = await response.json();
      console.log(`GIFs for ${princess}:`, data);

      // Check if the response has valid data before pushing
      if (data.data && data.data.length > 0) {
        fetchedGifs.push(...data.data);
      }
    }

    setGifs(fetchedGifs); // Fixed to setGifs
    setLoading(false);
  }

  function handleEasy() {
    getGif();
  }

  return (
    <div className="container">
      <div className="display">
        <p>The year is 2045, Disney lies in ruins, its magic lost. Abandoned and forgotten, noble princes and princesses are imprisoned, their souls tormented by sinister forces. Only the bravest can venture into this cursed domain to play a haunting game of memory, to break the malevolent curse. Will you succeed in freeing the lost royals, or will you become another lost soul trapped in this forsaken kingdom.</p>

        <h2>Play to save these Damned Souls</h2>
        <div className="btns">
          <button onClick={handleEasy}>Easy</button>
          <button>Medium</button>
          <button>Hard</button>
        </div>
      </div>

      <div className="gifs">
        {loading ? (
          <p>Loading...</p>
        ) : gifs.length > 0 ? (
          <div className="gifsContainer">
            {gifs.map(({ id, images }) => (
              <img src={images.original.url} key={id} alt={`GIF of ${id}`} />
            ))}
          </div>
        ) : (
          <p>No GIFs found.</p>
        )}
      </div>
    </div>
  );
}

export default App;

