import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import Form from 'components/Form';

const PostEditor = React.createClass({
  handleEditSave() {
    const newBody = (this.refs.body.value || '').trim();
    if (newBody.length === 0) return;
    this.props.onEdit(newBody);
  },

  handleCancel(e) {
    e.preventDefault();
    this.props.onCancel();
  },

  render() {
    const {text} = this.props;

    return <Form className="post post-create" onSubmit={this.handleEditSave}>
      <div className="post-text">
        <textarea className="edit-post-body" ref="body" style={{height: 64}} defaultValue={text} />
        <div className="post-buttons">
          <button className="button" onClick={this.handleCancel}>Cancel</button> <button className="button">Save post (⌘↩)</button>
        </div>
      </div>
    </Form>;
  }
});

export default React.createClass({
  getInitialState() {
    return { isEditing: false };
  },

  handleDelete() {
    this.props.onDelete();
  },

  handleEditStart() {
    this.setState({isEditing: true});
  },

  handleEditCancel() {
    this.setState({isEditing: false});
  },

  handleEditSave(newBody) {
    this.props.onEdit(newBody);
    this.setState({isEditing: false});
  },

  render() {
    const {post, inFeed, showActions, onEdit, onDelete} = this.props;

    const userUrl = "/@" + post.user.login;
    const topicAddress = post.user.login + "/" + post.topic.repo.name + "/topics/" + post.topic.number;
    const topicUrl = "/@" + topicAddress;

    const rendered = marked(post.text, {gfm: true, sanitize: true});

    let actions;

    if (showActions && !this.state.isEditing) {
      actions = <div className="post-icons">
        <span className="icon icon-pencil-1 post-edit-button" title="Edit" onClick={this.handleEditStart} />
        <span className="icon icon-trash post-delete-button" title="Delete" onClick={this.handleDelete} />
      </div>
    }

    let text;

    if (!this.state.isEditing) {
      text = <div className="post-text" dangerouslySetInnerHTML={{__html: rendered}} />;
    } else {
      text = <PostEditor onCancel={this.handleEditCancel} onEdit={this.handleEditSave} text={post.text} />
    }

    const authorAddition = inFeed ?
      <span>in <Link className="post-url" to={topicUrl}>{topicAddress}</Link></span> :
      null;

    return <article className="post animated-item-view animated-item-view-end">
      <Link className="post-avatar-container" to={userUrl}>
        <img className="post-avatar avatar" src={post.user.avatar_url} />
      </Link>
      <div className="post-content">
        <div className="post-header">
          <Link className="post-autor" to={userUrl}>{post.user.login}</Link> {authorAddition}
          <time className="post-metadata post-date">
            {moment(new Date(post.created_at)).fromNow()}
          </time>
        </div>
        {actions}
        {text}
      </div>
    </article>
  }
});
