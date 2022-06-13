import Tippy from "@tippyjs/react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import HeaderB from "../../../components/Navbar"
import {motion} from 'framer-motion'
import { AnimatePresence } from "framer-motion";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from 'js-cookie'

import $ from 'jquery'
import ToggleSwitch from "../../../components/ToggleSwitch";
export default function Edit({isLoggedIn, userdatae}){
    const [userdata, setuserdata] = useState(userdatae)
    const [bio, setbio] = useState(userdata.bio)
    const [loading, setloading] = useState(false)
    const[loaded, setloaded] = useState(false)
    const [tabs, settabs] = useState([
      {
        label: 'loading',
        disabled: true
      }
    ])
    const router = useRouter()
    useEffect(() => {
      settabs([
      { label: 'General', content: <>
      <form>
      <div className='my-32 items-center'>
        <div className="mr-6 mb-3 w-full">
          <p className="text-lg font-semibold">Profile Bio</p>
          <p className="mt-1 text-sm text-zinc-400">Tell us more about yourself. You can add your Job here, Profession, or something cool about you.</p>
        </div>
        <input 
          name='bio' 
          id='bio' defaultValue={bio} onChange={(e)=>{
            setbio(e.target.value)
          }} 
          resize 
          className="w-full bg-[#0B0A15]/70 backdrop-blur-md p-4 text-lg rounded-lg outline focus:outline-sky-500 outline-1 bg-zinc-900/50 outline-zinc-700"
          type='text'/>
      </div>
      </form>
      </> },
      { label: 'Posts', disabled: true },
      { label: 'Settings', content: <>
      <div className="my-20">
        <ToggleSwitch label='Allow everyone to view assets' tooltip='Allow everyone to view the items you own or bought' defaultSelected={userdata.viewAssets} onChange={(e) => {
          $.ajax({
            url: 'https://api.somelist.tk/users/settings?token='+Cookie.get('token'),
            type: 'POST',
            data: {viewAssets: e},
          }).then((res)=>{
              if (res.reply == 'TOKEN_INVALID'){
                  toast.error('We couldn\'t verify your account. Please login again.', {
                      autoClose: 3000,
                      closeOnClick: true,
                      draggable: true,
                  });
              }
              if (res.reply == 'worked'){
                  setuserdata(res.newdata)
                  toast.success(`${e ? 'Assets can now be viewed publicly.' : 'Assets can only be viewed by you.'}`, {
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
              setloading(false)
              toast.error('An unexpected error occured :C', {
                  autoClose: 3000,
                  closeOnClick: true,
                  draggable: true,
              });
          })
        }}/>
      </div>
      </>}
    ])
    }, [userdata, loaded])
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    useEffect(()=>{
      setloaded(true)
    }, [])
    useEffect(()=>{
      setSelectedTab(tabs[0])
    }, [loaded])
    return(<>
    
    <HeaderB isLoggedIn={isLoggedIn}/>
        <div className="p-5 lg:p-10 py-[10rem] lg:py-[12rem] rounded-lg min-h-screen">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-y-4 xl:gap-y-0 xl:gap-x-8">

            <div className="col-span-3">
                  <div className="flex w-full flex-col items-center">
                    <div
                        className="flex-shrink-0 border-[2.2px] w-[8rem] h-[8rem] border-sky-500/50 mb-2 rounded-full"
                    >
                        <div
                        style={{display: "inline-block", maxWidth: "100%", overflow: "hidden", position: "relative", boxSizing: "border-box", margin: "0px"}}
                        >
                        <div style={{boxSizing: "border-box", display: "block", maxWidth: "100%"}}>
                            <img
                            style={{maxWidth: "100%", borderRadius: '100%', display: "block", margin: "0px", border: "medium none", padding: "0px"}}
                            alt=""
                            src={userdata.avatar}
                            aria-hidden="true"
                            role="presentation"
                            />
                        </div>
                        <Image
                            alt="vcodes.xyz"
                            decoding="async"
                            height='0'
                            width='0'
                            src={userdata.avatar}
                            className="rounded-full"
                            style={{position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "medium none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%"}}
                        />
                        </div>
                    </div>
                    <p
                        className="text-3xl font-semibold line-clamp-1 italic text-black dark:text-white"
                    >
                        {userdata.name}
                    </p>
                    <p className="text-base italic text-black/80 mt-2 dark:text-white/80 text-center">{bio}</p>
                    
                    <div className="flex items-center mt-2 gap-x-2">
                        
                        {userdata.badges  &&
                        userdata.badges.includes('owner') &&
                        <>
                        <Tippy content='Owner' placement='top'>
                        <i className="fa fa-crown text-2xl text-orange-500 mr-1"></i>
                        </Tippy>
                        </>
                        }
                        {userdata.badges  &&
                          userdata.badges.includes('team') &&
                        <>
                        <Tippy content='Team' placement='top'>
                        <i className="fa fa-users text-2xl text-green-500 mr-1"></i>
                        </Tippy>
                        </>     
                        }                   
                        {userdata.badges  &&
                          userdata.badges.includes('moderator') &&
                        <>
                        <Tippy content='Moderator' placement='top'>
                        <i className="fa fa-shield text-2xl text-red-500 mr-1"></i>
                        </Tippy>
                        </>                               
                        } {
                          userdata.badges  &&
                          userdata.badges.includes('partner') && 
                        <>
                          <Tippy content='Partner' placement='top'>
                          <i className="fa fa-handshake text-2xl text-violet-500 mr-1"></i>
                          </Tippy>
                        </>                                                       
                        }
                        {userdata.badges  &&
                          userdata.badges.includes('bot reviewer') &&
                        <>
                          <Tippy content='Bot Reviewer' placement='top'>
                          <i className="fa fa-bolt text-2xl text-fuchsia-500 mr-1"></i>
                          </Tippy>
                        </>                                                                               
                        }{userdata.badges  &&
                          userdata.badges.includes('bot developer') &&
                        <>
                        <Tippy content='Bot Developer' placement='top'>
                          <i className="fa fa-hammer text-2xl text-blue-500 mr-1"></i>
                        </Tippy>
                        </>                        
                      }
                    </div>
                    <div className="mt-5 w-full">

                        <div
                          className="flex items-center text-sky-500 dark:text-sky-500  text-xl text-left"
                        >
                          <i className="fas fa-wrench text-sky-500 mr-2"></i
                          >
                          <span className="text-sky-500">Actions</span>
                        </div>
                        <button
                        onClick={()=>{
                          router.push('/profile/'+userdata.id)
                        }}
                        className="flex items-center shadow-xl w-full text-left"
                        ><div
                          className="mt-2 bg-slate-700 text-center px-5 py-2 rounded-l-lg text-white"
                        >
                        <i className="fas fa-chevron-left"></i>
                        </div>
                        <div
                            className="mt-2 bg-slate-800 w-full px-4 py-2 rounded-r-lg text-white"
                        >
                            <p className="line-clamp-1">Return</p>
                        </div></button>
                        <div
                        className="mt-4 flex items-center text-sky-500 dark:text-sky-500 text-xl text-left"
                        >
                        <i className="fas fa-external-link text-sky-500 mr-2"></i
                        ><span className="text-sky-500">Links</span>
                        </div>
                        <a
                        href={"https://discord.com/users/"+userdata.id}
                        className="flex items-center shadow-xl"
                        target="_blank"
                        ><div
                            className="mt-2 bg-indigo-700 text-center px-4 py-2 rounded-l-lg text-white"
                        >
                            <i className="fab fa-discord"></i>
                        </div>
                        <div
                            className="mt-2 bg-indigo-600 w-full px-4 py-2 rounded-r-lg text-white"
                        >
                            <p className="line-clamp-1">{userdata.name}#{userdata.discriminator}</p>
                        </div></a>
                    </div>
                    </div>
                </div>
            <div className="col-span-9">
                <ul className="w-full flex">
                  {tabs.map((item) => {
                    return (
                      <li
                        key={item.label}
                        className={`tab text-2xl ${item.disabled && 'text-white/10'}`}
                        onClick={() =>{ 
                          if (!item.disabled) {
                              setSelectedTab(item)
                          }
                        }}
                      >
                        <p className="text-center w-full" style={{zIndex: 11}}>{`${item.label}`}</p>
                        {item.label === selectedTab.label && (
                          <motion.div className="underline" layoutId="underline" />
                        )}
                        </li>
                    )
                  })
                  }
                </ul>

      {selectedTab.label == 'General' && <button
        style={{'zIndex': '100', 'float': 'right', 'bottom': '20px', 'right': '20px'}}
        className="fixed opacity-100 h-14 bg-gradient-to-br from-sky-600 to-sky-800 py-4 px-6 flex items-center rounded-lg text-white shadow-sm shadow-sky-600/20"
        disabled={loading}
        onClick={() => {
            setloading(true)
            var data = $('form').serializeArray(); 
            $.ajax({
                url: 'https://api.somelist.tk/users/edit?token='+Cookie.get('token'),
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
      }
      <main>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab.content}
          </motion.div>
        </AnimatePresence>
      </main>
            </div>
            </div>

        </div>
    </>)
}

export async function getServerSideProps(context) {
    const res = await fetch('https://api.somelist.tk/info?user='+context.query.id)
    const data = await res.json()
    return {
      props: {
        isLoggedIn: context.req.cookies.token ? true : false,
        userdatae: data.result
      }
    }
} 