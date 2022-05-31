import React from 'react'
import NavBar from './Nav';
import Head from 'next/head'
function recipeHandler(recipeData) {

    return (
        <>
            <Tags tagsContent={ recipeData.tags }/>
            <ul>
                {recipeData.content.map((recipeObj) =>(
                    <RecipeObjectHandler recipeObject={recipeObj}/>
                ))}
            </ul>
        </>
    );
};

const RecipeObjectHandler = ({ recipeObject }) => {
    if (recipeObject.type === "text") {return await textHandler(recipeObject.content) }
    if (recipeObject.type === "header") {return await headerHandler(recipeObject.content) }
    if (recipeObject.type === "subheader") {return await subHeaderHandler(recipeObject.content) }
    if (recipeObject.type === "list") {return await listHandler(recipeObject.content) }
    if (recipeObject.type === "image") {return await imageHandler(recipeObject.content) }
    if (recipeObject.type === "webm") {return await webmHandler(recipeObject.content) }
    return (<></>)
}

async function headerHandler(content) {

}
async function textHandler(content) {

}
async function subHeaderHandler(content) {

}
async function listHandler(content) {

}
async function webmHandler(content) {

}
async function imageHandler(content) {

}
const Tags = ({ tagsContent }) => {
    return (
        <Head><title>{tagsContent}</title></Head>
    )
}

module.exports = recipeHandler;