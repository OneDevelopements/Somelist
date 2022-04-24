import Cookie from 'js-cookie';
import Router from 'next/router';
import React from 'react';
import Header from '../components/Navbar';
import { getTokensForServer, getTokensForBrowser } from "./oauth";

export default Page => class Template extends React.Component {
    static async getInitialProps({req}) {
        console.log('hi')
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
            Cookie.add('redirect', Router.pathname)
            window.location.href='https://api.somelist.tk/login'
            return (
                <>
                    <div id='gradient'></div>
                    <Header { ...this.props } />
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