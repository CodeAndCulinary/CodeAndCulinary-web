const culinaryConfig = require('./../culinaryConfig');

class gitFetch {
    static async getRaw(id){
        const res = await fetch(culinaryConfig.rawURL + culinaryConfig.userName + "/" + id + "/main/recipe.json")
        const recipeData = await res.json()
        return recipeData
    }
    static async getRepositories(){
        const res = await fetch(culinaryConfig.apiURL + culinaryConfig.userName + "/repos")
        const repositories = await res.json()
        return repositories
    }
    static async fetchTest(){
        const res = await fetch("https://minecraft.fandom.com/wiki/Minecraft_Wiki")
        return
    }
}



module.exports = gitFetch;