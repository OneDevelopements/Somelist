import Axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Cookie from 'js-cookie'
import { TailSpin } from "react-loader-spinner"
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery'
const BotLayout = (props) => {
    const router = useRouter()
    const [reload, edewfwedfqef] = useState(0)
    const [botdata, setbotdata] = useState({})
    const [bot, setbot] = useState(<>
        
    </>)
    const [page, setpage] = useState(<>
        <div className='flex h-screen w-full items-center justify-center'>
            <TailSpin
            color={'var(--700)'}
            />
        </div>
    </>)
    useEffect(()=>{
        async function getbot(){
            console.log(props.id)
            await Axios.get('https://api.somelist.tk/bot?user='+props.id+'&requester='+Cookie.get('id')).then((res)=>{
                if (res.data.result == 'none'){
                    return setpage(
                        <>
                        <div className='h-screen flex items-center justify-center'>
                            <div className='text-center'>
                                <h1 className='text-5xl italic text-sky-500 font-bold'>Oops!</h1>
                                 <br/>
                                 <p className='text-lg text-slate-300/90' >This bot might not exist, or you don't have the permissions to edit it.</p>
                             </div>
                        </div>
                        </>
                    )
                }
                if (res.data.result.owner != Cookie.get('id')){
                    return setpage(
                        <>
                        <div className='h-screen flex items-center justify-center'>
                            <div className='text-center'>
                                <h1 className='text-5xl italic text-sky-500 font-bold'>Oops!</h1>
                                 <br/>
                                 <p className='text-lg text-slate-300/90' >This bot might not exist, or you don't have the permissions to edit it.</p>
                             </div>
                        </div>
                        </>
                    )
                }
                console.log(res.data.result.name)
                $('#shortdesc').val(res.data.result.shortdesc)
                setbot(
                <>
                <SideNav setpageA={()=>{
                    setpage(
                        <div className='flex h-screen w-full items-center justify-center'>
                        <div className='text-center'>
                        <h1 className='text-sky-500 font-semibold text-5xl' >Oops!</h1>
                        <br/>
                        <p className='text-slate-400 text-lg'>This page is still in construction :(</p>
                        </div>
                        </div>)
                }} setpageB={()=>{
                    setpage(<Edit botdata={res.data.result}/>)
                }}avatar={res.data.result.avatar} name={res.data.result.name}/>
                </>)
                setbotdata(res.data.result)
                console.log(res.data.result)
                if (router.pathname == '/bot/[id]/edit'){
                    setpage(<Edit botdata={res.data.result} />)
            } else if(router.pathname == '/bot/[id]/analytics'){
                setpage(
                    <div className='flex h-screen w-full items-center justify-center'>
                    <div className='text-center'>
                    <h1 className='text-sky-500 font-semibold text-5xl' >Oops!</h1>
                    <br/>
                    <p className='text-slate-400 text-lg'>This page is still in construction :(</p>
                    </div>
                    </div>)
            }
            })
        }
        getbot()
    }, [])
    return(
        <div class="flex">
        {props.children}
        <div className='w-64 lg:p-10 py-[8rem] lg:py-[10rem] rounded-lg min-h-screen'>
            {bot}
        </div>
        {page}
        <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        </div>

    )
}

const SideNav = (props) =>{
    const router = useRouter()
    return(
        <div className='w-64 backdrop-blur-xl rounded-lg py-10 px-5'>
            <div className='flex items-center mb-10'>
                <img src={props.avatar} className='rounded-lg w-16 h-16 mr-3'/>
                <h1 className={'text-3xl'}>{props.name}</h1>
            </div>
            <div>
                <button onClick={()=>{
                    router.push('/bot/'+router.query.id+'/analytics')
                    props.setpageA()
                }} style={{textAlign: 'left'}} className={router.pathname == '/bot/[id]/analytics' ? ' bg-sky-400/70' + ` w-full px-3 py-2 rounded-lg ` : ' hover:bg-sky-400/20' + ` w-full px-3 py-2 rounded-lg`}>Analytics</button>
                <div className='my-2'/>
                <button onClick={()=>{
                    props.setpageB()
                    router.push('/bot/'+router.query.id+'/edit')
                }} style={{textAlign: 'left'}} className={router.pathname == '/bot/[id]/edit' ? ' bg-sky-400/70' + ` w-full px-3 py-2 rounded-lg ` : ' hover:bg-sky-400/20' + ` w-full px-3 py-2 rounded-lg`}>Edit</button>

            </div>
        </div>
    )
}
const Edit = (props) =>{
    const [loading, setloading] = useState()
    return(
    <form method='POST' className='ml-20 lg:p-10 py-[8rem] lg:py-[10rem] h-screen w-full'>

    <button
        style={{'zIndex': '100', 'float': 'right', 'bottom': '20px', 'right': '20px'}}
        className="fixed opacity-100 h-14 bg-gradient-to-br from-sky-600 to-sky-800 py-4 px-6 flex items-center rounded-lg text-white shadow-sm shadow-sky-600/20"
        disabled={loading}
        onClick={() => {
            setloading(true)
            var data = $('form').serializeArray(); 
            data.push({name: "owner", value: Cookie.get('id')});
            $.ajax({
                url: 'https://api.somelist.tk/editbot?id='+props.botdata.id,
                type: 'POST',
                data: $.param(data),
            }).then((res)=>{
                if (res.reply == 'worked'){
                    setloading(false)
                } else {
                    setloading(true)
                    toast.error('An unexpected error occured :C', {
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                    });
                }
            }).catch(()=>{
                setLoading(false)
                toast.error('An unexpected error occured :C', {
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                });
            })
        }} 
        type='button'
    >
        {loading ? (
            <TailSpin color="#fff" height={'25'} width={'25'} />
        ) : (
        <><i className="mr-2 fas fa-save"></i><p className="font-semibold">Save</p></>
        )}
    </button>
    <div>
    <div className='my-20'>
        <p className='text-xl mb-3'>Prefix</p>
        <input defaultValue={props.botdata.prefix} style={{zIndex: '0'}} name='prefix' id='prefix' required className="w-full backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-[#0B0A15]/70 outline-zinc-700" type='text'/>
    </div>
    <div className='my-20'>
        <p className='text-xl mb-3'>Invite</p>
        <input defaultValue={props.botdata.invite} style={{zIndex: '0'}} name='invite' id='invite' className="w-full backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-[#0B0A15]/70 outline-zinc-700" type='text'/>
    </div>
    <div className='my-20'>
        <p className='text-xl mb-3'>Short Description</p>
        <input defaultValue={props.botdata.shortdesc} style={{zIndex: '0'}} name='shortdesc' id='shortdesc' required className="w-full backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-[#0B0A15]/70 outline-zinc-700" type='text'/>
    </div>
    <div className='my-20'>
        <p className='text-xl mb-3'>Long Description</p>
        <textarea style={{zIndex: '0'}} name='longdesc' id='longdesc' defaultValue={props.botdata.longdesc} required className="w-full h-44 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-[#0B0A15]/70 outline-zinc-700"></textarea>
    </div>
    <div className='my-20'>
        <p className='text-xl mb-3'>Website</p>
        <input defaultValue={props.botdata.website} style={{zIndex: '0'}} name='website' id='website' className="w-full backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-[#0B0A15]/70 outline-zinc-700" type='text'/>
    </div>
    <div className='my-20'>
        <p className='text-xl mb-3'>Github</p>
        <input defaultValue={props.botdata.github} style={{zIndex: '0'}} name='github' id='github' className="w-full backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-[#0B0A15]/70 outline-zinc-700" type='text'/>
    </div>
    <div className='py-20' />
    </div>
    </form>
    )
}


export default BotLayout