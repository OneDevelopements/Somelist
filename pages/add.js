import { useEffect, useState } from "react";
import Template from "../public/template";
import $ from 'jquery'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from 'js-cookie'
import { useRouter } from "next/router";

export default Template(function Add(){
    const router = useRouter()
    const [step, setstep] = useState('')
    const [loading, setloading] = useState(false)
    const [stagecount, setstagecount] = useState(1)
    useEffect(()=>{
        setstep(
            <>
                <p className="text-lg font-semibold">Step 1</p>
                <p className="mt-1 text-lg text-zinc-400 ml-2">Finding your bot.</p>
            </>
        )
    }, [])
    const nextstage = () =>{
        if (stagecount == 1){
            return setstagecount(stagecount+1)
        }
        setstagecount(stagecount+2)
    }

    const prevstage = () =>{
        setstagecount(stagecount-2)
    }
    useEffect(()=>{
        console.log(stagecount)
        window.location.href = '#'
        if (stagecount == 1){
            setstep(
                <>
                    <p className="text-lg font-semibold">Step 1</p>
                    <p className="mt-1 text-lg text-zinc-400 ml-2">Finding your bot.</p>
                </>
            )
        }
        if (stagecount == 2){
            setloading(true)
            var botid = document.getElementById('id')
            $.ajax({
                url: 'https://api.somelist.tk/find',
                type: 'POST',
                data: {'id': botid.value}
            }).then((res)=>{
                if (res.result == 'INVALID'){
                    setloading(false)
                    setstagecount(1)
                    return toast.warning('Unknown application', {
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                    });
                } else if (res.result == 'EXISTS'){
                    setloading(false)
                    setstagecount(1)
                    return toast.warning('Bot already added', {
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                    });
                } else {
                    setloading(false)
                    setstagecount(3)
        }
            }).catch(()=>{
                setloading(false)
                setstagecount(1)
                toast.error('An unexpected error occured', {
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                });
            })
        }
        if (stagecount == 3){
                   
                    setstep(
                        <>
                            <p className="text-lg font-semibold">Step 2</p>
                            <p className="mt-1 text-lg text-zinc-400 ml-2">Your bot's overview.</p>
                        </>
                    )
                } 
        

        if (stagecount == 5){
            setstep(
                <>
                    <p className="text-lg font-semibold">Step 3</p>
                    <p className="mt-1 text-lg text-zinc-400 ml-2">Your bot's connections.</p>
                </>
            )
        }
    }, [stagecount])
    const submitbot = (e) =>{
        e.preventDefault()
        var data = $('form').serializeArray(); 
        data.push({name: "owner", value: Cookie.get('id')});
        $.ajax({
            url: 'https://api.somelist.tk/submitbot',
            type: 'POST',
            data: $.param(data),
        }).then((res)=>{
            if (res.reply == 'worked'){
                router.push('/bot/'+res.id)
            } else {
                toast.error('An unexpected error occured', {
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        }).catch(()=>{
            toast.error('An unexpected error occured', {
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
            });
        })
    }
    return(
        <>
        <form method='POST' onSubmit={(e) => {
            submitbot(e)
        }}>
        <div style={{position: 'fixed', bottom: '0', zIndex: '99'}} className="hidden px-10 lg:flex backdrop-blur-md bg-[#E3E5E8] dark:bg-[#080712] bg-opacity-50 w-screen p-4">
        <div className="" style={{marginLeft: '-15px'}}>
          <button
            className={`opacity-100 h-14 bg-gradient-to-br from-gray-800 to-gray-800 py-4 px-6 flex items-center rounded-lg text-white shadow-sm shadow-violet-slate/20`}
            onClick = {() => stagecount != 1 && prevstage()}
            disabled={stagecount <= 2 && true}
            type='button'
          >
            <i className="fas fa-arrow-left"></i> <p className="font-semibold ml-1" >Previous</p>
          </button>
        </div>
        <div className="flex w-full justify-center text-center items-center">
        {step}
        </div>

        <div>
          <button
            className="opacity-100 h-14 bg-gradient-to-br from-violet-600 to-violet-800 py-4 px-6 flex items-center rounded-lg text-white shadow-sm shadow-violet-600/20"
            onClick={() => {stagecount != 5 && nextstage()}} 
            disabled={loading}
            type={stagecount == 5 ? 'submit' : 'button'}
          >
             <p className="font-semibold">Next</p> <i className="ml-1 fas fa-arrow-right"></i>
          </button>
        </div>
        </div>
        <div class="p-5 lg:p-10 py-[3rem] lg:py-[5rem] rounded-lg min-h-screen">
        <h1 className='font-bold text-4xl text-violet-500'>Bot Submission</h1>
            <div className={stagecount > 2 && 'hidden'} >
                <div className='lg:flex my-32 items-center'>
                    <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Bot id</p>
                        <p className="mt-1 text-sm text-zinc-400">Your bot's client id. You can get this from the Discord Developer Portal.</p>
                    </div>
                    <input name='id' id='id' required placeholder="0000000000000" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                </div>
            </div>
            <div className={stagecount != 3 && 'hidden'}>
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Prefix</p>
                        <p className="mt-1 text-sm text-zinc-400">What prefix your bot responds to. For example, if your using Slash Commands, place it as '/', or add your own custom prefix.</p>
                        </div>
                        <input name='prefix' required placeholder="/" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                    </div>
        
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Invite Link (Optional)</p>
                        <p className="mt-1 text-sm text-zinc-400">Custom invite link for your bot.</p>
                        </div>
                        <input name='invite' placeholder="https://discord.com/api/authorize" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                    </div>
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Tags (select at most 5)</p>
                        <p className="mt-1 text-sm text-zinc-400">Which tag best describes your bot?</p>
                        </div>
                        <input name='tags' required placeholder="/" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                    </div>
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Short description</p>
                        <p className="mt-1 text-sm text-zinc-400">Give your bot a short and meaningful summary. This will appear on your bot's card and your bot's page!</p>
                        </div>
                        <input name='shortdesc' required placeholder="The best and most wonderful bot ever!" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                    </div>
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Long description</p>
                        <p className="mt-1 text-sm text-zinc-400">Tell us more about your bot. Give us its features, history, or even something about you. HTML and Markdown is supported.</p>
                        </div>
                        <textarea name='longdesc' required resize className="h-44 w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'></textarea>
                    </div>
            </div>
            <div className={stagecount != 5 && 'hidden'}>
                <div className='lg:flex my-32 items-center'>
                    <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                    <p className="text-lg font-semibold">Website (optional)</p>
                    <p className="mt-1 text-sm text-zinc-400">Have a website? Rep it off!</p>
                    </div>
                    <input name='website' placeholder={'https://somelist.tk'} className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                </div>
                <div className='lg:flex my-32 items-center'>
                    <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Github (optional)</p>
                        <p className="mt-1 text-sm text-zinc-400">Open sourced? Share your repo here!</p>
                    </div>
                    <input name='github' placeholder={'https://github.com/popqa17/somelist'} className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                </div>
                <div className='lg:flex my-32 items-center'>
                    <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Banner (optional)</p>
                        <p className="mt-1 text-sm text-zinc-400">Got a cool image to show off? Banner you go!</p>
                    </div>
                    <input name='banner' placeholder={'https://github.com/popqa17/somelist'} className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-violet-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                </div>
            </div>
        </div>
        </form>
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
    </>
    )
})