const culinaryConfig = {
    userName: "CodeAndCulinary",
    apiURL: "https://api.github.com/users/",
    rawURL: "https://raw.githubusercontent.com/",
    imageURL: "https://github.com/",
    blackListEnabled: true,
    repositoryBlacklist: ["CodeAndCulinary-web"],
    
    //How long to keep a recipe response in the cache
    revalidationTime: 10,
    imageCacheTTL: 10,
    
    //This setting is for getPlaiceholder's blur details. Value between 4-64. 
    //Higher number = exponentially increasing load and page size
    imageBlurDetails: 4
}
module.exports = culinaryConfig;