import React from 'react';
import {Link} from 'react-router';
import postsStore from 'stores/posts';

export default React.createClass({
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
            <Link className="post-author" to={'/@' + user.login}>{user.login}</Link>
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
