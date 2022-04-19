import React from 'react'
import { exchangeToken, saveTokens, saveUser } from "../public/oauth";
import Router from 'next/router'
import PropTypes from "prop-types";
import  Cookie  from 'js-cookie';
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
        Cookie.set('username', Router.query.username)
        Cookie.set('id', Router.query.id)
        Cookie.set('token', 'hi')
        Cookie.set('refreshToken', 'h2')
        await Router.push('/');
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