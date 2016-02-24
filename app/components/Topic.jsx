import React from 'react';
import usersStore from 'stores/users';
import topicsStore from 'stores/topics';
import postsStore from 'stores/posts';
import PostCard from 'components/PostCard';

const NewPost = React.createClass({
  handleSubmit(e) {
    if (e) e.preventDefault();
    this.createPost();
  },

  handleKeyDown(e) {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      this.handleSubmit();
    }
  },

  createPost() {
    const body = (this.refs.body.value || '').trim();
    if (body.length === 0) return;

    const {user, repo, topic, onDone} = this.props;

    postsStore.actions.post(user.login, repo, topic, body).then(() => {
      this.refs.body.value = '';
      onDone();
    });
  },

  render() {
    const {user} = this.props;

    return <div className="new-post-form-container">
      <form className="post post-create" onSubmit={this.handleSubmit} onKeyDown={this.handleKeyDown}>
        <div className="post-avatar-container">
          <img className="post-avatar avatar" src={user.avatar_url} />
        </div>

        <div className="post-content">
          <div className="post-header">
            <a className="post-author" href={'/@' + user.login}>{user.login}</a>
            <em className="post-metadata">
              Posts are parsed with <a href="http://github.github.com/github-flavored-markdown/" target="_blank">Markdown</a>
            </em>
          </div>
          <div className="post-text">
            <textarea ref="body" className="new-post-body" />
            <div className="post-buttons">
              <button className="button">Comment on this topic (⌘↩)</button>
            </div>
          </div>
        </div>
      </form>
    </div>;
  }
});

export default React.createClass({
  mixins: [
    usersStore.connect('currentUser'),
    topicsStore.connect('topics'),
    postsStore.connect('postsStore', 'posts')
  ],

  componentDidMount() {
    topicsStore.actions.fetchForUserRepo(this.props.params.login, this.props.params.repo);
    postsStore.actions.fetchForUserRepoTopic(this.props.params.login, this.props.params.repo, this.props.params.topic);
  },

  getInitialState() { return {}; },

  posted() {
    postsStore.actions.fetchForUserRepoTopic(this.props.params.login, this.props.params.repo, this.props.params.topic);
  },

  render() {
    const topics = this.state.topics;
    const posts = this.state.posts;
    const topic = topics && topics.find(topic => topic.number == this.props.params.topic);

    if (!topic) return <div>Loading...</div>;

    let tops;

    if (!posts || this.state.postsLoading) {
      tops = "Loading...";
    } else if (posts.length > 0) {
      tops = posts.map(post => <PostCard post={post} />);
    } else {
      tops = "No posts."
    }
    return <div className="topic-posts-container">
      <h3>{topic.title}</h3>

      <div className="topic-posts">
        <div className="posts">
          {tops}
        </div>
        {this.state.currentUser ? <NewPost user={this.state.currentUser} repo={this.props.params.repo} topic={this.props.params.topic} onDone={this.posted} /> : null}
      </div>
    </div>;
  }
});
