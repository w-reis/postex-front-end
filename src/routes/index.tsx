import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Correspondences from '../pages/Correspondences';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/correspondences" component={Correspondences} isPrivate />
    </Switch>
  );
};

export default Routes;
