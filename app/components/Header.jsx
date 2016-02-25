import React from 'react';
import { Link } from 'react-router';
import { api } from 'config';
import usersStore from 'stores/users';
import Avatar from 'components/Avatar';

const HeaderLink = ({ to, children }) => {
  return <h4 className="header-link"><Link to={to}>{children}</Link></h4>;
};

export default React.createClass({
  mixins: [
    usersStore.connect('currentUser')
  ],

  getInitialState() { return {}; },

  logout() {
    usersStore.actions.logout();
  },

  render() {
    const {protocol, host} = window.location;
    const cbUrl = encodeURIComponent(protocol + '//' + host + '/auth-callback');
    const loginUrl = api.root + '/auth/github/?origin=' + cbUrl;

    const {currentUser} = this.state;

    let auth;

    if (currentUser) {
      auth = [
        <Link to={'/@' + currentUser.login}><Avatar className="header-avatar" url={currentUser.avatar_url} /></Link>,
        <Link to={'/@' + currentUser.login}>{currentUser.login}</Link>,
        <Link to="/settings" className="icon icon-cog" />,
        <a href="#" className="icon icon-logout" onClick={this.logout} />
      ]
    } else {
      auth = <a href={loginUrl} className="header-login-button button noscript">Login with GitHub</a>;
    }

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
            {auth}
          </div>
        </header>
      </div>
    );
  }
});
