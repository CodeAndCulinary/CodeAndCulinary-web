import React from 'react'
import NavBar from './Nav';
import Head from 'next/head'
function recipeHandler(recipeData) {
    return (
        <p>{recipeData.toString()}</p>
    );
};

module.exports = recipeHandler;