import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
const culinaryConfig = require('./../../culinaryConfig');
const gitFetch = require('./../../functions/fetcher');
const recipeHandler = require('./../../components/recipeHandler');

const RecipePage = ({ repositoryData, recipeData, recipeFound, id }) => {

    return (
        <div>
            {recipeFound === true ? recipeHandler(recipeData, id) : notFound()}
        </div>
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
    const testData = await gitFetch.fetchTest()
    const id = params.id
    console.log(recipeData)
    // Pass data to the page via props
    return { props: { testData, repositoryData, recipeData, recipeFound, id }, revalidate: culinaryConfig.revalidationTime,}
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