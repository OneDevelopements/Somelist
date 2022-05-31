import Axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Cookie from 'js-cookie'
import { ThreeDots } from "react-loader-spinner"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import $ from 'jquery'
import { Fragment } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import Select from 'react-select'
const BotLayout = (props) => {
    const router = useRouter()
    const [reload, edewfwedfqef] = useState(0)
    const [sideNavOpen, setSideNavOpen] = useState(false)
    const [botdata, setbotdata] = useState({})
    const [bot, setbot] = useState(<>
        
    </>)
    const [page, setpage] = useState(<>
        <div className='flex h-screen w-full items-center justify-center'>
            <ThreeDots
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
                }}
                setpageC={()=>{
                    setpage(<Settings botdata={res.data.result}/>)
                }}
                avatar={res.data.result.avatar} name={res.data.result.name}/>
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
            } else if(router.pathname == '/bot/[id]/settings'){
                setpage(<Settings botdata={res.data.result}/>)
            }
            })
        }
        getbot()
    }, [])
    return(
        <div className="flex">
        {props.children}
        <button
            onClick={()=>{
                if (sideNavOpen){
                    $('.sidenavbot').removeClass('sidenav-show')
                    setSideNavOpen(false)
                } else{
                    $('.sidenavbot').addClass('sidenav-show')
                    setSideNavOpen(true)
                }
            }}
            style={{
                zIndex: '99'
            }}
            className={'fixed block lg:hidden bg-sky-600 text-xl rounded-lg p-4 top-24 left-4 w-14 h-min-content'}
            >            
            {!sideNavOpen ? 
            <i className='fas fa-bars'/> 
            : 
            <i className='fas fa-times'/> 
            }
        </button>
        <div style={{
            zIndex: '98'
        }}
        className='top-0 bg-slate-900 lg:bg-transparent h-screen py-[8rem]  sidenavbot w-screen fixed lg:static lg:block lg:w-64 lg:py-[10rem] rounded-lg'>
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
        <div className='w-screen lg:w-64 backdrop-blur-xl rounded-lg py-10 px-5'>
            <div className='flex items-center mb-10 cursor-pointer' onClick={()=>{router.push('/bot/'+router.query.id)}}>
                <img src={props.avatar} className='rounded-lg w-16 h-16 mr-3'/>
                <h1 className={'text-3xl'}>{props.name}</h1>
            </div>
            <div>
                <button onClick={()=>{
                    router.push('/bot/'+router.query.id+'/analytics')
                    props.setpageA()
                }} style={{textAlign: 'left'}} className={router.pathname == '/bot/[id]/analytics' ? ' bg-sky-400/70' + ` w-full px-3 py-2 rounded-lg ` : ' hover:bg-sky-400/20' + ` w-full px-3 py-2 rounded-lg`}>Analytics
                </button>
                <div className='my-2'/>
                <button onClick={()=>{
                    props.setpageB()
                    router.push('/bot/'+router.query.id+'/edit')
                }} style={{textAlign: 'left'}} className={router.pathname == '/bot/[id]/edit' ? ' bg-sky-400/70' + ` w-full px-3 py-2 rounded-lg ` : ' hover:bg-sky-400/20' + ` w-full px-3 py-2 rounded-lg`}>Edit
                </button>
                <div className='my-2'/>
                <button onClick={()=>{
                        props.setpageC()
                        router.push('/bot/'+router.query.id+'/settings')
                    }} style={{textAlign: 'left'}} className={router.pathname == '/bot/[id]/settings' ? ' bg-sky-400/70' + ` w-full px-3 py-2 rounded-lg ` : ' hover:bg-sky-400/20' + ` w-full px-3 py-2 rounded-lg`}>Settings
                </button>
            </div>
        </div>
    )
}
const Edit = (props) =>{
    const [loading, setloading] = useState()
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
        }
      ];
    useEffect(()=>{
        var defaultselected = []
        if(props.botdata.tags){
            props.botdata.tags.map((tag)=>{
                options.map((option) =>{
                    if(option.label == tag){
                        defaultselected.push(option)
                    }
                })
            })
        }
        setSelectedOptions(defaultselected)
    }, [])
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
            var soptions = []
            selectedOptions.map((option)=>{
                soptions.push(option.label)
            })
            data.push({name: 'tags', value: soptions})
            $.ajax({
                url: 'https://api.somelist.tk/editbot?id='+props.botdata.id+'&token='+Cookie.get('token'),
                type: 'POST',
                data: $.param(data),
            }).then((res)=>{
                if (res.reply == 'TOKEN_INVALID'){
                    setloading(false)
                    toast.error('We couldn\'t verify your account. Please login again.', {
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                    });
                }
                if (res.reply == 'worked'){
                    setloading(false)
                    toast.success('Changes saved!', {
                        autoClose: 3000,
                        closeOnClick: true,
                        draggable: true,
                    });
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
            <ThreeDots color="#fff" height={'25'} width={'25'} />
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
        <p className='text-xl mb-3'>Tags</p>

        <Select value={selectedOptions} styles={customStyles} options={options} isMulti closeMenuOnSelect={false} className='w-full' onChange={(e)=> {
                console.log(e)
                setSelectedOptions(e)
        }}/>     
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

const Settings = (props) =>{
    const [loading, setloading] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    const [viewToken, setViewToken] =  useState(false)
    const router = useRouter()
    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }
    const people = [
        { name: 'Public' },
        { name: 'Link' },
        { name: 'Private' }
    ]
    const [selected, setSelected] = useState(
        props.botdata.publicity == 'public' ?people[0]
        : props.botdata.publicty == 'private' ? people[1]
        : props.botdata.publicty == 'link' ? people[2] 
        : people[0]
    )
    return(
        <div className='ml-20 lg:p-10 py-[8rem] lg:py-[10rem] h-screen w-full'>
            <form method='POST'>
            <button
                style={{'zIndex': '100', 'float': 'right', 'bottom': '20px', 'right': '20px'}}
                className="fixed opacity-100 h-14 bg-gradient-to-br from-sky-600 to-sky-800 py-4 px-6 flex items-center rounded-lg text-white shadow-sm shadow-sky-600/20"
                disabled={loading}
                onClick={() => {
                    setloading(true)
                    var data = $('form').serializeArray(); 
                    data.push({name: "owner", value: Cookie.get('id')});
                    $.ajax({
                        url: 'https://api.somelist.tk/editbot/settings?id='+props.botdata.id+'&token='+Cookie.get('token'),
                        type: 'POST',
                        data: $.param(data),
                    }).then((res)=>{
                        if (res.reply == 'TOKEN_INVALID'){
                            setloading(false)
                            toast.error('We couldn\'t verify your account. Please login again.', {
                                autoClose: 3000,
                                closeOnClick: true,
                                draggable: true,
                            });
                        }
                        if (res.reply == 'worked'){
                            setloading(false)
                            toast.success('Changes saved!', {
                                autoClose: 3000,
                                closeOnClick: true,
                                draggable: true,
                            });
                        } else {
                            setloading(true)
                            toast.error('An unexpected error occured :C', {
                                autoClose: 3000,
                                closeOnClick: true,
                                draggable: true,
                            });
                        }
                    }).catch(()=>{
                        setloading(false)
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
                    <ThreeDots color="#fff" height={'25'} width={'25'} />
                ) : (
                <><i className="mr-2 fas fa-save"></i><p className="font-semibold">Save</p></>
                )}
            </button>
            <div>
            <h1 className='text-4xl text-sky-500 italic font-semibold'>General</h1>
            <div className='flex w-full my-10'>
                <div className='w-full '>
                    <p className='text-xl'>Publicity</p>
                    <p>This option affects how people can view your bot.</p>
                </div>
                <div className='w-44'>
                <Listbox name="publicity" value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                        <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-lg bg-slate-500/50 py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">{selected.name}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <i className='fas fa-angle-down'/>
                            </span>
                      </Listbox.Button>
                        <Transition
                            as={Fragment}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Listbox.Options className="focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-500/50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-sky-500 text-white' : 'text-white'
                                    }`
                                }
                                value={person}
                                >
                                {({ selected }) => (
                                    <>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-semibold' : 'font-normal'
                                        }`}
                                    >
                                        {person.name}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                        </span>
                                    ) : null}
                                    </>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
                </div>
            </div>
            <div className='py-20' />
            </div>
            </form>

            <div>
            <h1 className='text-4xl text-sky-500 italic font-semibold'>Advanced</h1>
            <div className='flex w-full my-10'>
                <div className='w-full '>
                    <p className='text-xl'>API Token</p>
                    <p>An API token allows you to interact with the Somelist API (<a className='text-sky-500 cursor-pointer' onClick={()=> window.open('https://docs.somelist.tk')}>Learn More</a>)</p>
                </div>
                <div className='w-44'>
                    {props.botdata.token ?
                        <button className="bg-sky-700 rounded-xl px-3 py-4" onClick={()=>{
                            navigator.clipboard.writeText(props.botdata.token);
                            toast.info('Token copied to clipboard!', {
                                autoClose: 3000,
                                closeOnClick: true,
                                draggable: true,
                            });                        
                        }}>Copy Token</button>
                    :
                    <button className="bg-sky-700 rounded-xl px-3 py-4" onClick={()=>{
                        $.ajax({
                            url: 'https://api.somelist.tk/genToken?id='+props.botdata.id+'&token='+Cookie.get('token'),
                        }).then((res)=>{
                            if (res.reply == 'TOKEN_INVALID'){
                                setloading(false)
                                toast.error('We couldn\'t verify your account. Please login again.', {
                                    autoClose: 3000,
                                    closeOnClick: true,
                                    draggable: true,
                                });
                            }
                            if (res.reply == 'worked'){
                                window.location.reload()
                                toast.success('Token Generated!', {
                                    autoClose: 3000,
                                    closeOnClick: true,
                                    draggable: true,
                                });
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
                    }}>Generate Token</button>
                    }
                </div>
            </div>
            <div className='py-20' />
            </div>
            <div>
                <h1 className='text-4xl text-sky-500 italic font-semibold'>Ownership</h1>
                <div className='flex w-full my-10'>
                    <div className='w-full '>
                        <p className='text-xl'>Delete Bot</p>
                        <p>Delete your bot forever. This action is irreversable.</p>
                    </div>
                    <div>
                    <button
                        type="button"
                        onClick={openModal}
                        className="focus:outline-none rounded-md bg-red-500 bg-opacity-20 px-4 py-2 text-md font-medium text-white hover:bg-opacity-30 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                        Delete
                    </button>
                    <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Are you sure?
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            This action is <b>IRREVERSABLE</b> and will delete all of your bot's data, votes, and analytics.
                                        </p>
                                    </div>
                                    <div className="mt-4">

                                        <button
                                        type="button"
                                        className="m-2 focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                        >
                                        Cancel
                                        </button>
                                        <button
                                        type="button"
                                        className="focus:outline-none inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={()=>{
                                            $.ajax({
                                                url: 'https://api.somelist.tk/delete/'+props.botdata.id+'?token='+Cookie.get('token')
                                            }).then(()=>{
                                                router.push('/profile/'+props.botdata.owner)
                                            })
                                        }}
                                        >
                                        Delete
                                        </button>
                                    </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                    </Dialog>
                </Transition>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BotLayout
