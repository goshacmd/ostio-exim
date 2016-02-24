import React from 'react';
import Avatar from 'components/Avatar';
import usersStore from 'stores/users';
import reposStore from 'stores/repos';
import topicsStore from 'stores/topics';

const NewTopic = React.createClass({
  handleSubmit(e) {
    if (e) e.preventDefault();
    this.createTopic();
  },

  handleKeyDown(e) {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      this.handleSubmit();
    }
  },

  createTopic() {
    const title = (this.refs.title.value || '').trim();
    const body = (this.refs.body.value || '').trim();

    if (title.length === 0 || body.length === 0) return;

    const {user, repo, onDone} = this.props;

    topicsStore.actions.create(user, repo, title, body).then(() => onDone());
  },

  render() {
    return <form className="new-topic-form" ref="form" onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown}>
      <div className="new-topic-form-fields visible">
        <input ref="title" className="new-topic-form-title" type="text" placeholder="Title" />
        <textarea ref="body" className="new-topic-form-text" placeholder="Post body" />
        <div className="new-topic-form-submit-button-container form-submit-button-container">
          <button className="button">Submit new topic (⌘↩)</button>
        </div>
      </div>
    </form>;
  }
});

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
    topicsStore.actions.fetchForUserRepo(user, repo).then(() => this.setState({newTopic: false}));
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
