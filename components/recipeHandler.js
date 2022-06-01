import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
function recipeHandler(recipeData, id) {
    

    return (
        <>
            <Tags tagsContent={ recipeData.tags }/>
            <article>
                {recipeData.content.map((recipeObj) =>(
                    <section>
                        {recipeObj.sectionContent.map((section) => (
                            <RecipeObjectHandler recipeObject={section} id={id}/>
                        ))} 
                    </section>
                ))}
            </article>
        </>
    );
};

const RecipeObjectHandler = ({ recipeObject, id }) => {
    if (recipeObject.type === "text") {return await textHandler(recipeObject.content) }
    if (recipeObject.type === "header") {return await headerHandler(recipeObject.content) }
    if (recipeObject.type === "subheader") {return await subHeaderHandler(recipeObject.content) }
    if (recipeObject.type === "list") {return await listHandler(recipeObject.content) }
    if (recipeObject.type === "image") {return await imageHandler(recipeObject.content, id) }
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
    return(
        <>
            <IfNullTitle title={content.title}/>
            <ul>
                {content.content.map((bullet) => (
                    <li>{bullet}</li>
                ))}
            </ul>
        </>
    )
}

const IfNullTitle = ({ title }) => {
    if (title == "null") {return}
    return (<p>{title}</p>)
}

async function webmHandler(content) {

}

async function imageHandler(content, id) {
    return (
    <div>
        <Image
            src={"/" + id + "/raw/main" + content.content}
            alt={content.alt}
            layout='fill'
        />
    </div>
    )
}

const Tags = ({ tagsContent }) => {
    return (
        <Head><title>{tagsContent}</title></Head>
    )
}

module.exports = recipeHandler;