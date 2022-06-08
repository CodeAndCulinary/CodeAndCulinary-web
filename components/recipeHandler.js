import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
const culinaryConfig = require('./../culinaryConfig');
function recipeHandler(recipeData, id, imageCache) {
    

    return (
        <>
            <Tags tagsContent={ recipeData.tags }/>
            <article className='z-0'>
                {recipeData.sections.map((recipeObj, index) =>(
                    <section key={index}>
                        {recipeObj.sectionContent.map((section, index) => (
                            <RecipeObjectHandler recipeObject={section} id={id} key={index} imageCache={imageCache}/>
                        ))} 
                    </section>
                ))}
            </article>
        </>
    );
};

const RecipeObjectHandler = ({ recipeObject, id, imageCache }) => {
    if (recipeObject.type === "text") {return textHandler(recipeObject.content) }
    if (recipeObject.type === "header") {return headerHandler(recipeObject.content) }
    if (recipeObject.type === "subheader") {return subHeaderHandler(recipeObject.content) }
    if (recipeObject.type === "list") {return listHandler(recipeObject) }
    if (recipeObject.type === "image") {return imageHandler(recipeObject, id, imageCache) }
    if (recipeObject.type === "webm") {return webmHandler(recipeObject, id) }
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

function webmHandler(content, id) {
    const url = culinaryConfig.imageURL + culinaryConfig.userName + "/" + id + "/raw/main" + content.content
    return (
    <div className='relative'>
        <Image
            src={url}
            alt={content.alt}
            width= "100%"
            height= "100%"
            layout='responsive'
            quality='2'
            />
    </div>
    )
}

function imageHandler(content, id, imageCache) {
    return (
        <div style={{ position: "relative", display: "block", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            transform: "scale(1.2)",
            filter: "blur(50px)",
            ...imageCache[content.content].css,
          }}
        />
        <Image layout='responsive' {...imageCache[content.content].img} />
      </div>
    )
}

const Tags = ({ tagsContent }) => {
    return (
        <Head><title>{tagsContent}</title></Head>
    )
}

module.exports = recipeHandler;