import React from 'react'
import NavBar from './Nav';
import Head from 'next/head'
function recipeHandler(recipeData) {

    return (
        <>
            <Tags tagsContent={ recipeData.tags }/>
            <div>
                {recipeData.content.map((recipeObj) =>(
                    <RecipeObjectHandler recipeObject={recipeObj}/>
                ))}
            </div>
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
    return(<h1>{content}</h1>)
}
async function textHandler(content) {
    return(<p>{content}</p>)
}
async function subHeaderHandler(content) {
    return(<h2>{content}</h2>)
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