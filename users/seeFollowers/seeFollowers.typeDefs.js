import { gql } from "apollo-server-core";

export default gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    total
  } 
  type Query {
    seeFollowers(userName: String!, page: Int!): SeeFollowersResult!
  }
`;
