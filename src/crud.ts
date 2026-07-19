import { URLModel } from "./schema";

export const insert = async (id: string, url: string) => {
    return await URLModel.insertMany([{ id, url }])
}

export const findID = async (id: string) => {
    return await URLModel.findOne({ id })
}

export const findURL = async (url: string) => {
    return await URLModel.findOne({ url })
}

export const findAll = async () => {
    return await URLModel.find()
}