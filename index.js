import http from 'http';
const PORT = process.env.PORT

const Server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});
    
    res.end('<h1>Hello World</h>')

});

Server.listen(PORT, () => {
    
    console.log(`Server is running on PORT ${PORT}`);
});