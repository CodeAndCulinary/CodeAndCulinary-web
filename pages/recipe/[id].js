import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
const culinaryConfig = require('./../../culinaryConfig');
const gitFetch = require('./../../functions/fetcher');
const recipeHandler = require('./../../components/recipeHandler');

const RecipePage = ({ repositoryData, recipeData, recipeFound }) => {
    var content
    if (recipeFound === true) {content = recipeHandler(recipeData)} else {content = notFound()}

    return (
        <div>
            {content}
        </div>
    );
};



export async function getServerSideProps({req, res, query: { id }}) {
    // Fetch data from external API
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=1000, stale-while-revalidate=604800'
    )
    var recipeFound = true
    if (culinaryConfig.blackListEnabled == true && culinaryConfig.repositoryBlacklist.includes(id)) {
        recipeFound = false
        return { props: { recipeFound }}
    }
    const repositories = await gitFetch.getRepositories()
    var recipeIndex = -1
    for (var i = 0; i < repositories.length; i++) {
        if (repositories[i].name == id) {
            recipeIndex = i
            break
        }
    }

    if (recipeIndex == -1) {
        recipeFound = false
        return { props: { recipeFound }}
    }

    const repositoryData = repositories[recipeIndex]
    const recipeData = await gitFetch.getRaw(id)
    gitFetch.fetchTest()
    console.log(recipeData)
    // Pass data to the page via props
    return { props: { repositoryData, recipeData, recipeFound } }
  }

  const notFound = () => {
    return (
        <div>
            <h1>404 no deliciousness found!</h1>
        </div>
    );
};

export default RecipePage;