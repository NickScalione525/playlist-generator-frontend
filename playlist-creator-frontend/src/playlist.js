




class Playlist {

    static allPlaylists = []
 
 
     constructor(playlist) {
     this.name = playlist.name
     this.id = playlist.id
     Playlist.allPlaylists.push(this)
     this.songs.forEach(song => new Song(song))
     
     }
         // initialize method
 
 
     get songs() {
         return Song.allSongs.filter(song => song.playlistId === this.id)
     }
    // bindThisValues() {
    //     this.renderPlaylistShowPage = this.renderPlaylistShowPage.bind(this)
    // }

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
        li.id = `playlist-name-${this.id}`
        li.addEventListener('click', this.renderPlaylistShowPage.bind(this))

        // When addEventListener invokes callback function
        // pass a callback to be invoked when we click
        // the call back function is invoked by addEventListener
        // when it invokes function it will set whatever is passed's
        // bind bypasses default value set up specific value fo rthis in renderplaylistshowpage
        playlistsDiv.append(div)
        div.append(li)
        this.appendSongs(div)
    }

    renderPlaylistShowPage() {
        const playlistContainer = document.getElementById('playlistContainer')
        const back8tn = document.createElement('button')
        playlistContainer.children[1].innerHTML = ""
        playlistContainer.children[0].remove()
        back8tn.addEventListener('click', returnToHome)
        back8tn.innerText = "Home"
        playlistContainer.append(back8tn)

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
        document.getElementById('songForm').addEventListener('submit', Song.addSong.bind(this))
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

    static appendPlaylistsOnReturnHome() {
        for (let playlist of Playlist.allPlaylists) {
            playlist.appendPlaylist() 
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