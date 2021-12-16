import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

const Base = ({title, children}) => {
    document.title = title
    return (
        <>
            <Nav/>

            <div className="container" style={{minHeight:'82vh'}}>
                {children}
            </div>
            
            <Footer/>   
        </>
    )
}

export default Base;