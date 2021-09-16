export default function ({ $axios }) {
    $axios.onRequest((config) => {
        config.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    })
    
        $axios.onError((error) => {
            console.log(error)
        })
    }
    