import {createServer} from 'http';
const PORT = process.env.PORT;

const users = [
    {id:1, name:'John Doe'},
    {id:2, name:'Jane Doe'},
    {id:3, name:'Jim Doe'}
]

const Server = createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if(req.url === '/api/users' && req.method === 'GET'){
        
        res.write(JSON.stringify(users));
        
    }else if(req.url.match(/\/api\/user\/[0-9]+/) && req.method === 'GET'){
        const id = req.url.split('/')[3]
        const user = users.find((user) => user.id === parseInt(id));
        if(user){
            
            res.write(JSON.stringify(user));
            
        }else{
            
            res.statusCode = 404;
            res.write(JSON.stringify({message: 'user Not found'}));
            
        }
        
    }else{
        
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'Route Not found'}));
        
    }
    res.end();
})

Server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})