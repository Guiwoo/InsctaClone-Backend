import { gql } from "apollo-server-core";

export default gql`
  type loginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(userName: String!, password: String!): loginResult!
  }
`;
