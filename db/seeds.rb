# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Playlist.create(name: "Summer Vibes")
Playlist.create(name: "Xmas")
Playlist.create(name: "Workout-Mix")

Song.create(name: "The Wreck of the Edmund Fitzgerald", artist: "Gordon Lightfoot", genre: "Folk", playlist_id: 1)
Song.create(name: "Rudolph", artist: "Bing Crosby", genre: "Christmas Carole", playlist_id: 2)
Song.create(name: "Good Vibrations", artist: "Marky Mark", genre: "Pop", playlist_id: 3)
Song.create(name: "Pawn Shop", artist: "Sublime", genre: "Rock", playlist_id: 1)
Song.create(name: "Frosty", artist: "Neighborhood Kids", genre: "Christmas Carole", playlist_id: 2)
Song.create(name: "Space Jam", artist: "Quad City Djs", genre: "Pop", playlist_id: 3)