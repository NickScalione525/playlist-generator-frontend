let playlistForm = document.getElementById('playlistForm')
playlistForm.addEventListener('submit', Playlist.postPlaylist)

Playlist.fetchPlaylists()


function jsonToJS(resp){
    return resp.json()
}



function returnToHome(){
    document.getElementById('playlistContainer').innerHTML =  `
    <form id="playlistForm">
    <label>Playlist Name:</label>
    <input type="text">
    <input type="submit" value="Submit Playlist">
    </form>
    <div id="playlists"></div>
    `
    let playlistForm = document.getElementById('playlistForm')
    playlistForm.addEventListener('submit', Playlist.postPlaylist)
    Playlist.appendPlaylistsOnReturnHome()
}