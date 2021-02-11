import React from 'react';
import Routes from './Routes';
import {AuthProviders} from './AuthProviders';

export default function Providers() {
  return (
    <AuthProviders>
      <Routes />
    </AuthProviders>
  );
}
