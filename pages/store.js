import MarketplaceItem from "../components/MarketplaceItem"
import HeaderB from "../components/Navbar"
export default function Store({points, items, isLoggedIn}){
    return(
    <>
    <HeaderB isLoggedIn={isLoggedIn}/>
    <div className='p-5 lg:p-10 py-[8rem] lg:py-[8rem] rounded-lg min-h-screen	'>
        <div className='mb-10 flex'>
            <h1 className='text-4xl text-blue-500 font-bold'>The Marketplace</h1>
            <div className='ml-auto p-6 rounded-xl bg-blue-700 py-4'>
                {points} points
            </div>
        </div>
        <div className='mb-20'>
        <input
        placeholder='Search for a marketplace item...'
        className="transition-all duration-200 my-2 w-full bg-black/10 dark:bg-black/30 dark:hover:bg-black/50 hover:bg-black/20 text-dark dark:text-white focus:text-sky-500 rounded-xl border border-white/10 focus:border-sky-500 outline-none py-4 px-6"/>
        </div>
        <div>
            {items.map((item)=>{
                return <MarketplaceItem id={item.id} name={item.name} price={item.price} description={item.description} owned={item.owned}/>
            })}
        </div>
    </div>
    </>
    )
}


export async function getServerSideProps(context) {
    if (!context.req.cookies.token){
        return {
            redirect: {
              permanent: false,
              destination: "https://api.somelist.tk/login?branch="+process.env.NEXT_PUBLIC_BRANCH,
            },
        }
    }
    const res = await fetch('https://api.somelist.tk/points/'+ context.req.cookies.id+'?token='+context.req.cookies.token)
    const json = await res.json()
    const res2 = await fetch('https://api.somelist.tk/store?token='+context.req.cookies.token)
    const json2 = await res2.json()
    return {props: {
      points: json.points,
      items: json2.items,
      isLoggedIn: context.req.cookies.token ? true : false
    }}
}

