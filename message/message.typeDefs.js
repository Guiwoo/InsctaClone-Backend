import { gql } from "apollo-server-core";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    unreadTotal: Int!
    user: [User]
    message: [Message]
    createdAt: String!
    updatedAt: String!
  }
`;
