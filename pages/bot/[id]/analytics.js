import { useRouter } from "next/router"
import HeaderB from "../../../components/Navbar"

export default function Edit({isLoggedIn}){
    const router = useRouter()
    const {id} = router.query
    return(
        <>
        <HeaderB isLoggedIn={isLoggedIn}/>
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