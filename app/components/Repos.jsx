import React from 'react';
import {Link} from 'react-router';
import Avatar from 'components/Avatar';
import Spinner from 'components/Spinner';
import usersStore from 'stores/users';
import reposStore from 'stores/repos';

const RepoCard = ({ user, repo }) => {
  return <li className="user-repo animated-item-view animated-item-view-end">
    <Link to={"/@" + user.login + "/" + repo.name}>{repo.name}</Link>
  </li>
};

const OrgCard = ({ item }) => {
  return <span className="user animated-item-view animated-item-view-end">
    <Link to={"/@" + item.login} title={item.login} className="user-organization organization">
      <Avatar url={item.avatar_url} />
    </Link>
  </span>;
};

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
      repos = repositories.map(repo => <RepoCard user={user} repo={repo} />);
      repos = <ul className="user-repo-list">{repos}</ul>;
    } else {
      repos = "No repositories.";
    }

    const isOrg = user.type === 'Organization';
    const orgItems = isOrg ? user.owners : user.organizations;

    let orgListing;

    if (orgItems.length > 0) {
      const userList = orgItems.map(item => <OrgCard item={item} />);

      orgListing = <div className="user-organization-list-container">
        <div className="users">
          <h4>{isOrg ? 'Owners' : 'Organizations'}</h4>

          <div className="users-list">{userList}</div>
        </div>
      </div>;
    }

    return <div>
      {orgListing}

      <div className="user-repo-list-container">
        <h4>
          Repositories <a className="icon icon-github" href={"https://github.com/" + user.login} />
        </h4>

        {repos}
      </div>
    </div>;
  }
});
