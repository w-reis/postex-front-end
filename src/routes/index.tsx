import React from 'react';

import { Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Correspondences from '../pages/Correspondences';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/correspondences" component={Correspondences} />
    </Switch>
  );
};

export default Routes;
