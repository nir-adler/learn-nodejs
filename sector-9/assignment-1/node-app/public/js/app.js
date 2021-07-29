const form = document.querySelector("form")
const addressInput = document.querySelector("form input")

const massageOne = document.querySelector('#massage-1')
const massageTwo = document.querySelector('#massage-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    massageOne.textContent='Loading...'
    massageTwo.textContent=''
    try {
        fetch(`/weather?address=${addressInput.value}`)
            .then(response => response.json())
            .then(({error, location, forcast} = {}) => {
                if (error) {
                    massageOne.textContent='error'
                    massageTwo.textContent=error
                }else{
                    massageOne.textContent=location
                    massageTwo.textContent=forcast
                }

            })
    } catch (e) {
        massageOne.textContent='error'
        massageTwo.textContent=e
    }
})


