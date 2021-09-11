const form = document.querySelector('form')
const addressInput = form.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



form.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loding...'
    messageTwo.textContent = ''
    const url = `/weather?address=${encodeURIComponent(addressInput.value)}`
    fetch(url, {}).then((response) => {
        return response.json()
    }).then(({ error, placeName, forcast }) => {
        if (error) {
            messageOne.textContent = 'Error'
            messageTwo.textContent = error
        } else {
            messageOne.textContent = placeName
            messageTwo.textContent = forcast
        }
    })

})