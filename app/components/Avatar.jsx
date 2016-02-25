import React from 'react';

export default ({ url }) => {
  if (!url) url = "https://a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-140.png";
  return <img className="avatar" src={url} />;
};
