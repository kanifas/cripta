export type TNewsObject = {
    name: string
    description: string
    url: string
    image: {
        thumbnail: {
            contentUrl: string
        }
    }
    datePublished: string
    provider: Array<{
        name: string
        image: {
            thumbnail: {
                contentUrl: string
            }
        }
    }>
}