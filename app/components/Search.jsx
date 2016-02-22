import React from 'react';
import moment from 'moment';
import postsStore from 'stores/posts';

const PostCard = ({ post }) => {
  const userUrl = "/@" + post.user.login;
  const topicAddress = post.user.login + "/" + post.topic.repo.name + "/topics/" + post.topic.id;
  const topicUrl = "/@" + topicAddress;

  const rendered = marked(post.text, {gfm: true});

  return <article className="post animated-item-view animated-item-view-end">
    <a className="post-avatar-container" href={userUrl}>
      <img className="post-avatar avatar" src={post.user.avatar_url} />
    </a>
    <div className="post-content">
      <div className="post-header">
        <a className="post-autor" href={userUrl}>{post.user.login}</a> in <a className="post-url" href={topicUrl}>{topicAddress}</a>
        <time className="post-metadata post-date">
          {moment(new Date(post.created_at)).fromNow()}
        </time>
      </div>
      <div className="post-text" dangerouslySetInnerHTML={{__html: rendered}}>
      </div>
    </div>
  </article>
};

export default React.createClass({
  mixins: [postsStore.connect('postsLoading', 'posts')],

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const query = e.target.value;
      this.setState({query});
      postsStore.actions.search(query);
    }
  },

  render() {
    let searchResults;

    if (this.state.query) {
      let posts;

      if (this.state.postsLoading) {
        posts = "Loading...";
      } else if (this.state.posts) {
        posts = this.state.posts.map(post => <PostCard post={post} />);
      }
      searchResults = <div className="post-list-container">
        <h4>Posts matching query "{this.state.query}"</h4>
        <div className="topic-posts">
          <div className="posts">{posts}</div>
        </div>
      </div>;
    }

    return (
      <div>
        <div className="search-banner">
          <h2>Post search</h2>
          <input className="search-input" type="search" onKeyPress={this.handleKeyPress} />
        </div>
        {searchResults}
      </div>
    );
  }
});
