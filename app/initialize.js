import { render } from 'react-dom';
import React from 'react';
import Routes from 'routes';

document.addEventListener('DOMContentLoaded', () => {
  render(Routes, document.getElementById('app'));
});
