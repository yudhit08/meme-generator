import React, { useState, useEffect } from "react";

function Meme() {
    const [allMeme, setAllMeme] = useState([]);
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "",
    });

    function getMeme(e) {
        e.preventDefault();
        const randData = allMeme[Math.floor(Math.random() * allMeme.length)];
        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: randData.url,
        }));
    }

    function handleChange(event) {
        setMeme((prevMeme) => ({
            ...prevMeme,
            [event.target.name]: event.target.value,
        }));
    }

    useEffect(() => {

        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data.data.memes))

        //using async function inside of useEffect
        // async function getMeme() {
        //     const res = await fetch("https://api.imgflip.com/get_memes")
        //     const data = await res.json()
        //     setAllMeme(data.data.memes)
        // }
        // getMeme()
        
    }, [])

    return (
        <main>
            <form action=''>
                <input
                    type='text'
                    name='topText'
                    id=''
                    placeholder='Top text'
                    onChange={handleChange}
                    value={meme.topText}
                />
                <input
                    type='text'
                    name='bottomText'
                    id=''
                    placeholder='Bottom text'
                    onChange={handleChange}
                    value={meme.bottomText}
                />
                <button type='submit' onClick={getMeme}>
                    Get a new meme image
                </button>
            </form>
            <div className='meme'>
                <img src={meme.randomImage} className='meme-img' />
                <h2 className='meme--text top'>{meme.topText}</h2>
                <h2 className='meme--text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    );
}

export default Meme;
