import React from 'react'
import NavBar from './Nav';
import Head from 'next/head'
const Layout = ({ children }) => {
    return (
        <>
        <NavBar/>
            <div className='flex justify-between grid-cols-3 mt-3 md:mt-20'>
                <div className='w-1/12'>

                </div>
                <div className='grow drop-shadow-lg h-fit'>
                    <Head>
                        <meta property="og:title" name='robots' content='index, follow' key="title"/>
                        <meta property="og:title" name="viewport" content="width=device-width, initial-scale=1.0" key="title" />
                        <meta property="og:title" charset="UTF-8" key="title"/>
                    </Head>
                    <main>
                        {children}
                    </main>
                
                </div>
                <div className='w-1/12'>
                    
                </div>
                
            </div>
        </>
    );
};

export default Layout;