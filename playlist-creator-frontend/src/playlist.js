const playlistForm = document.getElementById('playlistForm')


class Playlist {

    constructor(playlist) {
        this.name = playlist.name
        this.id = playlist.id
        this.songs = playlist.songs
        // this.bindThisValues()
    }

    // bindThisValues() {
    //     this.renderPlaylistShowPage = this.renderPlaylistShowPage.bind(this)
    // }

     appendPlaylist() {
        const playlistsDiv = document.getElementById('playlists')
        const li = document.createElement("li")
        li.innerText = this.name
        li.addEventListener('click', this.renderPlaylistShowPage.bind(this))
      
        // When addEventListener invokes callback function
        // pass a callback to be invoked when we click
        // the call back function is invoked by addEventListener
        // when it invokes function it will set whatever is passed's
        // bind bypasses default value set up specific value fo rthis in renderplaylistshowpage
        playlistsDiv.append(li)
        appendSongs(this.songs, li)
    }

     renderPlaylistShowPage() {
        debugger
        const playlistContainer = document.getElementById('playlistContainer')
        playlistContainer.children[1].innerHTML = ""
        playlistContainer.children[0].remove()
        this.appendPlaylist()
        appendSongForm()
    
    }

    static fetchPlaylists() {
        fetch("http://localhost:3000/playlists")
        .then(jsonToJS)
        .then(this.appendPlaylists)
    }
    
    static appendPlaylists(playlists) {
        for (let playlist of playlists) {
            let newPlaylist = new Playlist(playlist)
            newPlaylist.appendPlaylist() 
          }
    }

    static postPlaylist(e) {
        e.preventDefault()
        const userInput = e.target.children[1].value
        const body = {playlist: {name: userInput}}
        const options = {
            method: "POST",
            headers: {"Content-Type": "application/json",
            Accept: "application/json"},
            body: JSON.stringify(body)
        }
        e.target.reset()
        fetch("http://localhost:3000/playlists", options)
        .then(jsonToJS)
        .then(playlist => {
            let newPlaylist = new Playlist(playlist)
            newPlaylist.appendPlaylist()
        })
    
    
    }




}






 
