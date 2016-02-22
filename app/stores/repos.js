import Exim from 'exim';

export default Exim.createStore({
  actions: [
    'fetchForUser'
  ],

  initial: {
    user: null,
  },

  fetchForUser: {
    while(reposLoading) {
      this.set({reposLoading});
    },
    on(login) {
      this.set('repos', null);
      return fetch('http://api.ost.io/v1/users/'+login+'/repos').then(r => r.json());
    },
    did(data) {
      this.set('repos', data);
    }
  }
})
