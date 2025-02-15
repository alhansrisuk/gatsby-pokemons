const path = require('path');

const POKEMONS_QUANTITY = process.env.LIMITED ? 20 : 150;

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      pokeApi {
        pokemons(first: ${POKEMONS_QUANTITY}) {
          id
        }
      }
    }
  `);

  result.data.pokeApi.pokemons.forEach(({ id }) => {
    actions.createPage({
      path: id,
      component: path.resolve('./src/templates/pokemon.js'),
      context: {
        slug: id,
      },
    });
  });
};
