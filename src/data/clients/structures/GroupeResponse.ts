export type Picture = {
    profile: string
    banner: string
}

export type socialNetwork = {
    name: string
    link: string
}

export type location = {
    city: string
    state: string
    contry: string
}

export type GroupResponse = {
    id: string
    name:string
    pictures: Picture
    socialNetworks: socialNetwork[]
    tags: string[]
    location: location
    createAt: string
    updateAt: string
    deleteAt: string
}