

fetch('https://puzzle.mead.io/puzzle')
    .then((response) => {
        response.json().then((data) => {
            console.log(data)
        })
    })