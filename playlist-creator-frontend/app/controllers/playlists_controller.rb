class PlaylistsController < ApplicationController

    def index
        render json: Playlist.all
    end

    def show
        playlist = Playlist.find_by(id: params[:id])
        render json: playlist
    end


    def create
        playlist = Playlist.create(playlist_params)
        render json: playlist
    end




    def playlist_params
        params.require(:playlist).permit(:name)
    end
    










end
