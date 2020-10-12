import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Correspondences from '../pages/Correspondences';
import CorrespondenceForm from '../pages/CorrespondenceForm';
import UserForm from '../pages/UsersForm';
import Users from '../pages/Users';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route
        path="/correspondences"
        exact
        component={Correspondences}
        isPrivate
      />
      <Route
        path="/correspondences/create"
        component={CorrespondenceForm}
        isPrivate
      />

      <Route
        path="/correspondences/edit"
        component={CorrespondenceForm}
        isPrivate
      />

      <Route path="/users" exact component={Users} isPrivate />

      <Route path="/users/edit" component={UserForm} isPrivate />

      <Route path="/users/create" component={UserForm} isPrivate />
    </Switch>
  );
};

export default Routes;
