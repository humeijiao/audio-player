import axios from 'axios'

let serves=axios.create({
    baseURL:'http://localhost:3000/',
    timeout:2000
})
export default serves