import React from 'react'
import { exchangeToken, saveTokens, saveUser } from "../public/oauth";
import Router from 'next/router'
import PropTypes from "prop-types";
import  Cookie  from 'js-cookie';
import $ from 'jquery'
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
        $.ajax({
            url: 'https://api.somelist.tk/authorize?code='+Router.query.code,

        }).then(async (res)=>{
            if (res.result == 'NOT_FOUND'){
                console.log('not-found')
                window.location.href= 'https://api.somelist.tk/login'
            } else if (res.result == 'TIMEOUT'){
                window.location.href = 'https://api.somelist.tk/login'
            } else {
                console.log(res.result.id)
                Cookie.set('username', res.result.name)
                Cookie.set('id', res.result.id)
                Cookie.set('avatar', res.result.avatar)
                Cookie.set('token', res.result.token)
                Cookie.set('refreshToken', 'h2')
                if (Cookie.get('redirect')){
                    const redirect = Cookie.get('redirect')
                    Cookie.remove('redirect')
                    return await Router.push(redirect)
                } else {
                    await Router.push('/');
                }
            }
        })
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