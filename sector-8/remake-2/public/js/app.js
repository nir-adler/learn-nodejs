const form = document.querySelector('form')
const input = document.querySelector('form input')

const massageOne = document.querySelector('#massage-1')
const massageTwo = document.querySelector('#massage-2')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = input.value

    massageOne.textContent = 'Loading...'
    massageTwo.textContent = ''
    fetch(`/weather?address=${encodeURIComponent(address)}`).then((response) => {
        return response.json()
    }).then(({error, location, forcast}) => {
        if (error) {
            massageOne.textContent = 'Error'
            massageTwo.textContent = error
        } else {
            massageOne.textContent = location
            massageTwo.textContent = forcast
        }
    })

})


