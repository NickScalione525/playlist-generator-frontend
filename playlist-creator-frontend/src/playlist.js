




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

    appendPlaylistIndexPage() {
        const playlistsDiv = document.getElementById('playlists')
        const li = document.createElement("li")
        const div = document.createElement("div")
        const span = document.createElement("span")
        span.id = "playlist-span"
        li.innerText = this.name
        li.id = `playlist-name-${this.id}`
        li.addEventListener('click', this.renderPlaylistShowPage.bind(this))
        span.append(li)
        playlistsDiv.append(div)
        div.append(span)
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
        this.addEditListener()
    }

    // prependPlaylistShowPage() {
    //     const playlists = document.getElementById('playlists')
    //     const p = document.createElement("p")
    //     const div = document.createElement("div")
    //     const span = document.createElement("span")
    //     span.id = "playlist-span"
    //     li.innerText = this.name
    //     li.id = `playlist-name-${this.id}`
    //     span.append(p)
    //     div.append(span)
    //     playlists.append(div)



    }

    addEditListener() {
        const li = document.getElementById(`playlist-name-${this.id}`)
        li.addEventListener('click', () => this.openEditForm(li))
    }

    openEditForm(){
        const playlistsDiv = document.getElementById('playlists')
        const span = document.getElementById("list-span")
        const editForm = `
        <form id="playlistForm">
        <label>Playlist Name:</label>
        <input type="text" value="${playlist.name}">
        <input type="submit" value="Edit Playlist">
        </form>
        `
    
        span.innerHTML = editForm
        document.getElementById('playlistForm').addEventListener('submit', this.editPlaylist.bind(this))
    }

    editPlaylist(e) {
        e.preventDefault()
        const name = e.target.children[1].value
        const playlistObj = {
            playlist: {
                name
            }
        }
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(playlistObj)
        }
        fetch(`http://localhost:3000/playlists/${this.id}`, options)
        .then(jsonToJS)
        .then(playlistObj => {
            let playlist = Playlist.allPlaylists.find(playlist => playlist.id === playlistObj.id)
            playlist.name = playlist.Obj.name
        })
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


    appendSongs(element) {
        const ul = document.createElement("ul")
        ul.id = `playlist-${this.id}`
        element.append(ul)
        for (let song of this.songs) {
            song.appendSong(ul)
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
