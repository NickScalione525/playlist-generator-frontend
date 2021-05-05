class PlaylistsController < ApplicationController

    def index
        render json: Playlist.all
    end

    def show
        playlist = Playlist.find_by(id: params[:id])
        render json: playlist
    end


end
