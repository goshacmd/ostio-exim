import Exim from 'exim';
import request from 'lib/request';

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
      return request.get('/users/'+login+'/repos/'+repo+'/topics');
    },
    did(data) {
      this.set('topics', data);
    }
  }
})
