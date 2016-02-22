import React from 'react';
import moment from 'moment';
import topicsStore from 'stores/topics';

const TopicCard = ({ topic }) => {
  const url = "/@" + topic.repo.user.login + "/" + topic.repo.name + "/topics/" + topic.number;
  return <div className="repo-topic animated-view-item animated-view-item-end">
    <div className="repo-topic-header">
      <a href={url}>#{topic.number}</a> <a href={url}>{topic.title}</a>
    </div>
    by <a className="post-author" href={"/@" + topic.user.login}>{topic.user.login}</a> <time>{moment(topic.created_at).fromNow()}</time>
    <span className="post-metadata post-date">{topic.total_posts} posts</span>
  </div>
};

export default React.createClass({
  mixins: [
    topicsStore.connect('topicsLoading', 'topics')
  ],

  componentDidMount() {
    topicsStore.actions.fetchForUserRepo(this.props.params.login, this.props.params.repo);
  },

  render() {
    const topics = this.state && this.state.topics;
    if (!topics) return <div>Loading...</div>;

    let tops;

    if (this.state.topicsLoading) {
      tops = "Loading...";
    } else if (topics.length > 0) {
      tops = topics.map(topic => <TopicCard topic={topic} />);
    } else {
      tops = "No topics."
    }

    const ghUrl = `https://github.com/${this.props.params.login}/${this.props.params.repo}`;

    return <div className="repo-topic-list-container">
      <h4>
        Topics <a className="icon icon-github" href={ghUrl} />
      </h4>

      <div>
        {tops}
      </div>
    </div>;
  }
});
