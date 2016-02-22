import React from 'react';
import usersStore from 'stores/users';
import reposStore from 'stores/repos';

export default React.createClass({
  mixins: [
    usersStore.connect('userLoading', 'user'),
    reposStore.connect('reposLoading', 'repos')
  ],

  componentDidMount() {
    usersStore.actions.findUser(this.props.params.login);
    reposStore.actions.fetchForUser(this.props.params.login);
  },

  render() {
    const user = this.state && this.state.user;
    if (!user || this.state.userLoading) return <div>Loading...</div>;

    const repositories = this.state.repos;
    let repos;
    console.log(repositories);

    if (this.state.reposLoading) {
      repos = "Loading...";
    } else if (repositories.length > 0) {
      repos = repositories.map(repo => {
        return <li className="user-repo animated-item-view animated-item-view-end">
          <a href={"/@" + user.login + "/" + repo.name}>{repo.name}</a>
        </li>
      });

      repos = <ul className="user-repo-list">{repos}</ul>;
    } else {
      repos = "No repositories.";
    }

    return <div>
      <h2>
        <a className="navigation-link" href={"/@" + user.login}><img className="avatar" src={user.avatar_url} /></a> <a className="navigation-link" href={"/@" + user.login} data-type="login">{user.login}</a>
      </h2>

      <div className="user-repo-list-container">
        <h4>
          Repositories <a className="icon icon-github" href={"https://github.com/" + user.login} />

          {repos}
        </h4>
      </div>
    </div>;
  }
});
