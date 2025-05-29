import {createServer} from 'http';
const PORT = process.env.PORT;

const users = [
    {id:1, name:'John Doe'},
    {id:2, name:'Jane Doe'},
    {id:3, name:'Jim Doe'}
]

const logger = (req, res, next) => {
    console.log(`${req.method} & ${req.url}`);
    next();
}

// let create a json middleware

const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}

// create a handler for GET /api/users

const getUsersHandler = (req, res) => {
    res.write(JSON.stringify(users));
    res.end();
}

// create a handler for GET user by id

const getUserByIdHandler = (req, res) => {
    const id = req.url.split('/')[3]
    const user = users.find((user) => user.id === parseInt(id));
    if(user){
        res.write(JSON.stringify(user));
        res.end();
    }else{
        res.statusCode = 404;
        res.write(JSON.stringify({message: 'user Not found'}));
        res.end();
    }
}

// lets create a not found handler

const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.write(JSON.stringify({message: 'Route Not found'}));
    res.end();
}

const Server = createServer((req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if(req.url === '/api/users' && req.method === 'GET'){
                getUsersHandler(req, res); 
            }else if(req.url.match(/\/api\/user\/[0-9]+/) && req.method === 'GET'){
                getUserByIdHandler(req, res);
            }else{
                notFoundHandler(req, res);
            }
        })
    
    })
})

Server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})