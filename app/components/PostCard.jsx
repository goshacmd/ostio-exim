import moment from 'moment';

export default ({ post, inFeed }) => {
  const userUrl = "/@" + post.user.login;
  const topicAddress = post.user.login + "/" + post.topic.repo.name + "/topics/" + post.topic.number;
  const topicUrl = "/@" + topicAddress;

  const rendered = marked(post.text, {gfm: true, sanitize: true});

  const authorAddition = inFeed ?
    <span>in <a className="post-url" href={topicUrl}>{topicAddress}</a></span> :
    null;

  return <article className="post animated-item-view animated-item-view-end">
    <a className="post-avatar-container" href={userUrl}>
      <img className="post-avatar avatar" src={post.user.avatar_url} />
    </a>
    <div className="post-content">
      <div className="post-header">
        <a className="post-autor" href={userUrl}>{post.user.login}</a> {authorAddition}
        <time className="post-metadata post-date">
          {moment(new Date(post.created_at)).fromNow()}
        </time>
      </div>
      <div className="post-text" dangerouslySetInnerHTML={{__html: rendered}}>
      </div>
    </div>
  </article>
};
