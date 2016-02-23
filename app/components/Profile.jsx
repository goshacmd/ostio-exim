import React from 'react';
import Avatar from 'components/Avatar';
import usersStore from 'stores/users';
import reposStore from 'stores/repos';

export default React.createClass({
  mixins: [
    usersStore.connect('userLoading', 'user', 'currentUser'),
  ],

  componentDidMount() {
    usersStore.actions.findUser(this.props.params.login);
  },

  getInitialState() { return {}; },

  syncRepos() {
    usersStore.actions.syncRepos().then(() => {
      reposStore.actions.fetchForUser(this.state.user.login);
    });
  },

  render() {
    const {user, userLoading, currentUser} = this.state;
    const {params} = this.props;
    if (!user || userLoading) return <div>Loading...</div>;

    const avatar = <a className="navigation-link" href={"/@" + user.login}><Avatar url={user.avatar_url} /></a>;
    const userLink = <a className="navigation-link" href={"/@" + user.login} data-type="login">{user.login}</a>

    let repoLink, topicLink;

    if (params.repo) {
      repoLink = <a className="navigation-link" href={"/@" + user.login + "/" + params.repo} data-type="repo">{params.repo}</a>
    }

    if (params.repo && params.topic) {
      topicLink = <a className="navigation-link" href={"/@" + user.login + "/" + params.repo + "/topics/" + params.topic} data-type="topic">#{params.topic}</a>
    }

    let button;

    if (currentUser) {
      if (!params.repo && !params.topic && currentUser.login === user.login) {
        button = ['Sync GitHub repos', this.syncRepos];
      } else if (params.repo && !params.topic) {
        button = ['Create new topic', null];
      }
    }

    button = button ? <button className="button" onClick={button[1]}>{button[0]}</button> : null;

    let buttonContainer = button ? <div className="button-container">{button}</div> : null;

    return <div>
      <div className="user-nav">
        <h2>
          {avatar} {userLink} {repoLink ? [' / ', repoLink] : null} {topicLink ? [' / ', topicLink] : null}
        </h2>
        {buttonContainer}
      </div>

      {this.props.children}
    </div>;
  }
});
