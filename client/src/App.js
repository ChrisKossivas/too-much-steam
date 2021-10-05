import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import HomePage from './components/Homepage';
import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import Profile from './components/Profile';
import FindFriends from './components/FindFriends';
import Chat from './components/Chat'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
        <Main>
          <Header />
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/top10">
            top 10 of most liked games within the app.
          </Route>
          <Route exact path="/findfriends">
            <FindFriends />
          </Route>
          <Route exact path="/messagefriend">
            Strech goal!
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
        </Switch>
        </Main>
    </BrowserRouter>
  );
}


const Main = styled.div`



`

export default App;
