import React from 'react';
import {Link} from 'react-router';
import Avatar from 'components/Avatar';
import NewTopic from 'components/NewTopic';
import usersStore from 'stores/users';
import reposStore from 'stores/repos';
import topicsStore from 'stores/topics';

export default React.createClass({
  mixins: [
    usersStore.connect('userLoading', 'user', 'currentUser'),
  ],

  componentDidMount() {
    usersStore.actions.findUser(this.props.params.login);
  },

  getInitialState() { return {}; },

  componentWillReceiveProps() {
    this.setState({newTopic: false});
  },

  syncRepos() {
    usersStore.actions.syncRepos().then(() => {
      reposStore.actions.fetchForUser(this.state.user.login);
    });
  },

  createNewTopic() {
    this.setState({newTopic: true});
  },

  topicCreated() {
    topicsStore.actions.fetchForUserRepo(this.props.params.login, this.props.params.repo).then(() => this.setState({newTopic: false}));
  },

  render() {
    const {user, userLoading, currentUser} = this.state;
    const {params} = this.props;
    if (!user || userLoading) return <div>Loading...</div>;

    const avatar = <Link className="navigation-link" to={"/@" + user.login}><Avatar url={user.avatar_url} /></Link>;
    const userLink = <Link className="navigation-link" to={"/@" + user.login} data-type="login">{user.login}</Link>;

    let repoLink, topicLink;

    if (params.repo) {
      repoLink = <Link className="navigation-link" to={"/@" + user.login + "/" + params.repo} data-type="repo">{params.repo}</Link>
    }

    if (params.repo && params.topic) {
      topicLink = <Link className="navigation-link" to={"/@" + user.login + "/" + params.repo + "/topics/" + params.topic} data-type="topic">#{params.topic}</Link>
    }

    let button;

    if (currentUser) {
      if (!params.repo && !params.topic && currentUser.login === user.login) {
        button = ['Sync GitHub repos', this.syncRepos];
      } else if (params.repo && !params.topic) {
        button = ['Create new topic', this.createNewTopic];
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

      {this.state.newTopic ? <NewTopic user={params.login} repo={params.repo} onDone={this.topicCreated} /> : null}
      {this.props.children}
    </div>;
  }
});
