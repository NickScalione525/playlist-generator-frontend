class Playlist < ApplicationRecord
    has_many :songs
    

    # include ActiveModel::Serializers::JSON
    



    # def attributes
    #     {"name" => nil, "id" => nil}
    # end
end
