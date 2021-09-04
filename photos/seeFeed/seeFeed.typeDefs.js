import { gql } from "apollo-server-core";

export default gql`
  type Query {
    seeFeed(offSet: Int!): [Photo]
  }
`;
