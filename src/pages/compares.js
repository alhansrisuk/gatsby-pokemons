import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'unistore/react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

import CompareStat, { CELL_WIDTH } from '../components/CompareStat';
import EmptyState from '../components/EmptyCompares';
import { adapt } from '../utils/format';
import SEO from '../components/Seo';

const query = graphql`
  query {
    pokeApi {
      pokemons(first: 150) {
        id
        name
        number
        image
        classification
        fleeRate
        maxCP
        maxHP
        height {
          minimum
          maximum
        }

        weight {
          minimum
          maximum
        }

        ...AttacksDifference
      }
    }
  }
`;

const Wrapper = styled.div`
  max-height: calc(100vh - 133px);
`;

const ScrollableWrapper = styled.table`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  overflow-y: hidden;
  max-height: calc(100vh - 133px);
`;

const Inner = styled.tbody`
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
`;

const Image = styled.img`
  max-width: 50px;
  max-height: 50px;
  height: auto;
  width: auto;
`;

const Head = styled.thead`
  display: flex;
`;

const HeadCard = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: ${CELL_WIDTH}px;
  max-width: ${CELL_WIDTH}px;
  height: 80px;
  color: #000;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h2`
  padding: 16px 16px 12px;
`;

const Compares = ({ compare }) => {
  const data = useStaticQuery(query);
  const pokemons = data.pokeApi.pokemons.filter(({ id }) => compare.includes(id));
  const formatteds = pokemons.map(p => Object.assign(adapt(p), { name: p.name }));

  if (pokemons.length === 0) {
    return (
      <>
        <Title>Compare pokemons</Title>
        <EmptyState />
      </>
    );
  }

  return (
    <Wrapper>
      <SEO title="Compare pokemons" />
      <Title>Compare pokemons</Title>
      <ScrollableWrapper>
        <Head>
          <tr>
            {pokemons.map(p => (
              <td>
                <HeadCard key={p.name} to={`/${p.id}`}>
                  <div>
                    <Image src={p.image} alt={p.name} />
                  </div>
                  <p>{p.name}</p>
                </HeadCard>
              </td>
            ))}
          </tr>
        </Head>
        <Inner style={{ width: pokemons.length * CELL_WIDTH }}>
          <CompareStat stats={formatteds} title="Height" objKey="height" />
          <CompareStat stats={formatteds} title="Weight" objKey="weight" />
          <CompareStat stats={formatteds} title="Damage" objKey="damage" />
          <CompareStat stats={formatteds} title="Flee Rate" objKey="fleeRate" />
          <CompareStat stats={formatteds} title="Max CP" objKey="maxCP" />
          <CompareStat stats={formatteds} title="Max HP" objKey="maxHP" />
          <CompareStat stats={formatteds} title="Classification" objKey="classification" />
        </Inner>
      </ScrollableWrapper>
    </Wrapper>
  );
};

Compares.propTypes = {
  compare: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const enhance = connect('compare');

export default enhance(Compares);
