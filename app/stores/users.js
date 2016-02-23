import Exim from 'exim';
import request from 'lib/request';

export default Exim.createStore({
  actions: [
    'findUser',
    'fetchLatest'
  ],

  initial: {
    user: null,
    users: null
  },

  findUser: {
    while(userLoading) {
      this.set({userLoading});
    },
    on(login) {
      this.set('user', null);
      return request.get('/users/'+login);
    },
    did(data) {
      this.set('user', data);
    }
  },

  fetchLatest: {
    while(usersLoading) {
      this.set({usersLoading});
    },
    on() {
      this.set('users', null);
      return request.get('/users/');
    },
    did(data) {
      this.set('users', data);
    }
  }
})
