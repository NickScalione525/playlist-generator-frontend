class SongsController < ApplicationController

    def index
        render json: Song.all
    end

 

    def destroy
        song = Song.find_by(id: params[:id])
        song.destroy
        render json: {message: "Song succesfully removed"}
    end


end
