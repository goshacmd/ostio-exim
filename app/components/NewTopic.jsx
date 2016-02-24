import React from 'react'
import topicsStore from 'stores/topics';

export default React.createClass({
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

