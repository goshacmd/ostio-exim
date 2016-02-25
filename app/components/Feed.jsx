import React from 'react';
import {Link} from 'react-router';
import PostCard from 'components/PostCard';
import Avatar from 'components/Avatar';
import Spinner from 'components/Spinner';
import postsStore from 'stores/posts';
import usersStore from 'stores/users';

const UserCard = ({ user }) => {
  return <span className="user animated-item-view animated-item-view-end">
    <Link className="user-organization organization" to={'/@' + user.login} title={user.login}>
      <Avatar url={user.avatar_url} />
    </Link>
  </span>;
};

export default React.createClass({
  mixins: [
    postsStore.connect('postsLoading', 'posts'),
    usersStore.connect('usersLoading', 'users')
  ],

  componentDidMount() {
    postsStore.actions.fetchLatest();
    usersStore.actions.fetchLatest();
  },

  getInitialState() { return {}; },

  render() {
    let posts, users;

    if (!this.state.posts || this.state.postsLoading) {
      posts = <Spinner />;
    } else if (this.state.posts.length > 0) {
      posts = this.state.posts.map(post => <PostCard post={post} inFeed={true} />)
    } else {
      posts = "No posts.";
    }

    if (!this.state.users || this.state.usersLoading) {
      users = <Spinner />;
    } else if (this.state.users.length > 0) {
      users = this.state.users.map(user => <UserCard user={user} />);
    } else {
      users = "No users.";
    }

    return (
      <div>
        <div className="user-list-container">
          <h4>Latest users</h4>

          <div className="users">
            {users}
          </div>
        </div>
        <div className="post-list-container">
          <h4>Latest posts</h4>

          <div className="topic-posts">
            {posts}
          </div>
        </div>
      </div>
    );
  }
});
