import axios from 'axios'
import { useEffect, useState } from 'react'
import Template from '../../public/template'
import $ from 'jquery'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'
export default Template(function Admin(){
    const router = useRouter()
    const [isadmin, setisadmin] = useState(false)
    const [reload, setreload] = useState('')
    const [check, setCheck] = useState(0)
    const [bots, setbots] = useState(
    <p className={'text-2xl italic font-bold'}>Loading..</p>
    )
    const approve = (botid) =>{
        $.ajax({
            url: 'https://api.somelist.tk/admin/update/'+botid+'?type=approve'
        }).then(()=>{
            setreload('reload')
            router.push('/admin/unapproved')
        })
    }
    const deny = (botid) =>{
        setreload('reload')
        $.ajax({
            url: 'https://api.somelist.tk/admin/update/'+botid+'?type=deny'
        }).then(()=>{
            router.push('/admin/unapproved')
        })
    }
    useEffect(()=>{
        async function checkadmin(){
            await axios.get('https://api.somelist.tk/isadmin?id='+Cookie.get('id')).then((res)=>{
                if (res.data.admin){
                    setisadmin(true)
                } else {
                    router.push('/')
                }
            })
        }
        const id = setInterval(() => {
            checkadmin()
            setCheck(check + 1)
        }, 1000);
        return () => clearInterval(id);
    }, [])
    useEffect(()=>{
        async function getbots(){
            await axios.get('https://api.somelist.tk/find_bots').then((res)=>{
            if (res.data.bots == []){
                setbots(
                    <p className={'text-2xl italic font-bold'}>No data found..</p>
                )
            }
            setbots(
                <>
                <tbody>
                    {res.data.bots.map((bot)=>{
                    if (!bot.approved){
                        return(
                            <tr>
                                <td>{bot.name} #{bot.discrminator}</td>
                                <td>{bot.id}</td>
                                <td>
                                    <button  onClick={() => window.open(`/bot/${bot.id}`)} className={'mx-1 px-5 bg-gray-800/50 rounded-md hover:bg-gray-800/70 p-2 text-md'}>
                                        Bot page
                                    </button>
                                    <button onClick={() => window.open(`https://discord.com/api/oauth2/authorize?client_id=874575884135313419&permissions=8&scope=bot%20applications.commands&guild_id=869938951211843634`)} className={'mx-1 px-5 bg-gray-800/50 rounded-md hover:bg-gray-800/70 p-2 text-md'}>
                                        Add to server
                                    </button>
                                </td>
                                <td>
                                    <button onClick={()=> approve(bot.id)} className={'mx-1 px-5 bg-green-800/50 rounded-md hover:bg-green-800/70 p-2 text-md'}>
                                        Approve
                                    </button>
                                    <button  onClick={()=> deny(bot.id)} className={'mx-1 px-5 bg-red-800/50 rounded-md hover:bg-red-800/70 p-2 text-md'}>
                                        Deny
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                })}
                </tbody>
                </>
                )
            })
        }
        getbots()
    }, [reload])
    return(
        <>
        {isadmin ?
            <div className='w-11/12 lg:w-8/12 mx-auto mt-20 lg:mt-32 p-8 backdrop-blur-xl rounded-lg bg-[#E3E5E8]/70 dark:bg-[#080712]/70'>
            <table className='text-left'>
            <thead>
                <tr>
                <th>Bot name</th>
                <th>ID</th>
                <th>Links</th>
                <th>Actions</th>
            </tr>
            </thead>
            {bots}
            </table>
            </div>
        : (
            <div className='flex items-center justify-center h-screen w-full'>
                <h1 className='italic font-bold text-4xl'>Verifying your identify...</h1>
            </div>
        )    
    }
        </>
    )
})