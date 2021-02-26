console.log(`Client Side Javascript is Loaded`)

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// } )



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mesgOne = document.querySelector('#mesg1')
const mesgTwo = document.querySelector('#mesg2')



weatherForm.addEventListener('submit', (e)=>{
    (e).preventDefault()

    const location = search.value

    mesgOne.textContent = 'Loading'

    fetch(`/about?location=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            mesgOne.textContent = data.error

        } else {
            mesgOne.textContent = data.found_location
            mesgTwo.textContent = data.weather_desc
        }
    })
})
})