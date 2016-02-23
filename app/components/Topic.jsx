import React from 'react';
import topicsStore from 'stores/topics';
import postsStore from 'stores/posts';
import PostCard from 'components/PostCard';

export default React.createClass({
  mixins: [
    topicsStore.connect('topics'),
    postsStore.connect('postsStore', 'posts')
  ],

  componentDidMount() {
    topicsStore.actions.fetchForUserRepo(this.props.params.login, this.props.params.repo);
    postsStore.actions.fetchForUserRepoTopic(this.props.params.login, this.props.params.repo, this.props.params.topic);
  },

  getInitialState() { return {}; },

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
        <div className="topics">
          {tops}
        </div>
      </div>
    </div>;
  }
});
