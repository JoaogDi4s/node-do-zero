import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {

    //await espera a função terminar para continuar
    //para usar await precisa de async na função
    async list(search) {
        let videos

        if (search) {
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        } else {
            videos = await sql`select * from videos`
        };

        return videos;
    };

    async create(video) {
        const videoId = randomUUID();

        const { title, description, duration } = video
        await sql`insert into videos (id, title, description, duration) VALUES (${videoId},${title},${description},${duration})`
    };

    async update(id, video) {
        const { title, description, duration } = video

        await sql`update videos set title= ${title}, description = ${description}, duration = ${duration} where id = ${id}`
    };

    async delete(id) {
        await sql`DELETE from videos where id = ${id}`
    };
}