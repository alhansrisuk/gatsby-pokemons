import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Text = styled.p`
  margin-top: 2px;
  display: flex;
`;

const Dots = styled.div`
  flex: 1;
  height: 18px;
  margin: 0 4px;
  margin-top: -6px;
  border-bottom: 2px dotted #000;
`;

const Stat = ({ title, value }) => (
  <Wrapper>
    <Text>{title}</Text>
    <Dots />
    <Text>{value}</Text>
  </Wrapper>
);

Stat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Stat;
