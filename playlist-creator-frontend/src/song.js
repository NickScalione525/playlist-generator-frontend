const ul = document.createElement('ul')


class Song {

    constructor(song) {
        this.id = song.id
        this.name = song.name
        this.artist = song.artist
        this.genre = song.genre
        this.playlistId = song.playlistId
    }
    static appendSongForm() {
        const playlists = document.getElementById('playlists')
        const songForm = `
        <form id="songForm">
        <label>Song Name:</label>
        <input id="songName"/>
        <input type="submit" value="Add Song"/>
        </form>
        `
        playlists.innerHTML += songForm
        document.getElementById('songForm').addEventListener('submit', addSong)
        }

        static appendSongs(songs, element) {
            element.append(ul)
            for (let song of songs) {
                song.appendSong()
            }
        }

        appendSong() {
            const songLi= document.createElement("li")
                const songDelete = document.createElement("button")
                songDelete.innerText = "Delete"
                songDelete.id = this.id
                songLi.innerText = this.name
                songDelete.addEventListener('click', function(e) {
                    deleteSong(this.id, songLi)
                })
                songLi.append(songDelete)
                ul.append(songLi)

        }
}




function deleteSong(songId, songLi) {
    fetch(`http://localhost:3000/songs/${song.id}`, {
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
    </form>
    `
    playlists.innerHTML += songForm
    document.getElementById('songForm').addEventListener('submit', addSong)
    }

    function addSong(e) {
        e.preventDefault()
    }