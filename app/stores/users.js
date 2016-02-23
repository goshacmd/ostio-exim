import Exim from 'exim';

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
      return fetch('http://api.ost.io/v1/users/'+login).then(r => r.json());
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
      return fetch('http://api.ost.io/v1/users/').then(r => r.json());
    },
    did(data) {
      this.set('users', data);
    }
  }
})
