const form = document.querySelector('form')
const addressInput = form.querySelector('input')
const massgeOne = document.querySelector('#massage-one')
const massgeTwo = document.querySelector('#massage-two')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(addressInput.value)
    massgeOne.textContent = 'Loding..'
    massgeTwo.textContent = ''
    fetch(`/weather?address=${encodeURIComponent(addressInput.value)}`)
        .then((response) => {
            return response.json()
        })
        .then(({ error, placeName, forcast } = {}) => {
            if (error) {
                massgeOne.textContent = 'Error'
                massgeTwo.textContent = error
            } else {
                massgeOne.textContent = placeName
                massgeTwo.textContent = forcast
            }
        })
})


