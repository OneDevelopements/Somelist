import { useRouter } from "next/router"
import Template from "../../../public/template"

export default Template(function Edit(){
    const router = useRouter()
    const {id} = router.query
    return(
        <></>
    )
})