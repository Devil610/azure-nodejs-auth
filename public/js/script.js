const form = document.getElementById('reg-form')
form.addEventListener('submit', regUser)

async function regUser(event){
    event.preventDefault()
    const name = document.getElementById('reg-name').value
    const email = document.getElementById('reg-email').value
    const password = document.getElementById('reg-password').value

    const result = await fetch('/auth/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email, password
        })
    })
}
