import React from 'react';
import { createRoot } from 'react-dom/client';
import { EnvyPlayground } from './EnvyPlayground';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <EnvyPlayground />
  </React.StrictMode>
);
