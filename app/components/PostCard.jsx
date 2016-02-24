import {Link} from 'react-router';
import moment from 'moment';

export default ({ post, inFeed }) => {
  const userUrl = "/@" + post.user.login;
  const topicAddress = post.user.login + "/" + post.topic.repo.name + "/topics/" + post.topic.number;
  const topicUrl = "/@" + topicAddress;

  const rendered = marked(post.text, {gfm: true, sanitize: true});

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
      <div className="post-text" dangerouslySetInnerHTML={{__html: rendered}}>
      </div>
    </div>
  </article>
};
