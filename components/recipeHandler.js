import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
const culinaryConfig = require('./../culinaryConfig');
function recipeHandler(recipeData, id) {
    

    return (
        <>
            <Tags tagsContent={ recipeData.tags }/>
            <article>
                {recipeData.sections.map((recipeObj, index) =>(
                    <section key={index}>
                        {recipeObj.sectionContent.map((section, index) => (
                            <RecipeObjectHandler recipeObject={section} id={id} key={index}/>
                        ))} 
                    </section>
                ))}
            </article>
        </>
    );
};

const RecipeObjectHandler = ({ recipeObject, id }) => {
    if (recipeObject.type === "text") {return textHandler(recipeObject.content) }
    if (recipeObject.type === "header") {return headerHandler(recipeObject.content) }
    if (recipeObject.type === "subheader") {return subHeaderHandler(recipeObject.content) }
    if (recipeObject.type === "list") {return listHandler(recipeObject) }
    if (recipeObject.type === "image") {return imageHandler(recipeObject, id) }
    if (recipeObject.type === "webm") {return webmHandler(recipeObject.content) }
    return (<></>)
}

function headerHandler(content) {
    return(<h1>{content}</h1>)
}

function textHandler(content) {
    return(<p>{content}</p>)
}

function subHeaderHandler(content) {
    return(<h2>{content}</h2>)
}

function listHandler(content) {
    return(
        <>
            <IfNullTitle title={content.title}/>
            <ul>
                {content.content.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                ))}
            </ul>
        </>
    )
}

const IfNullTitle = ({ title }) => {
    if (title == "null") {return}
    return (<p>{title}</p>)
}

function webmHandler(content) {

}

function imageHandler(content, id) {
    
    const url = "https://github.com/" + culinaryConfig.userName + "/" + id + "/raw/main" + content.content
    return (
    <div className='relative'>
        <Image
            src={url}
            alt={content.alt}
            width={content.width}
            height={content.height}
            layout='responsive'
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