import Cookie from 'js-cookie'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function callback(){
    const router = useRouter()
    useEffect(()=>{
        Cookie.set('username', router.query.username)
        Cookie.set('id', router.query.id)
        Cookie.set('token', 'token')
        Cookie.set('refreshToken', 'reftoken')
        router.push('/')
    }, [])
    return <>
    <div className='flex items-center h-screen '>
        <div className='w-screen text-center'>
        <p className='text-6xl font-bold italic'>Please wait</p>
        <p className='mt-6 text-lg font-semi-bold text-black/70 dark:text-white/70'>Do not leave this page. We're saving your tokens.</p>
        </div>
    </div>
    </>;
}