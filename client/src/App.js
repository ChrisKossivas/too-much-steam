import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import HomePage from './components/Homepage';
import GlobalStyles from './components/GlobalStyles';

function App() {

  // Fetch steam data on app to prop drill it to diffrerent files
  // consider using context
  // TEST FETCH
  const [dataTest, setDataTest] = useState()

    useEffect(() => {
      const fetchData = () => {

        fetch("/test")
        .then((res) => res.json())
        .then((data) => setDataTest(data))
      }
      fetchData()
    }, [])

    console.log(dataTest)

  return (
    <BrowserRouter>
      <GlobalStyles />
        <Main>
          <h1>
          hello
          </h1>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/profile">
            Profile page! Show user's steam info! 
          </Route>
          <Route exact path="/top10">
            top 10 of most liked games within the app. Display steam info with my own like counter data
          </Route>
          <Route exact path="/findfriends">
            Stretch goal! Show potential friends sorted by most liked games in common!
          </Route>
          <Route exact path="/messagefriend">
            Strech goal! Message friend kind of like facebook messager. Need to probably create it from scratch. Web Socket!
          </Route>
        </Switch>
        </Main>
    </BrowserRouter>
  );
}


const Main = styled.div`



`

export default App;
