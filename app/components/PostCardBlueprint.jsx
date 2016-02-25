import React from 'react';
import {Link} from 'react-router';
import Avatar from 'components/Avatar';

export default React.createClass({
  render() {
    const {user, authorAddition, metadata, children} = this.props;

    const userUrl = '/@' + user.login;

    return <article className="post">
      <Link className="post-avatar-container" to={userUrl}>
        <Avatar className="post-avatar" url={user.avatar_url} />
      </Link>
      <div className="post-content">
        <div className="post-header">
          <Link className="post-author" to={userUrl}>{user.login}</Link> {authorAddition}
          <span className="post-metadata" dangerouslySetInnerHTML={{__html: metadata}} />
        </div>
        {children}
      </div>
    </article>
  }
});
