

function Cards({ gifs, loading }) {

    return (

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
    )

}

export default Cards