import React from 'react';
import {Link} from 'react-router';
import Button from 'components/Button';
import Avatar from 'components/Avatar';
import Spinner from 'components/Spinner';
import NewTopic from 'components/NewTopic';
import usersStore from 'stores/users';
import reposStore from 'stores/repos';
import topicsStore from 'stores/topics';

const Navigation = ({ user, repo, topic }) => {
  const avatar = <Link className="navigation-link" to={"/@" + user.login}><Avatar url={user.avatar_url} /></Link>;
  const userLink = <Link className="navigation-link" to={"/@" + user.login} data-type="login">{user.login}</Link>;

  let repoLink, topicLink;

  if (repo) {
    repoLink = <Link className="navigation-link" to={"/@" + user.login + "/" + repo} data-type="repo">{repo}</Link>
  }

  if (repo && topic) {
    topicLink = <Link className="navigation-link" to={"/@" + user.login + "/" + repo + "/topics/" + topic} data-type="topic">#{topic}</Link>
  }

  return <span>{avatar} {userLink} {repoLink ? [' / ', repoLink] : null} {topicLink ? [' / ', topicLink] : null}</span>
};

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

  actionButton() {
    const {user, currentUser} = this.state;
    const {params} = this.props;

    let button;

    if (currentUser) {
      if (!params.repo && !params.topic && currentUser.login === user.login) {
        button = ['Sync GitHub repos', this.syncRepos];
      } else if (params.repo && !params.topic) {
        button = ['Create new topic', this.createNewTopic];
      }
    }

    button = button ? <Button onClick={button[1]}>{button[0]}</Button> : null;
    let buttonContainer = button ? <div className="button-container">{button}</div> : null;

    return buttonContainer;
  },

  render() {
    const {user, userLoading, currentUser} = this.state;
    const {params} = this.props;
    if (!user || userLoading) return <Spinner />;

    return <div>
      <div className="user-nav">
        <h2>
          <Navigation user={user} repo={params.repo} topic={params.topic} />
        </h2>
        {this.actionButton()}
      </div>

      {this.state.newTopic ? <NewTopic user={params.login} repo={params.repo} onDone={this.topicCreated} /> : null}
      {this.props.children}
    </div>;
  }
});
