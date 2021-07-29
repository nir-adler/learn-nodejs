const weatherForm = document.querySelector('form')
const address = weatherForm.querySelector('input')
const messageOne = document.querySelector('#massage-1')
const messageTwo = document.querySelector('#massage-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const url = `http://127.0.0.1:3000/weather?address=${address.value}`
    try {
        messageOne.textContent='loading...'
        messageTwo.textContent=''
        fetch(url)
            .then((response) => {
                response.json().then(({error, temperature, rain, location}) => {
                    if (error) {
                        messageOne.textContent = 'error'
                        messageTwo.textContent = error.toString()
                    } else {
                        messageOne.textContent = location
                        messageTwo.textContent = 'Temperature are:' + temperature + ', Chance of rain are:' + rain + '%'
                    }
                })
            })
    } catch (e) {
        messageTwo.innerHTML=e.toString()
    }

})