import React from 'react'
import { exchangeToken, saveTokens, saveUser } from "../public/oauth";
import Router from 'next/router'
import PropTypes from "prop-types";
export default class extends React.Component {
    static getInitialProps({query}) {
        return {
            code: query.code
        };
    }

    static propTypes = {
        isLoggedIn: PropTypes.bool
    };

    async componentDidMount () {
        console.log(process.env)
        if (this.props.code === undefined)  await Router.push('/'); stop();
        const data = await exchangeToken(`${this.props.code}`);
        if(data !== 400){
            await saveTokens(data.access_token, data.refresh_token);
        }
        await saveUser(data.access_token)
        await Router.push('/guilds');
    }
    render(){
        return <>
        <div className='flex items-center h-screen '>
            <div className='w-screen text-center'>
            <p className='text-6xl font-bold italic'>Please wait</p>
            <p className='mt-6 text-lg font-semi-bold text-black/70 dark:text-white/70'>Do not leave this page. We're saving your tokens.</p>
            </div>
        </div>
        </>;
    }
};