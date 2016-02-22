import Exim from 'exim';

export default Exim.createStore({
  actions: [
    'fetchForUserRepo'
  ],

  initial: {
    topics: null,
  },

  fetchForUserRepo: {
    while(topicsLoading) {
      this.set({topicsLoading});
    },
    on(login, repo) {
      this.set('topics', null);
      return fetch('http://api.ost.io/v1/users/'+login+'/repos/'+repo+'/topics').then(r => r.json());
    },
    did(data) {
      this.set('topics', data);
    }
  }
})
