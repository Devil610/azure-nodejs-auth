const regForm = document.getElementById('reg-form')
regForm.addEventListener('submit', regUser)

const loginForm = document.getElementById('login-form')
loginForm.addEventListener('submit', loginUser)

function showErr(type, field, text){
    conatiner = document.getElementById(`${type}-${field}-err`)
    conatiner.classList.add('field-error')

    textField = document.getElementById(`${type}-${field}`)
    textField.value = ''
    textField.placeholder = text
}

async function regUser(event){
    event.preventDefault()
    const name = document.getElementById('reg-name').value
    const email = document.getElementById('reg-email').value
    const password = document.getElementById('reg-password').value

    const result = await fetch('/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email, password
        })
    }).then((res) => res.json())

    if (result.status === 'ok'){
        alert("User created succesfuly")
    }
    else{
        showErr(result.type, result.field, result.error)
    }
}


async function loginUser(event){
    event.preventDefault()
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value

    const result = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email, password
        })
    }).then((res) => res.json())

    if (result.status === 'ok'){
        localStorage.setItem('token', result.data)
        window.location.replace('/')
    }
    else{
        showErr('login', 'email', result.error)
        showErr('login', 'password', '')
    }
}