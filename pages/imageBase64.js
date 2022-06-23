import FileBase64 from 'react-file-base64';
import { useState } from 'react';

const ImageBase64 = () => {
    const [data, setData] = useState('');
    const [dataServer, setDataServer] = useState('');

    const handleUpload = (e) => {
        fetch("http://localhost:3000/api/imageBase64", {
            method: 'POST',
            body: data
        }).then((res) => res.json())
        .then((json) => {
            setDataServer(json);
        })

    }

    return (
        <div>
            <FileBase64
                accept="image/*"
                multiple={false}
                type="file"
                value={data}
                onDone={({ base64 }) => {
                    setData(base64);
                }}
            />
            <button onClick={handleUpload}>Upload Base64</button>
            <img src={data} alt="" />
            <img src={dataServer} alt="" />
        </div>
    )
}

export default ImageBase64;