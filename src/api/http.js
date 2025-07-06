import axios from "axios"

const _Http=axios.create({
    baseURL:"",
    timeout:""
})

export const getApi=async(url)=>{
    try {
        const response=await _Http.get(url)
        return response.data
        
    } catch (error) {
        console.log(error)
        throw error
        
    }
}