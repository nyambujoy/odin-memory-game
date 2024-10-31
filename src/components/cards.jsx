

function Cards({ gifs, loading, title, handleClick, score, highScore }) {
    return (
        <div className="conta">
            <h2>{title}</h2>
            <p>Score: {score}</p>
            <p>Top Score:{highScore}</p>
            <div className="gifs">

                {loading ? (
                    <p>Loading...</p>
                ) : gifs.length > 0 ? (
                    <div className="gifsContainer">
                        {gifs.map(({ id, images }) => (
                            <img src={images.original.url}
                                key={id}
                                alt={`GIF of ${id} `}
                                style={{ cursor: "pointer" }}
                                onClick={() => handleClick(id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No GIFs found.</p>
                )}
            </div>
        </div>

    )

}

export default Cards