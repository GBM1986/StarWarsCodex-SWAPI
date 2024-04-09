import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import "./App.css";
import "./Modal.css"; // Import Modal CSS
import Modal from "./Modal"; // Import Modal component

function App() {
  const baseUrl = `https://swapi-graphql.netlify.app/.netlify/functions/index`;

  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: result,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["exampleQuery"],
    queryFn: async () =>
      request(baseUrl, gql`
        query ExampleQuery {
          allFilms {
            films {
              title
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
      `),
  });

  if (isLoading) {
    return <span>Loading......</span>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const films = result.allFilms.films;

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const uniqueCharacters = new Set();

  const filteredCharacters = films
  .flatMap((film) => film.characterConnection.characters)
  .filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((character) => {
    if (!uniqueCharacters.has(character.name)) {
      uniqueCharacters.add(character.name);
      return true;
    }
    return false;
  });

  return (
    <>
      <h1>Star Wars</h1>
      <input
  type="text"
  placeholder="Search characters..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

{filteredCharacters.length > 0 && searchQuery && (
  <ul className="character-list">
    {filteredCharacters.map((character, index) => (
      <li
        key={index}
        onClick={() => handleCharacterClick(character)}
        className="character-link"
      >
        <h4>{character.name}</h4>
      </li>
    ))}
  </ul>
)}

{filteredCharacters.length === 0 && searchQuery && (
  <p>No characters found</p>
)}
      {films.map((film, filmIndex) => (
        <div key={filmIndex}>
          <h2>{film.title}</h2>
          <h3>{film.director}</h3>
          <ul style={{ display: "grid" }}>
            {film.characterConnection.characters.map(
              (character, characterIndex) => (
                <li
                  key={characterIndex}
                  onClick={() => handleCharacterClick(character)}
                  className="character-link"
                >
                  <h4>{character.name}</h4>
                </li>
              )
            )}
          </ul>
        </div>
      ))}
      


      {selectedCharacter && (
        <Modal onClose={() => setSelectedCharacter(null)}>
          <h2>{selectedCharacter.name}</h2>
          <p>Birth Year: {selectedCharacter.birthYear}</p>
          <p>Eye Color: {selectedCharacter.eyeColor}</p>
          <p>Gender: {selectedCharacter.gender}</p>
          <p>Homeworld: {selectedCharacter.homeworld.name}</p>
          <p>Hair Color: {selectedCharacter.hairColor}</p>
          <p>Height: {selectedCharacter.height}</p>
          <p>Skin Color: {selectedCharacter.skinColor}</p>
          <p>Mass: {selectedCharacter.mass}</p>
          <p>Species: {selectedCharacter.species?.name}</p>
          <p>
            Average Height: {selectedCharacter.species?.averageHeight}
          </p>
          <p>
            Average Lifespan: {selectedCharacter.species?.averageLifespan}
          </p>
          <p>
            Classification: {selectedCharacter.species?.classification}
          </p>
          <p>Language: {selectedCharacter.species?.language}</p>
          <p>Skin Colors: {selectedCharacter.species?.skinColors}</p>
        </Modal>
      )}
    </>
  );
}

export default App;
