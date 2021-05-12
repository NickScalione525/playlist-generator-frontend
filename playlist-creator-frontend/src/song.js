

class Song {



    static allSongs = []

    constructor(song) {
        this.id = song.id
        this.name = song.name
        this.artist = song.artist
        this.genre = song.genre
        this.playlistId = song.playlistId
        Song.allSongs.push(this)
    }

    appendSongForm() {
        const playlists = document.getElementById('playlists')
        const songForm = `
        <form id="songForm">  
        <label>Song Name:</label>
        <input id="songName"/>
        <input type="submit" value="Add Song"/>
        </form>`

        playlists.innerHTML += songForm
        document.getElementById('songForm').addEventListener('submit', Song.addSong.bind(this))
    }


    appendSong(ul){
        const songLi = document.createElement("li")
        const songDelete = document.createElement("button")
        songDelete.innerText = "Delete"
        songDelete.id = this.id
        songLi.innerText = this.name
        songDelete.addEventListener(`click`, e => {
            this.deleteSong(songLi)
        })
        songLi.append(songDelete)
        ul.appendSong(songLi)
    }

    deleteSong(songLi) {
        fetch(`http://localhost:3000/songs/${this.id}`, {
            method: "DELETE"
        }).then(jsonToJS)
            .then(m => {
                songLi.remove()
                Song.allSongs = Song.allSongs.filter(song => song.id !== this.id)
            })

    }
    static addSong(e) {
        e.preventDefault()
        const userInput = e.target.children[1].value
        const playlistId = e.target.children[2].id
        const body = {
            song: {
                name: userInput,
                playlist_id: playlistId
            }
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)
        }
        e.target.reset()
        fetch("http://localhost:3000/songs", options)
            .then(jsonToJS)
            .then(song => {
                let ul = document.getElementById(`playlist-${this.playlist_id}`)
                let newSong = new Song(song)
                newSong.appendSong(ul)
            })


    }
}





