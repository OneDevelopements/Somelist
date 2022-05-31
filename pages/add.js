import { useEffect, useState } from "react";
import Template from "../public/secure-template";
import $ from 'jquery'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from 'js-cookie'
import { useRouter } from "next/router";
import HeaderB from "../components/Navbar";
import Select from 'react-select'
export default function Add({isLoggedIn}){
    const router = useRouter()
    const [step, setstep] = useState('')
    const [loading, setloading] = useState(false)
    const [stagecount, setstagecount] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState([])
    const customStyles = {
        control: (base, state) => ({
          ...base,
          background: "rgb(24 24 27 / 0.5)",
          borderColor: state.isFocused ? "#0ea5e9" : "#3f3f46",
          boxShadow: state.isFocused ? null : null,
          color: 'white',
          width: '100%',
          padding:'10px',
          borderRadius: '0.5rem',
          '&:hover':{
              borderColor: '#3f3f46'
          }
        }),
        menu: base => ({
          ...base,
          // override border radius to match the box
          borderRadius: 0,
          // kill the gap
          marginTop: 0,
          background: "#1e293b",
          opacity: 1,
        }),
        menuList: base => ({
          ...base,
          // kill the white space on first and last option
          padding: 0
        }),
        multiValue: base => ({
            ...base,
            color: '#fff',
            background: '#1e293b',
            border: `1px solid #1e293b`,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: '#0ea5e9',
            },
            borderRadius: '5px',
          }),
        multiValueLabel: base => ({
            ...base,
            color: '#fff',
        }),
        input: base => ({
            ...base,
            color: '#fff'
        }),
        option: (base) =>({
            ...base,
            '&:hover' :{
                background: '#334155',
                color: '#fff'
            }        
        })
      };

      const options = [
        {
          label: "Moderation",
          value: 1
        },
        {
          label: "Fun",
          value: 2
        },
        {
          label: "Minecraft",
          value: 3
        },
        {
          label: "Economy",
          value: 4
        },
        {
          label: "Guard",
          value: 5
        },
        {
            label: "NSFW",
            value: 6
        },
        {
            label: "Anime",
            value: 7
        },

        {
            label: "Music",
            value: 6
        },
        {
            label: 'Utility',
            value: 7
        }
      ];
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
                url: 'https://api.somelist.tk/find?token='+Cookie.get('token'),
                type: 'POST',
                data: {'id': botid.value}
            }).then((res)=>{
                if (res.result == 'TOKEN_INVALID'){
                    setloading(false)
                    setstagecount(1)
                    return window.location.href='https://api.somelist.tk/login'
                }
                if (res.result == 'INVALID'){
                    setloading(false)
                    setstagecount(1)
                    return toast.warning('Unknown application!', {
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                    });
                } else if (res.result == 'EXISTS'){
                    setloading(false)
                    setstagecount(1)
                    return toast.warning('Bot already added :(', {
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
                toast.error('An unexpected error occured :C', {
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
                let valid = true;
                $('[required]').each(function() {
                  if ($(this).is(':invalid') || !$(this).val()) valid = false;
                })
                if (!valid){
                    setstagecount(3)
                    toast.warning('Fill in all required fields!', {
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                    });
                } else {
                    if($("#shortdesc").val().length <= 15){
                        setstagecount(3)
                        toast.warning('Your Short Description should have more than 15 characters!', {
                            autoClose: 3000,
                            closeOnClick: true,
                            draggable: true,
                        });
                    } else if($("#longdesc").val().length <= 100){
                        setstagecount(3)
                        toast.warning('Your Long Description should have more than 100 characters!', {
                            autoClose: 3000,
                            closeOnClick: true,
                            draggable: true,
                        });
                    } else if($('#invite').val() != ''){
                        setstagecount(3)
                        if($('#invite').val().startsWith('https://discord.com/api/oauth2/authorize')){

                        } else{
                            toast.warning('Invite URL should start with https://discord.com/api/oauth2/authorize!', {
                                autoClose: 3000,
                                closeOnClick: true,
                                draggable: true,
                            });
                        }
                    } else if (selectedOptions.length > 5){
                            setstagecount(3)
                            toast.warning('You must choose at least 1 tag.', {
                                autoClose: 3000,
                                closeOnClick: true,
                                draggable: true,
                            });
                    } else if (selectedOptions.length <= 0){
                            setstagecount(3)
                            toast.warning('You must choose at least 1 tag.', {
                                autoClose: 3000,
                                closeOnClick: true,
                                draggable: true,
                    });
                    } else {  
                        setstep(
                            <>
                                <p className="text-lg font-semibold">Step 3</p>
                                <p className="mt-1 text-lg text-zinc-400 ml-2">Your bot's connections.</p>
                            </>
                        )
                        setstagecount(5)
                    }
                }
        }
    }, [stagecount])
    const submitbot = () =>{
        var data = $('form').serializeArray(); 
        data.push({name: "owner", value: Cookie.get('id')});
        var soptions = []
        selectedOptions.map((option)=>{
            soptions.push(option.label)
        })
        data.push({name: 'tags', value: soptions})
        console.log(data)
        $.ajax({
            url: 'https://api.somelist.tk/submitbot?token='+Cookie.get('token'),
            type: 'POST',
            data: $.param(data),
        }).then((res)=>{
            if (res.reply == 'worked'){
                router.push('/bot/'+res.id)
            } else {
                toast.error('An unexpected error occured :C', {
                    autoClose: 3000,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        }).catch(()=>{
            toast.error('An unexpected error occured :C', {
                autoClose: 3000,
                closeOnClick: true,
                draggable: true,
            });
        })
    }
    return(
        <>
        <HeaderB isLoggedIn={isLoggedIn}/>
        <form method='POST' onSubmit={(e) => {
            submitbot(e)
        }}>
        <div style={{position: 'fixed', bottom: '0', zIndex: '99'}} className="px-10 flex backdrop-blur-md bg-[#E3E5E8] dark:bg-[#080712] bg-opacity-50 w-screen p-4">
        <div className="" style={{marginLeft: '-15px'}}>
          <button
            className={`opacity-100 h-14 bg-gradient-to-br from-gray-800 to-gray-800 py-4 px-6 flex items-center rounded-lg text-white shadow-sm shadow-sky-slate/20`}
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
            className="opacity-100 h-14 bg-gradient-to-br from-sky-600 to-sky-800 py-4 px-6 flex items-center rounded-lg text-white shadow-sm shadow-sky-600/20"
            onClick={() => {stagecount == 5 ? submitbot() : nextstage()}} 
            disabled={loading}
            type='button'
          >
             <p className="font-semibold">Next</p> <i className="ml-1 fas fa-arrow-right"></i>
          </button>
        </div>
        </div>
        <div class="p-5 lg:p-10 py-[8rem] lg:py-[10rem] rounded-lg min-h-screen">
        <h1 className='font-bold text-4xl text-sky-500'>Bot Submission</h1>
            <div className={stagecount > 2 && 'hidden'} >
                <div className='lg:flex my-32 items-center'>
                    <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Bot id</p>
                        <p className="mt-1 text-sm text-zinc-400">Your bot's client id. You can get this from the Discord Developer Portal.</p>
                    </div>
                    <input name='id' id='id' required placeholder="0000000000000" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                </div>
            </div>
            <div className={stagecount != 3 && 'hidden'}>
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Prefix</p>
                        <p className="mt-1 text-sm text-zinc-400">What prefix your bot responds to. For example, if your using Slash Commands, place it as '/', or add your own custom prefix.</p>
                        </div>
                        <input name='prefix' required placeholder="/" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                    </div>
        
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Invite Link (Optional)</p>
                        <p className="mt-1 text-sm text-zinc-400">Need a special scope? Set your link here!</p>
                        </div>
                        <input name='invite' id='invite' placeholder="/" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                    </div>
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Short description</p>
                        <p className="mt-1 text-sm text-zinc-400">Give your bot a short and meaningful summary. This will appear on your bot's card and your bot's page!</p>
                        </div>
                        <input name='shortdesc' id='shortdesc' required placeholder="The best and most wonderful bot ever!" className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                    </div>
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Tags</p>
                        <p className="mt-1 text-sm text-zinc-400">Allow people to find your bot through tags!</p>
                        </div>
                        <Select value={selectedOptions} styles={customStyles} options={options} isMulti closeMenuOnSelect={false} className='w-full' onChange={(e)=> {
                            console.log(e)
                            setSelectedOptions(e)
                        }}/>                    
                    </div>
                    <div className='lg:flex my-32 items-center'>
                        <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Long description</p>
                        <p className="mt-1 text-sm text-zinc-400">Tell us more about your bot. Give us its features, history, or even something about you. HTML and Markdown is supported.</p>
                        </div>
                        <textarea name='longdesc' id='longdesc' required resize className="h-44 w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'></textarea>
                    </div>
            </div>
            <div className={stagecount != 5 && 'hidden'}>
                <div className='lg:flex my-32 items-center'>
                    <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                    <p className="text-lg font-semibold">Website (optional)</p>
                    <p className="mt-1 text-sm text-zinc-400">Have a website? Rep it off!</p>
                    </div>
                    <input name='website' placeholder={'https://somelist.tk'} className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                </div>

                <div className='lg:flex my-32 items-center'>
                    <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Support Server (optional)</p>
                        <p className="mt-1 text-sm text-zinc-400">Have a server for users that need help? Direct users your way!</p>
                    </div>
                    <input name='support' placeholder={'https://discord.gg/AKHZHyGwMX'} className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                </div>
                <div className='lg:flex my-32 items-center'>
                    <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Github (optional)</p>
                        <p className="mt-1 text-sm text-zinc-400">Open sourced? Share your repo here!</p>
                    </div>
                    <input name='github' placeholder={'https://github.com/popqa17/somelist'} className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                </div>
                <div className='lg:flex my-32 items-center'>
                    <div className="mr-6 mb-3 w-full lg:w-60 lg:mb-0">
                        <p className="text-lg font-semibold">Banner (optional)</p>
                        <p className="mt-1 text-sm text-zinc-400">Got a cool image to show off? Banner you go!</p>
                    </div>
                    <input name='banner' placeholder={'https://github.com/popqa17/somelist'} className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700" type='text'/>
                </div>
            </div>
        </div>
        </form>
    </>
    )
}

export async function getServerSideProps(context) {
    if (!context.req.cookies.token){
        return {
            redirect: {
              permanent: false,
              destination: "https://api.somelist.tk/login",
            },
        }
    }
    
    return {
        props: {
            isLoggedIn: context.req.cookies.token ? true : false
        }
    }
  } 