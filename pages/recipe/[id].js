import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const RecipePage = ({ recipeData }) => {
    return (
        <div>
            <p>{recipeData.toString()}</p>
        </div>
    );
};

export async function getServerSideProps({req, res, query: { id }}) {
    // Fetch data from external API
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=604800'
    )
    const res2 = await fetch(`https://raw.githubusercontent.com/CodeAndCulinary/` + id + "/main/recipe.json")
    console.log(res2)
    const recipeData = await res2.json()
    console.log(recipeData)
    // Pass data to the page via props
    return { props: { recipeData } }
  }


export default RecipePage;