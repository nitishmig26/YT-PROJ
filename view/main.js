document.querySelector('#button').addEventListener('click', () => {
    const xhr = new XMLHttpRequest()
    const value = document.querySelector('#search').value

    let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAaRhf4bzmjrW93vkWcnsFTmgO1U-kTT40&part=snippet&q=${value}&maxResults=50`

    xhr.open('GET', url)

    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText)

            let output = ''
            for (let i = 0; i < response.items.length; i++) {
                output += `
                    <div style="width:22%; margin:0.5em;">
                        <a href="https://www.youtube.com/watch?v=${response.items[i].id.videoId}" target="_blank" >
                            <img style="width: 100%;" src=${response.items[i].snippet.thumbnails.high.url} />
                        </a>
                        <h5>${response.items[i].snippet.title}</h5>
                        <p style="color: gray;">${response.items[i].snippet.description}</p>
                    </div>
                `
            }

            document.querySelector('#videos').innerHTML = output
        }
    }

    xhr.send()
})

document.querySelector('#lobtn').addEventListener('click', (e) => {
    e.preventDefault()
    window.location.replace('../index.html')
})