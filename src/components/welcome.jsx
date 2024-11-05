function Welcome({ handleEasy, handleMedium, handleHard }) {

    return (
        <>
            <div className="display">
                <h2>THE DISNEY MEMORY GAME</h2>
                <p>The year is 2045, Disney lies in ruins, its magic lost. Abandoned and forgotten, noble princes and princesses are imprisoned, their souls tormented by sinister forces. Only the bravest can venture into this cursed domain to play a haunting game of memory, to break the malevolent curse. Will you succeed in freeing the lost royals, or will you become another lost soul trapped in this forsaken kingdom.</p>

                <h3>Play to save these Damned Souls</h3>
                <div className="btns">
                    <button onClick={handleEasy}>Easy</button>
                    <button onClick={handleMedium}>Medium</button>
                    <button onClick={handleHard}>Hard</button>
                </div>
            </div>
        </>
    )
}

export default Welcome