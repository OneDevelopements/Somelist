import Cookie from 'js-cookie';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect, useState } from 'react';
import { getGuilds } from '../public/oauth';
import SecureTemplate from '../public/secure-template';
import {Card} from 'primereact/card'
import { Button } from 'primereact/button';
import { useRouter } from 'next/router';
const GuildHandler = () =>{
    const router = useRouter()
    const [guilds, setGuilds] = useState('')
    useEffect(()=>{
        async function wifgp(){
            setGuilds(
            <div className='flex align-items-center h-screen '>
                <div className='w-screen text-center'>
                    <ProgressSpinner />
                    <br/>
                </div>
            </div>
            )
            const data = await getGuilds(Cookie.getJSON('token'))
            setGuilds(
                <div className='flex flex-wrap'>
                {data.map((guild) => {
                return (
                <Card key={guild.id} className='ml-2  white-space-nowrap overflow-hidden text-overflow-ellipsis' style={{ width: '25em', height: '211px', marginBottom: '2em' }}>
                    <div className='flex'>
                        <img width={'120'} height='120' className='border-round' src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}/>
                        <div className='ml-3 flex align-items-center  white-space-nowrap text-overflow-ellipsis'>
                            <div>
                                <h2 className='text-overflow-ellipsis'>{guild.name}</h2>
                                <Button class='mt-auto' onClick={()=>{router.push('/guilds/'+guild.id)}}> Edit </Button>

                            </div>
                        </div>
                    </div>
                </Card>)
                })}
                </div>
            )
        }
        wifgp()
    }, [])
    return(<div>{guilds}</div>)
}
function About() {
    return (
        <div>
            <br/>
            <h1>Your guilds</h1>
            <GuildHandler/>
        </div>
    );
}

export default SecureTemplate(About)