import { gql } from "apollo-server-core";

export default gql`
  type Movie {
    id: Int!
    title: String!
    genre: String
    createAt: String!
    updateAt: String!
    year: Int!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, year: Int!): Movie
  }
`;
