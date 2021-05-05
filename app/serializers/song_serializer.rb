class SongSerializer < ActiveModel::Serializer
  attributes(:id, :name, :artist, :genre)
  belongs_to :playlist
end
