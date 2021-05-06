function appendSongs(songs, element) {
    const ul = document.createElement('ul')
    element.append(ul)


    for (let song of songs) {
     const songLi = document.createElement("li")
     const songDelete = document.createElement("button")
     songDelete.innerText = "Delete"
     songLi.innerText = song.name
     songDelete.addEventListener("click", function(e) {
         deleteSong(song.id, songLi)
     })
     songLi.append(songDelete)
     ul.append(songLi)
   
    } 
}

    function deleteSong(songId, songLi) {
        fetch(`http://localhost:3000/songs/${songId}`, { 
            method: "DELETE"
    }).then(jsonToJS)
    .then(m => {
        songLi.remove()
    })

    }

    function appendSongForm() {
        const playlists = document.getElementById('playlists')
        const songForm = `
        <form id="songForm">  
        <label>Song Name:</label>
        <input id="songName"/>
        <input type="submit" value="Add Song"/>
        </form>`

        playlists.innerHTML += songForm
        document.getElementById('songForm').addEventListener('submit', addSong)

    }
    function addSong(e) {
        e.preventDefault()
    }