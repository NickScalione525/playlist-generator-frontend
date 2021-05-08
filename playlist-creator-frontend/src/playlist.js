const playlistForm = document.getElementById('playlistForm')




class Playlist {

   static allPlaylists = []


constructor({name, id, songs}) {
    this.name = name
    this.id = id
    Playlist.allPlaylists.push(this)
    this.songs.forEach(song => new Song(song))
    
}
// initialize method


get songs() {
    return Song.allSongs.filter(song => song.playlistId === this.id)
}
 appendSongs(element) {
    const ul = document.createElement('ul')
    ul.id = `playlist-${this.id}`
    element.append(ul)
    for (let song of this.songs) {
        song.appendSong(ul)
    }
}

appendPlaylist() {
    const playlistsDiv = document.getElementById('playlists')
    const li = document.createElement("li")
    const div = document.createElement("div")
    li.innerText = this.name
    li.addEventListener('click', this.renderPlaylistShowPage.bind(this))
    playlistsDiv.append(div)
    div.append(li)
    this.appendSongs(div)


}

    renderPlaylistShowPage() {
        const playlistContainer = document.getElementById('playlistContainer')
        playlistContainer.children[1].innerHTML = ""
        playlistContainer.children[0].remove()
        this.appendPlaylist()
        this.appendSongForm()
    }

    appendSongForm() {
        const playlists = document.getElementById('playlists')
        const songForm = `
        <form id="songForm">
        <label>Song Name:</label>  
        <input id="songName"/>
        <input type="hidden" id="${this.id}"/>
        <input type="submit" value="Add Song"/>
        </form>
        `
        playlists.innerHTML += songForm
        document.getElementById('songForm').addEventListener('submit', Song.addSong)
        }


    static fetchPlaylists() {
        fetch("http://localhost:3000/playlists")
        .then(jsonToJS)
        .then(this.appendPlaylists)

    }

    static appendPlaylists(playlists){
        for (let playlist of playlists) {
            let newPlaylist = new Playlist(playlist)
            newPlaylist.appendPlaylist()
        }
    }

    static postPlaylist(e) {
        e.preventDefault()
        const userInput = e.target.children[1].value
        const body = {
            playlist: {
                name: userInput
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

        fetch("http://localhost:3000/playlists", options)
        .then(jsonToJS)
        // turn object from json to JS
        .then(playlist => {
            let newPlaylist = new Playlist(playlist)
            newPlaylist.appendPlaylist()
        })
        // creating a new object from the old in order to get new methods not available to old  object and then call append playlist on it.
    }

}