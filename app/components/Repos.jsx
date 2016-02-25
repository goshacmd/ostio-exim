import React from 'react';
import {Link} from 'react-router';
import Avatar from 'components/Avatar';
import Spinner from 'components/Spinner';
import usersStore from 'stores/users';
import reposStore from 'stores/repos';

export default React.createClass({
  mixins: [
    reposStore.connect('reposLoading', 'repos'),
    usersStore.connect('user')
  ],

  componentDidMount() {
    reposStore.actions.fetchForUser(this.props.params.login);
  },

  getInitialState() { return {}; },

  render() {
    const user = this.state.user
    const repositories = this.state.repos;
    let repos;

    if (!user) return <Spinner />;

    if (!repositories || this.state.reposLoading) {
      repos = <Spinner />;
    } else if (repositories.length > 0) {
      repos = repositories.map(repo => {
        return <li className="user-repo animated-item-view animated-item-view-end">
          <Link to={"/@" + user.login + "/" + repo.name}>{repo.name}</Link>
        </li>
      });

      repos = <ul className="user-repo-list">{repos}</ul>;
    } else {
      repos = "No repositories.";
    }

    const userList = (user.type === 'Organization' ? user.owners : user.organizations).map(item => {
      return <span className="user animated-item-view animated-item-view-end">
        <Link to={"/@" + item.login} title={item.login} className="user-organization organization">
          <Avatar url={item.avatar_url} />
        </Link>
      </span>
    });
    return <div>
      <div className="user-organization-list-container">
        <div className="users">
          <h4>{user.type === 'Organization' ? 'Owners' : 'Organizations'}</h4>

          <div className="users-list">{userList}</div>
        </div>
      </div>
      <div className="user-repo-list-container">
        <h4>
          Repositories <a className="icon icon-github" href={"https://github.com/" + user.login} />

          {repos}
        </h4>
      </div>
    </div>;
  }
});
