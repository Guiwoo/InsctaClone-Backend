import { gql } from "apollo-server-core";

export default gql`
  type Subscription {
    roomUpdate(id: Int!): Message
  }
`;
