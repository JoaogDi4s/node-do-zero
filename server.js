//// CRIANDO SERVIDOR NATIVO NO NODE

// import { createServer } from 'node:http'

// const server = createServer((request, response) =>{
//     response.write('teste')
//     return response.end()
// });

// server.listen(3333);

// NUNCA MEXER EM PACKAGE-LOCK.JSON
// NODE_MODULES GUARDA AS DEPENDÊNCIAS

// CRIANDO SERVIDOR COM MÓDULO FASTIFY
import { title } from "node:process";
import { DatabaseMemory } from "./databasememory.js";
import { fastify } from "fastify";
import { describe } from "node:test";
import { request } from "node:http";
import { DatabasePostgres } from "./database-postgres.js";
const server = fastify();

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// http://localhost:3333/videos

// Request body -> somente POST e PUT

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body
    await database.create({
        title,
        description,
        duration,
    })

    console.log(database.list())
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    // console.log(search)
    const videos = await database.list(search     )

    return videos
})


// :id É O ROUTE PARAMETER (UNIQUE)
server.put('/videos/:id', async (request, reply) => {
    const videosId = request.params.id;
    const { title, description, duration } = request.body;
    await database.update(videosId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videosId = request.params.id;
    await database.delete(videosId)
    return reply.status(204).send()
})

//QUANDO USUÁRIO ABRIR SOMENTE A PORTA
// server.get('/', () =>{
//     return 'Hello World!'
// })

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
});