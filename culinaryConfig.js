const culinaryConfig = {
    userName: "CodeAndCulinary",
    apiURL: "https://api.github.com/users/",
    rawURL: "https://raw.githubusercontent.com/",
    blackListEnabled: true,
    repositoryBlacklist: ["CodeAndCulinary-web"],
    //How long to keep a recipe response in the cache
    revalidationTime: 10
}
module.exports = culinaryConfig;