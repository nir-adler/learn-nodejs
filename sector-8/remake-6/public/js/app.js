const form = document.querySelector('form')
const addressInput = form.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(addressInput.value)
    const address = addressInput.value
    messageOne.innerHTML='Loding...'
    messageTwo.innerHTML=''
    const url = `/weather?address=${address}`
    try {
        fetch(url)
            .then((response) => {
                response.text()
                    .then((text) => {
                        console.log(JSON.parse(text))
                        const json=JSON.parse(text)
                        if(json.error){
                            messageOne.innerHTML='Error'
                            messageTwo.innerHTML=json.error
                        }else{
                            messageOne.innerHTML=json.placeName
                            messageTwo.innerHTML=json.forcast
                        }
                    })
                    .catch((e)=>{
                        console.log(e)
                    })
            })
        
    } catch (e) {
        console.log('error')
    }



})