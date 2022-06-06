import HeaderB from "../components/Navbar";

import { Fragment } from 'react'
import {Listbox, Transition } from '@headlessui/react'
import { useState } from "react";
import $ from 'jquery'
import Image from "next/image";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";
import { useEffect } from "react";
import BotCard from "../components/BotCard";
export default function Explore({isLoggedIn}){
    const people = [
        { name: '6' },
        { name: '12' },
        { name: '30' }
    ]
    const sortings = [
        { name: 'Votes' },
        { name: 'Latest' },
        { name: 'Oldest' }
    ]
    const [rselected, setrselected] = useState(people[0])
    const [tselected, settselected] = useState(sortings[0])
    const [loading, setloading] = useState(false)
    const router = useRouter()
    useEffect(()=>{
        if(!router.isReady) return;
        $.ajax({
            url: 'https://api.somelist.tk/find_bots?limit=6'
        }).then((res)=>{
            setloading(false)
            setbots(
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-24 mt-20'>
                {res.bots.map((bot)=>{
                    if (!bot.approved){
                    return (<></>)
                    }
                    return(
                    <>
                    <BotCard name={bot.name} id={bot.id} votes={bot.votes} avatar={bot.avatar} banner={bot.banner} shortdesc={bot.shortdesc}/>
                </>
                )
                })}
                </div>
            )
        })
    }, [router.isReady])
    const  [bots, setbots] = useState(
    <>
    <div className='h-screen flex w-full items-center justify-center'>
        <div className='text-center'>
            <h1 className='text-3xl'>Please wait...</h1>
            <br/>
            <p className='text-slate-100/70 text-md'>We're fetching some data.</p>
        </div>
    </div>
    </>)
    return(
        <>
            <HeaderB isLoggedIn={isLoggedIn}/>
            <div className=''>
                <div className='flex p-4 h-full'>
                    <div className='py-[7rem] lg:py-[7rem] mr-10'>
                    <div className='bg-sky-800/10 rounded-lg backdrop-blur-lg p-4 w-72'>
                        <h1 className='text-sky-500 text-3xl'><i className='font-thin text-2xl fas fa-sliders'/> Filters</h1>
                        <form method='POST'>
                        <div className='mt-10'>
                            <h3 className='text-xl'>Amount</h3>
                            <p className='text-sm text-slate-100/70'>Number of bots to find.</p>
                            <Listbox name="results" value={rselected} onChange={setrselected}>
                                <div className="relative mt-1">
                                    <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-lg bg-slate-500/50 py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span className="block truncate">{rselected.name}</span>
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
                                        <Listbox.Options className="backdrop-blur-lg focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-500/50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
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
                                            {({ rselected }) => (
                                                <>
                                                <span
                                                    className={`block truncate ${
                                                        rselected ? 'font-semibold' : 'font-normal'
                                                    }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {rselected ? (
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
                        <div className='mt-10'>
                            <h3 className='text-xl'>Sort</h3>
                            <p className='text-sm text-slate-100/70'>The sorting method of the bots.</p>
                            <Listbox name="sort" value={tselected} onChange={settselected}>
                                <div className="relative mt-1">
                                    <Listbox.Button className="backdrop-blur-lg focus:outline-none relative w-full cursor-default rounded-lg bg-slate-500/50 py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span className="block truncate">{tselected.name}</span>
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
                                        {sortings.map((person, personIdx) => (
                                            <Listbox.Option
                                            key={personIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-sky-500 text-white' : 'text-white'
                                                }`
                                            }
                                            value={person}
                                            >
                                            {({ tselected }) => (
                                                <>
                                                <span
                                                    className={`block truncate ${
                                                        tselected ? 'font-semibold' : 'font-normal'
                                                    }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {tselected ? (
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
                        <button 
                            type='button'
                            disabled={loading}
                            className='mt-6 py-3 p-4 bg-sky-600 rounded-lg text-lg'
                            onClick={()=>{
                                setloading(true)
                                setbots(
                                    <div className='h-screen w-full flex items-center justify-center'>
                                        <ThreeDots color="#fff"/>
                                    </div>
                                )
                                $.ajax({
                                    url: 'https://api.somelist.tk/explore',
                                    type: 'POST',
                                    data: $('form').serialize()
                                }).then((res)=>{
                                    setloading(false)
                                    setbots(
                                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-24 mt-20'>
                                        {res.bots.map((bot)=>{
                                            if (!bot.approved){
                                            return (<>                    
                                            </>)
                                            }
                                            return(
                                                <BotCard name={bot.name} id={bot.id} votes={bot.votes} avatar={bot.avatar} banner={bot.banner} shortdesc={bot.shortdesc}/>                                            

                                            )
                                        })}
                                        </div>
                                    )
                                })
                            }}
                            >
                            
                            {loading  ? <TailSpin color='#fff' width={'25'} height={'25'}/> :'Find'}
                        </button>
                        </form>
                    </div>
                    </div>
                    <div className='w-full h-full'>
                        {bots}
                    </div>
                </div>
            </div>
        </>
    )
}



export async function getServerSideProps(context) {
    return {
      props: {
        isLoggedIn: context.req.cookies.token ? true : false
      }
    }
  } 