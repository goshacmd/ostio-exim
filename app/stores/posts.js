import Exim from 'exim';

export default Exim.createStore({
  actions: [
    'search',
    'fetchLatest',
    'fetchForUserRepoTopic'
  ],

  initial: {
    posts: []
  },

  search: {
    while(postsLoading) {
      this.set({postsLoading});
    },
    on(query) {
      this.set('posts', null);
      return fetch('http://api.ost.io/v1/search?query='+query).then(r => r.json());
    },
    did(data) {
      this.set('posts', data);
    }
  },

  fetchLatest: {
    while(postsLoading) {
      this.set({postsLoading});
    },
    on() {
      this.set('posts', null);
      return fetch('http://api.ost.io/v1/posts').then(r => r.json());
    },
    did(data) {
      this.set('posts', data);
    }
  },

  fetchForUserRepoTopic: {
    while(postsLoading) {
      this.set({postsLoading});
    },
    on(login, repo, topic) {
      this.set('posts', null);
      return fetch('http://api.ost.io/v1/users/'+login+'/repos/'+repo+'/topics/'+topic+'/posts').then(r => r.json());
    },
    did(data) {
      this.set('posts', data);
    }
  }
})
