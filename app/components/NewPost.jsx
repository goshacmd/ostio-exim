import React from 'react';
import {Link} from 'react-router';
import Form from 'components/Form';
import Avatar from 'components/Avatar';
import postsStore from 'stores/posts';

export default React.createClass({
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
      <Form className="post post-create" onSubmit={this.createPost}>
        <div className="post-avatar-container">
          <Avatar className="post-avatar" url={user.avatar_url} />
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
      </Form>
    </div>;
  }
});
