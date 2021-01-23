const db = require("../../data/dbConfig")

async function add(user){
    const [id] = await db("users")
        .insert(user)
        return findByUserId(id)
}

async function findByUserId(id){
    return await db("users")
        .select("username", "password", "id")
        .where("id", id)
}

async function findByUsername(username){
    return db("users")
        .select("username", "password", "id")
        .where(username)
}

module.exports = {
    add,
    findByUserId,
    findByUsername
}