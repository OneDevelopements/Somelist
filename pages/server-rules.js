import HeaderB from "../components/Navbar";
import Template from "../public/template";

export default function rules({isLoggedIn}){
    return(
        <>
        <HeaderB isLoggedIn={isLoggedIn}/>
        <div className="p-5 lg:p-10 py-[10rem] lg:py-[12rem] rounded-lg min-h-screen">
            <h1 className="italic text-sky-600 text-7xl font-bold">SERVER RULES</h1>
            <ol className="mt-10 list-decimal mx-10">
                <li className="text-md my-1 font-medium">Follow the <a className="text-sky-600" href='https://discord.com/terms' >discord TOS</a>. Breaking the TOS can lead to us reporting your account.</li>
                <li className="text-md my-1 font-medium">No harassment is allowed. We would love a safe enviroment where everyone can comminuty actively.</li>
                <li className="text-md my-1 font-medium">No spamming. Spamming can and will cause the chat to flood, resulting in our members being unable to focus on the topic.</li>
                <li className="text-md my-1 font-medium">Treat others the way you want to be treated. We at Somelist want to make sure everyone has a great time.</li>
                <li className="text-md my-1 font-medium">No NSFW. We are a Family-Friendly server, and strongly looks down on NSFW materials.</li>

            </ol>
        </div>
        </>
    )
}


export async function getServerSideProps(context) {
    return {
      props: {
        isLoggedIn: context.req.cookies.token
      }
    }
  } 