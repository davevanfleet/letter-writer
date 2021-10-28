import { Route, Switch, useRouteMatch } from 'react-router';
import DNCUpload from './DNCUpload';
import React from 'react';
import SubNav from '../menuComponents/SubNav';
import UploadContacts from './UploadContacts';

const UploaderRoot = (): JSX.Element => {
  const match = useRouteMatch();
  return (
    <>
      <SubNav page="upload" />
      <Switch>
        <Route path={`${match.path}/dncs`} component={DNCUpload} />
        <Route path={`${match.path}/contacts`} component={UploadContacts} />
      </Switch>
    </>
  );
};

export default UploaderRoot;
