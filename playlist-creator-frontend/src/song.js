


class Song {

    static allSongs = []

    constructor(id, name, playlistId) {
        this.id = id
        this.name = name
        this.playlistId = playlistId
        Song.allSongs.push(this)
    }


        appendSongs(ul) {
            const songLi = document.createElement("li")
            const songDelete = document.createElement("button")
            songDelete.innerText = "Delete"
            songDelete.id = this.id
            songLi.innerText = this.name
            songDelete.addEventListener("click", e =>  {
                this.deleteSong(songLi)
            })
            songLi.append(songDelete)
            ul.append(songLi)
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
            // turn object from json to JS
            .then(song => {
            
                let ul = document.getElementById(`playlist-name-${this.playlist_id}`)
                let newSong = new Song(song)
                newSong.appendSong(ul)
            })
            // creating a new object from the old in order to get new methods not available to old  object and then call append playlist on it.
        }
    
    }
       