import React from 'react';
import { Auth } from '.';

function LandingPage(props) {
  return (
    <div id="landing-page">
      <h1>This is the landing page for unauthenticated users</h1>
      <Auth />
    </div>
  );
}

export default LandingPage;
