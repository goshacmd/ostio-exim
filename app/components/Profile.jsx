import React from 'react';
import Avatar from 'components/Avatar';
import usersStore from 'stores/users';

export default React.createClass({
  mixins: [
    usersStore.connect('userLoading', 'user'),
  ],

  componentDidMount() {
    usersStore.actions.findUser(this.props.params.login);
  },

  getInitialState() { return {}; },

  render() {
    const {user, userLoading} = this.state;
    if (!user || userLoading) return <div>Loading...</div>;


    const avatar = <a className="navigation-link" href={"/@" + user.login}><Avatar url={user.avatar_url} /></a>;
    const userLink = <a className="navigation-link" href={"/@" + user.login} data-type="login">{user.login}</a>

    let repoLink;

    if (this.props.params.repo) {
      repoLink = <a className="navigation-link" href={"/@" + user.login + "/" + this.props.params.repo} data-type="repo">{this.props.params.repo}</a>
    }

    return <div>
      <h2>
        {avatar} {userLink} {repoLink ? [' / ', repoLink] : null}
      </h2>

      {this.props.children}
    </div>;
  }
});
