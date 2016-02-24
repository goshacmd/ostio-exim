import React from 'react';
import usersStore from 'stores/users';
import topicsStore from 'stores/topics';
import postsStore from 'stores/posts';
import PostCard from 'components/PostCard';
import NewPost from 'components/NewPost';

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
