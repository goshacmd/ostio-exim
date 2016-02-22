import Exim from 'exim';

export default Exim.createStore({
  actions: [
    'search'
  ],

  initial: {
    posts: []
  },

  search: {
    while(postsLoading) {
      this.set({postsLoading});
    },
    on(query) {
      return fetch('http://api.ost.io/v1/search?query='+query).then(r => r.json());
    },
    did(data) {
      this.set('posts', data);
    }
  }
})
