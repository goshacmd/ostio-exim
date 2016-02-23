import React from 'react';
import usersStore from 'stores/users';

export default React.createClass({
  mixins: [
    usersStore.connect('currentUser')
  ],

  componentDidMount() {
    const {query} = this.props.location;
    const {accessToken, login} = query;
    const {history} = this.props;
    usersStore.actions.login(accessToken).then(() => {
      history.push('/@' + login);
    });
  },

  render() {
    return <div>Logging in...</div>;
  }
});
