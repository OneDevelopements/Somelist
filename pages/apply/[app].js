import HeaderB from "../../components/Navbar"

export default function Apply({isLoggedIn}){
    <HeaderB isLoggedIn={isLoggedIn}/>
    return(
        <></>
    )
}


export async function getServerSideProps(context) {
    if (context.query.app == 'partner') {
        return {
            props: {
                isLoggedIn: context.req.cookies.token ? true : false
            },
            redirect: {
            permanent: false,
            destination: "https://forms.gle/EEmc3ibjnLJWxjYs6",
            },
        }
    }
  } 