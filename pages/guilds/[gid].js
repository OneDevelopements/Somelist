import axios from "axios";
import {Skeleton} from 'primereact/skeleton'
import {ToggleButton} from 'primereact/togglebutton'
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import secureTemplate from "../../public/secure-template";
import { Card } from "primereact/card";

export default secureTemplate(function dashboard(){
    const router = useRouter()
    if (!router.query.gid) {
        return null;
      }
    const [page, setpage] = useState('')
    const [guild, setguild] = useState('')
    const [section, setsection] = useState('')
    const [data, setdata] = useState('')
    const [blocked, block] = useState(true)
    useEffect(()=>{
        setsection('loading')
        async function fetch(){
            console.log(router.query.gid)
            await axios.get(`https://discord.com/api/users/@me/guilds`, {headers: {"Authorization": `Bot ${process.env.NEXT_PUBLIC_TOKEN}`}}).then((res)=>{
                res.data.map(async (guild)=>{
                    if(guild.id.toString() == router.query.gid){
                        setguild(guild)
                        await axios.get(`https://api.ava-bot.tk/guild/${router.query.gid}`).then((res)=>{
                            setdata(res.data)
                            console.log(res.data)
                            if (res.data.modules.includes('welcome')){
                                
                            }
                            block(false)
                            setsection('')
                            return
                        })
                    }
                })
                
            })
        }  
        fetch()
    }, [])
    useEffect(()=>{
        if(!section){
            setpage(<div>
                <h1>Dashboard</h1>
                <div>
                    <h2>Modules</h2>
                    <Card title="Welcome" subTitle="Subtitle" style={{ width: '25em' }} footer={
                        <span>
                            <Button label="Configure" className="p-button-secondary p-button-sm" icon="pi pi-cog" />
                        </span>
                    } header={''}>
                    </Card>
                </div>
            </div>)
        } else if (section == 'settings'){
            setpage(<div>
                Settings
            </div>)
        } else if (section == 'loading'){
            setpage(<>
                <div className="h-screen w-full flex justify-content-center align-items-center">
                    <ProgressSpinner/>
                </div>
            </>)
        } else {
            setpage(<h1>Oops.. this page couldn't be found.</h1>)
        }
    }, [section])
    return(
        <div className="flex">
            <div className="flex h-screen mr-5 flex-column surface-50 pt-2 pl-1 pr-2" style={{width: '230px', minWidth: '230px'}}>
            <div>
                <h1>{!guild ? (<Skeleton width="100%" height="32pt" />) : (guild.name)}</h1>
            </div>
                <Link href={'/guilds/'+router.query.gid}>
                    <Button disabled={blocked && true} onClick={()=>{setsection('')}} className={section ? ('mt-3 p-button-secondary p-button-text') : ('mt-3')}>Home</Button>
                </Link>
                <Link href={'/guilds/'+router.query.gid + '?page=settings'}>
                    <Button disabled={blocked && true} onClick={()=>{setsection('settings')}} className={section != 'settings' ? ('mt-3 p-button-secondary p-button-text') :('mt-3')}>Settings</Button>
                </Link>
            </div>
            {page}
        </div>
    )
})