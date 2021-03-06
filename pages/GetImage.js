import { useState, useEffect } from "react";

const GetImage = () => {
    const [image, setImage] = useState('');

    const handleGetImage = () => {
        fetch(process.env.NEXT_PUBLIC_LOCALHOST + "/api/GetImage")
        .then(res => res.blob())
        .then(blob => {
            const urlImage = URL.createObjectURL(blob);
            setImage(urlImage);
        })          
    }

    return (
        <div>
            <button onClick={handleGetImage}>Get Image</button>
            <img src={image} alt="get image" />
        </div>
    )
}

export default GetImage;