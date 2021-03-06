import { gql } from "apollo-server-core";

export default gql`
  type MutationResult {
    ok: Boolean!
    id: Int
    error: String
  }
`;
