import React from 'react';
import { Link } from 'react-router';

const HeaderLink = ({ to, children }) => {
  return <h4 className="header-link"><Link to={to}>{children}</Link></h4>;
};

export default () => {
  return (
    <div className="header-container" id="header-container">
      <header id="header" className="header">
        <h1 className="header-logo">
          <Link to="/">Ost.io</Link>
        </h1>

        <div className="header-links">
          <HeaderLink to="/feed">Feed</HeaderLink>
          <HeaderLink to="/search">Search</HeaderLink>
        </div>

        <div className="header-auth">
          <a href="#" className="header-login-button button noscript">Login with GitHub</a>
        </div>
      </header>
    </div>
  );
};
