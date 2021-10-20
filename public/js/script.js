const isLogin = async ()=>{
    if(!localStorage.getItem('token')){
        window.location.replace('/auth')
    }
    const result = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    }).then((res)=>res.json())
    if(result.status !== 'ok'){
        window.location.replace('/auth')
    }
}

isLogin()