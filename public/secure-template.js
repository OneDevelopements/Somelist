import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import React from 'react';
import Header from '../components/Navbar';
import { getTokensForServer, getTokensForBrowser } from "./oauth";

export default Page => class Template extends React.Component {
    static async getInitialProps({req}) {
        let loggedInUser = process.browser ? await getTokensForBrowser() : await getTokensForServer(req);
        if(loggedInUser === undefined || loggedInUser.token === undefined) loggedInUser = false;
        const pageProperties = Page.getInitialProps && await Page.getInitialProps(req);
        
        return {
            ...pageProperties,
            loggedInUser,
            isLoggedIn: !!loggedInUser
        };
    }

    render() {
        if (!this.props.isLoggedIn) {
            return (
                <>
                    <div id='gradient'></div>
                    <Header { ...this.props } />
                    <Testhingyabc/>
                </>
            )
        }
        return(
            <>
                <div id='gradient'></div>
                <Header>{ this.props }</Header>
                    <Page>{ this.props }</Page>
            </>
        )
    }
}

const Testhingyabc = ()=>{
    const router = useRouter()
    Cookie.set('redirect', router.pathname)
    window.location.href='https://api.somelist.tk/login'
    return(<div>
    
    </div>)
}