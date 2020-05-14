import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { Burger, Menu } from "./components";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <div>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
      </ThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/account" component={AccountPage} />
          <Route path="/connect" component={MatchingInterface} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
