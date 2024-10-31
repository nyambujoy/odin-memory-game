import { useState } from 'react';
import './index.css';
import Welcome from './components/welcome';
import Cards from './components/cards'


function App() {
  const [gifs, setGifs] = useState([]); // Changed from setGif to setGifs
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true)
  const [title, setTitle] = useState('')
  const [clickedCards, setClickedCard] = useState([])
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0)



  async function getGif(limit) {
    setLoading(true);



    // const limit = 12;
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
    getGif(3);
    setShowWelcome(false)
    setTitle("The Disney Memory Game")
  }

  function handleMedium() {
    getGif(6)
    setShowWelcome(false)
    setTitle("The Disney Memory Game")
  }

  function handleHard() {
    getGif(9)
    setShowWelcome(false)
    setTitle("The Disney Memory Game")
  }

  const handleScoreUpdate = (newScore) => {
    setScore(newScore)
    if (newScore > highScore) {
      setHighScore(newScore)
    }
  }

  const handleClick = (id) => {
    console.log(`clicked ${id}`)
    if (clickedCards.includes(id)) {
      setScore(0)
      setClickedCard([])
    } else {
      const newScore = score + 1;
      setClickedCard([...clickedCards, id])
      reShuffleGifs()
      handleScoreUpdate(newScore)
    }



  };



  const reShuffleGifs = () => {
    const shuffled = [...gifs].sort(() => Math.random() - 0.5)
    setGifs(shuffled)
  }



  return (
    <>
      {showWelcome && <Welcome handleEasy={handleEasy} handleMedium={handleMedium} score={score} handleHard={handleHard} handleClick={handleClick} highScore={highScore} />}
      <Cards gifs={gifs} loading={loading} title={title} />

    </>
  )
}

export default App;

