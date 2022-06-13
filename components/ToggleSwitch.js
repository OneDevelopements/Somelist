import { Switch } from "@headlessui/react";
import Tippy from "@tippyjs/react";
import { useState } from "react";

const ToggleSwitch = (props) =>{
    const [enabled, setenabled] = useState(props.defaultSelected ? true : false)
    return(<div className="w-full flex items-center">
        <p>{props.label} {props.tooltip && <Tippy content={props.tooltip} placement='top'><i className="far fa-question-circle text-white/50 hover:text-white"></i></Tippy>}</p>
        <Switch
           checked={enabled}
           onChange={(e) => {
               setenabled(e)
               if (props.onChange){
                   props.onChange(e)
               }
           }}
           className={`${enabled ? 'bg-sky-600' : 'bg-gray-900'}
                   ml-auto inline-flex h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
           >
             <span className="sr-only">Toggle switch</span>
             <span
               aria-hidden="true"
               className={`${enabled ? 'translate-x-6' : 'translate-x-0'}
               pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
             />
        </Switch>
    </div>)
}

export default ToggleSwitch