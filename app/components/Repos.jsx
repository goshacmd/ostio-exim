import React from 'react';
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

  render() {
    const user = this.state && this.state.user;
    const repositories = this.state && this.state.repos;
    let repos;

    if (!user) return;

    if (!repositories || this.state.reposLoading) {
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
    return <div className="user-repo-list-container">
      <h4>
        Repositories <a className="icon icon-github" href={"https://github.com/" + user.login} />

        {repos}
      </h4>
    </div>;
  }
});
