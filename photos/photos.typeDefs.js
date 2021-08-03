import { gql } from "apollo-server-core";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String!
    likes: Int!
    comments: Int!
    hashtag: [Hashtag]
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
