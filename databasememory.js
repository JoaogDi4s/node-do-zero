import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    //SET -> array que nn aceita duplicatas
    //MAP -> API
    #videos = new Map()

    list(search) {
        return Array.from(this.#videos.entries()).map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,
                ...data,
            }
        })
            //Values nn traz Id, Entries traz

            .filter(video => {
                if (search) {
                    return video.title.includes(search)
                } return true
            })
    };

    create(video) {
        // set recebe 2 paramatros
        const videoId = randomUUID(); //UNIVERSAL UNIQUE ID
        this.#videos.set(videoId, video);
    };

    update(id, video) {
        this.#videos.set(id, video);
    };

    delete(id) {
        this.#videos.delete(id);
    };
}