import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import $ from 'jquery'
import Cookie from 'js-cookie'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
const MarketplaceItem = (props) =>{
    const [toast, settoast] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    const [error, seterror] = useState(false)
    const [purchasing, setpurchasing] = useState(false)
    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
    }
    return(
        <>
        <div className='justify-center items-center my-4 p-10 bg-blue-900/10 rounded-xl flex-col flex lg:flex-row'>
                <div className='rounded-xl flex items-center justify-center p-4 w-24 h-20 min-w-20 min-h-20 bg-yellow-600/30 lg:mr-4'>
                    <i className='fas fa-crown text-3xl text-yellow-500'></i>
                </div>
                <div className='flex flex-col w-full my-4 lg:my-0 text-center lg:text-left'>
                    <h1 className='text-xl'>{props.name}</h1>
                    <p className='text-gray-100/50 '>{props.description}</p>
                </div>
                <div>
                    <button disabled={props.owned} onClick={() => openModal()} className='disabled:bg-gray-700 hover:bg-violet-600 delay-150 transition-all ease-in-out duration-300 hover:scale-110 hover:shadow-xl shadow-violet-100 ring-0 shadow-none p-4 rounded-xl bg-blue-600 px-10 ml-auto'>
                    {props.owned ? 'Owned' : 'Buy'}
                    </button>
                </div>
        </div>
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
                <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-xl" />
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
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-100"
                    >
                        Are you sure?
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-100/70">
                            <b>{props.price} points</b> will be deducted from your account. This action is non-refundable!
                        </p>
                    </div>

                    <div className="mt-4 flex w-full">
                        <button
                            type="button"
                            className="ml-auto inline-flex justify-center rounded-md border border-transparent bg-blue-500/20 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                        >
                            Nevermind
                        </button>
                        <button
                            type="button"
                            
                            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => {
                                    settoast(false)
                                    setpurchasing(true)
                                    $.ajax({
                                        url: 'https://api.somelist.tk/points/purchase?item='+ props.id + '&price='+props.price+'&token='+Cookie.get('token')
                                    }).then((res)=>{
                                        if(res.result == 'TOKEN_INVALID'){
                                            settoast('Token invalid. Please log in again.')
                                            setpurchasing(false)
                                            seterror(true)
                                        } else if (res.result == 'NO_FUNDS'){
                                            settoast('You don\'t have the points to buy this asset.')
                                            setpurchasing(false)
                                            seterror(true)
                                        } else if (res.result == 'BOUGHT'){
                                            settoast('You already bought this item. No charges were made.')
                                            setpurchasing(false)
                                            seterror(true)
                                        } else {
                                            setpurchasing(false)
                                            seterror(false)
                                            settoast('Purchase succeeded. Reloading for changes.')
                                            setTimeout(()=>{
                                                window.location.reload()
                                            }, 1500)
                                        }
                                        closeModal()
                                        setTimeout(()=>{
                                            settoast(false)
                                        }, 3000)
                                    })
                                }
                            }
                        >
                        {purchasing ? <ThreeDots width={'30px'} height={'20px'} color='#fff' /> : 'Purchase'}
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        {toast && 
            <div style={{zIndex: 1000}} className={`${error ? 'bg-red-500' : 'bg-green-500'} p-4 text-center fixed left-0 top-0 w-screen`}>
                {toast}
            </div>
        }
        </>

    )
}
export default MarketplaceItem