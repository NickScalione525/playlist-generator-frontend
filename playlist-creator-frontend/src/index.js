playlistForm.addEventListener('submit', Playlist.postPlaylist)

Playlist.fetchPlaylists()


function jsonToJS(resp){
    return resp.json()
}