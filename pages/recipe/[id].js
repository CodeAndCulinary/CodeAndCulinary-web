import * as React from "react";
const culinaryConfig = require('./../../culinaryConfig');
const gitFetch = require('./../../functions/fetcher');
const recipeHandler = require('./../../components/recipeHandler');
import { getPlaiceholder } from "plaiceholder";

const RecipePage = ({ repositoryData, recipeData, recipeFound, id, imageCache }) => {

    return (
        <>
            {recipeFound === true ? recipeHandler(recipeData, id, imageCache) : notFound()}
        </>
    );
};



export async function getStaticProps({req, res, params}) {
    // Fetch data from external API
    var recipeFound = true
    if (culinaryConfig.blackListEnabled == true && culinaryConfig.repositoryBlacklist.includes(params.id)) {
        recipeFound = false
        return { props: { recipeFound }, revalidate: culinaryConfig.revalidationTime,}
    }
    const repositories = await gitFetch.getRepositories()
    var recipeIndex = -1
    for (var i = 0; i < repositories.length; i++) {
        if (repositories[i].name == params.id) {
            recipeIndex = i
            break
        }
    }

    if (recipeIndex == -1) {
        recipeFound = false
        return { props: { recipeFound }, revalidate: culinaryConfig.revalidationTime,}
    }

    const repositoryData = repositories[recipeIndex]
    const recipeData = await gitFetch.getRaw(params.id)
    //const testData = await gitFetch.fetchTest()
    const id = params.id

    //Image caching that has to be in getStaticProps
    var imageCache = {}
    for (var i = 0; i < recipeData.sections.length; i++) {
        for (var i2 = 0; i2 < recipeData.sections[i].sectionContent.length; i2++) {
            if (recipeData.sections[i].sectionContent[i2].type !== "image") {continue}
            const imagePath = recipeData.sections[i].sectionContent[i2].content
            const getPlaiceImage = await getPlaiceholder(culinaryConfig.imageURL + culinaryConfig.userName + "/" + id + "/raw/main" + imagePath, { size: culinaryConfig.imageBlurDetails })
            imageCache[imagePath] = getPlaiceImage
        }
    }

    console.log(recipeData)
    // Pass data to the page via props
    return { props: { repositoryData, recipeData, recipeFound, id, imageCache }, revalidate: culinaryConfig.revalidationTime,}
  }

  export async function getStaticPaths() {
    const repositories = await gitFetch.getRepositories()
    var recipes = []
    if (!culinaryConfig.blackListEnabled) {
        recipes = repositories.map(function(repository){
            return repository.name
        })
    } else {
        for (var i = 0; i < repositories.length; i++) {
            if (!culinaryConfig.repositoryBlacklist.includes(repositories[i].name)) {
               recipes.push(repositories[i].name)
           }
       }
    }
    
  
    // Get the paths we want to pre-render based on posts
    const paths = recipes.map((recipe) => ({
      params: { id: recipe },
    }))
  
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
  }



  const notFound = () => {
    return (
        <div>
            <h1>404 no deliciousness found!</h1>
        </div>
    );
};

export default RecipePage;