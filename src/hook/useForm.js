import { useState } from "react"

 
export const useForm = ( initialForm = {}) =>{
    const [formState, setForState] = useState (initialForm)

    const onInputChange = ({target}) =>{
        const { name, value} = target;

        setForState({
            ...formState, [name] : value
        })
    }

    const onReserForm = ()=>{
        setForState(initialForm);


    }
    return {
        ...formState,
        formState,
        onInputChange,
        onReserForm
    }

 }

 export default useForm