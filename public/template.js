import { Transition } from '@headlessui/react';
import React from 'react';
import HeaderB from '../components/Navbar';
import { getTokensForServer, getTokensForBrowser } from "./oauth";



export default Page => class Template extends React.Component {
    render() {
        return(
            <>
                <HeaderB/>
                <div
                className='pagetransition'
                >
                    <Page>{ this.props }</Page>
                </div>
            </>
        )
    }
}