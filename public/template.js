import { Transition } from '@headlessui/react';
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
        return(
            <>
                <div id='gradient'></div>
                <Header>{ this.props }</Header>
                <div
                className='pagetransition'
                >
                    <Page>{ this.props }</Page>
                </div>
            </>
        )
    }
}