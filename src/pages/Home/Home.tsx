import React from 'react';
import NewBooks from '../../components/NewBook/NewBook';
import { StyledHome, } from './HomeStyles';

const Url = "/";

const Home = () => {
  return (
    <StyledHome>
      <NewBooks />
    </StyledHome>
  );
};


Home.URL = Url;
export default Home;
