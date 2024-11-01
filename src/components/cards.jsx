// , handleClick
// , score, highScore
import { useState } from "react"
function Cards({ gifs, loading, title, reshuffle, handleMedium, handleHard, handleEasy }) {

    const [clickedCards, setClickedCard] = useState([])
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameStatus, setGameStatus] = useState("ongoing")
    // const [gameOver, setGameOver] = useState('false')

    const handlePlayAgain = () => {
        setScore(0);
        setClickedCard([]);
        setGameStatus("ongoing");
        // setGameOver(false)
        reshuffle();
    };

    const leaveGame = () => {
        console.log("quit")
        setScore(0);
        setClickedCard([]);
        setGameStatus("ongoing");
        // setGameOver(true);


    }


    const handleUpdateScore = (newScore) => {
        setScore(newScore)
        if (newScore > highScore) {
            setHighScore(newScore)
        }
    }

    const handleGifClick = (id) => {
        if (gameStatus !== "ongoing") return;

        console.log(`hello this img id is ${id}`);
        if (clickedCards.includes(id)) {
            setGameStatus("lost");
            setScore(0)
            setClickedCard([])
        } else {
            const newScore = score + 1;
            setClickedCard((prevClickedCards) => [...prevClickedCards, id])
            handleUpdateScore(newScore)
            if (newScore === gifs.length) {
                setGameStatus("won")
            } else {
                reshuffle()
            }
        }


    }
    return (
        <div className="conta">
            <h2>{title}</h2>
            <p>Score: {score}</p>
            {<p>Top Score:{highScore}</p>}
            {gameStatus === "won" && <p>You win! 🎉</p>}
            {gameStatus === "lost" && <p>You lose! Try again.</p>}

            {(gameStatus === "won" || gameStatus === "lost") && (

                <div>
                    <button onClick={handlePlayAgain}>Play Again</button>
                    <button onClick={handleEasy}>Easy</button>
                    <button onClick={handleMedium}>Medium</button>
                    <button onClick={handleHard}>Hard</button>
                    <button onClick={leaveGame}>QUIT</button>

                </div>
            )
            }


            {<div className="gifs">

                {loading ? (
                    <p>Loading...</p>
                ) : gifs.length > 0 ? (
                    <div className="gifsContainer">
                        {gifs.map(({ id, images }) => (
                            <img src={images.original.url}
                                key={id}
                                alt={`GIF of ${id} `}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                    handleGifClick(id)
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No GIFs found.</p>
                )}
            </div>}


        </div >

    )

}

export default Cards