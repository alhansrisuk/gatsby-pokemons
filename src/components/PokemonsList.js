import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Pokemon, { CardPlaceholder, pokeCartPropTypes } from './PokemonCard';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const placeholdersArray = new Array(4).fill().map((_, i) => i + 1234);

const PokemonsList = ({ pokemons, EmptyState }) => {
  if (pokemons.length === 0) {
    return (
      <Wrapper>
        <EmptyState />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {pokemons.map(pokemon => (
        <Pokemon data={pokemon} />
      ))}
      {placeholdersArray.map(i => (
        <CardPlaceholder key={i} />
      ))}
    </Wrapper>
  );
};

PokemonsList.propTypes = {
  pokemons: PropTypes.arrayOf(pokeCartPropTypes).isRequired,
  EmptyState: PropTypes.node,
};

PokemonsList.defaultProps = {
  EmptyState: React.Fragment,
};

export default PokemonsList;
