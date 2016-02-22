import Exim from 'exim';

export default Exim.createStore({
  actions: [
    'findUser'
  ],

  initial: {
    user: null,
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
  }
})
