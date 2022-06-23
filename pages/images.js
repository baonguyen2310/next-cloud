import { useState } from "react"

const Images = () => {
    const [image, setImage] = useState({preview: '', data: ''})
    const [imageServer, setImageServer] = useState('');
    
    const handleChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        console.log(img);
        setImage(img);
    }

    const handleUpload = (e) => {
        let formData = new FormData();
        formData.append('imageData', image.data);
        const response = fetch('http://localhost:3000/api/images', {
            method: 'POST',
            body: formData
        }).then((res) => res.json())
        .then(json => setImageServer(json.url))
        .catch((err) => console.log(err));
    }

    return (
        <div>
            <h1>Hình ở client: </h1>
            <img src={image.preview} width="400" />
            <input type="file" onChange={handleChange}/>
            <button onClick={handleUpload}>Upload</button>
            <h1>Hình ở Server cloud</h1>
            <img src={imageServer} width="400" />
        </div>
    )
}

export default Images