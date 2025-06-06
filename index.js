import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path'
import { error } from 'console';
const PORT = process.env.PORT;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Server = http.createServer( async (req, res) => {
    try {
        if(req.method === 'GET'){
            let filepath;
            if (req.url === '/'){
                filepath= path.join(__dirname, 'public', 'index.html');
                
    
            }else if (req.url === '/about'){
                filepath= path.join(__dirname, 'public', 'about.html')
                
            }else{
                throw new Error ("Page Not Found")
            }

            const data = await fs.readFile(filepath);
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end();
        }else{
            throw new Error ('Method Nokt Allowed')
        }
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'text/html'})
        res.end('Server error')
        
    }
    

});

Server.listen(PORT, () => {
    
    console.log(`Server is running on PORT ${PORT}`);
});