import React from 'react'
import NavBar from './Nav';
import Head from 'next/head'
const Layout = ({ children }) => {
    return (
        <>
        <NavBar className="z-50"/>
            <div className='flex justify-between grid-cols-3 mt-3 md:mt-20'>
                <div className='z-0 w-1/12'>

                </div>
                <div className='z-0 grow drop-shadow-lg h-fit'>
                    <Head>
                        <meta property="og:title" name='robots' content='index, follow' key="title"/>
                        <meta property="og:title" name="viewport" content="width=device-width, initial-scale=1.0" key="title" />
                        <meta property="og:title" charSet="UTF-8" key="title"/>
                    </Head>
                    <main className='z-0'>
                        {children}
                    </main>
                
                </div>
                <div className='z-0 w-1/12'>
                    
                </div>
                
            </div>
        </>
    );
};

export default Layout;