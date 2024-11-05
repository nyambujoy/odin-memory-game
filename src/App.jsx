import { useState } from 'react';
import './index.css';
import Welcome from './components/welcome';
import Cards from './components/cards'


function App() {
  const [gifs, setGifs] = useState([]); // Changed from setGif to setGifs
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true)
  const [title, setTitle] = useState('')
  const [score, setScore] = useState(0);
  const [clickedCards, setClickedCard] = useState([])
  const [gameStatus, setGameStatus] = useState("ongoing")







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



  function startGame(difficulty, limit) {

    setShowWelcome(false)
    setTitle("The Disney Memory Game")
    setScore(0)
    setClickedCard([])
    setGameStatus("ongoing");
    getGif(limit)
  }
  const handlePlayAgain = () => {
    setScore(0);
    setClickedCard([]);
    setGameStatus("ongoing");
    // setGameOver(false)
    reshuffle();
    // handleEasy()
    // handleMedium()
    // handleMedium()
  };

  const leaveGame = () => {
    console.log("quit")
    setScore(0);
    setClickedCard([]);
    setGameStatus("ongoing");
    setShowWelcome(true)
    setGifs([])


  }

  function handleEasy() {
    startGame("Easy", 3);

  }

  function handleMedium() {
    startGame("Medium", 6);
  }

  function handleHard() {
    startGame("hard", 12);
  }

  const reshuffle = () => {
    const shuffled = [...gifs].sort(() => Math.random() - 0.5)
    setGifs(shuffled)
  }






  return (
    <>
      {showWelcome && <Welcome handleEasy={handleEasy} handleMedium={handleMedium} handleHard={handleHard} />}
      {/* handleClick={handleClick} */}
      {/* score={score}  highScore={highScore} */}
      <Cards gifs={gifs} loading={loading} title={title} reshuffle={reshuffle}
        handleMedium={handleMedium} handleHard={handleHard}
        handleEasy={handleEasy} score={score} setScore={setScore}
        clickedCards={clickedCards} setClickedCard={setClickedCard}
        leaveGame={leaveGame}
        gameStatus={gameStatus} setGameStatus={setGameStatus}
        handlePlayAgain={handlePlayAgain} showWelcome={showWelcome} />

    </>
  )
}

export default App;

