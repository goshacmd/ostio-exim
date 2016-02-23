import Exim from 'exim';
import request from 'lib/request';

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
      return request.get('/search', {query});
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
      return request.get('/posts');
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
      return request.get('/users/'+login+'/repos/'+repo+'/topics/'+topic+'/posts');
    },
    did(data) {
      this.set('posts', data);
    }
  }
})
