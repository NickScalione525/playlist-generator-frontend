const playlistForm = document.getElementById('playlistForm')




class Playlist {


constructor(playlist) {
    this.name = playlist.name
    this.id = playlist.id
    this.songs = playlist.songs.map(song => new Song(song))

}
// initialize method

appendPlaylist() {
    const playlistsDiv = document.getElementById('playlists')
    const li = document.createElement("li")
    li.innerText = this.name
    li.addEventListener('click', this.renderPlaylistShowPage.bind(this))
    playlistsDiv.append(li)
    Song.appendSongs(this.songs, li)


}

    renderPlaylistShowPage() {
        const playlistContainer = document.getElementById('playlistContainer')
        playlistContainer.children[1].innerHTML = ""
        playlistContainer.children[0].remove()
        this.appendPlaylist()
        Song.appendSongForm()
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