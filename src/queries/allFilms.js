import { gql } from "graphql-request";

export const ExampleQuery = gql`
  query ExampleQuery($nodeId: ID!) {
    node(id: $nodeId) {
      id
    }
    allFilms {
      films {
        director
        characterConnection {
          characters {
            birthYear
            eyeColor
            gender
            hairColor
            height
            homeworld {
              name
            }
            skinColor
            mass
            name
            species {
              averageHeight
              averageLifespan
              classification
              language
              name
              skinColors
            }
          }
        }
      }
    }
  }
`;
