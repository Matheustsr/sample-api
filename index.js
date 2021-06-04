const express = require("express");

const server = express();


server.get('/cursos/:id', (req, res) => {

    const id = req.params.id;
    
    return res.json({ curso: `Aprendendo ${id}`});
})

server.listen(3000);

