import fs from 'fs'
import path from 'path'

//const filePath = path.join(__dirname, './pages/api/images/Screenshot.png');

export default function GetImage(req, res){
    res.writeHead(200, {
        'Content-Type': 'image/png'
    })
    const readStream = fs.createReadStream(path.join(process.cwd(), 'public/images/Screenshot.png'));
    readStream.pipe(res);
}