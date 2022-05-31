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
                        <meta name='robots' content='index, follow'/>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta charset="UTF-8" />
                    </Head>
                {children}
                </div>
                <div className='w-1/12'>
                    
                </div>
                
            </div>
        </>
    );
};

export default Layout;