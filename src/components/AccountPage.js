import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Calendar, Connections, Profile } from '.';

function AccountPage(props) {
  return (
    <div>
      <div>
        This is the account dashboard. Things will render here Someday There's a
        subrouter that changes the account content based on the url
      </div>
      <Router>
        <Route path="/account/calendar" component={Calendar} />
        <Route path="/account/connections" component={Connections} />
        <Route path="/account/profile" component={Profile} />
      </Router>
    </div>
  );
}

export default AccountPage;
