const form = document.getElementById('reg-form')
form.addEventListener('submit', regUser)

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

    const result = await fetch('/auth/Register', {
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

