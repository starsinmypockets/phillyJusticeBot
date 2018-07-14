const twit = require('twit')
const config = require('./config.js')
const Client = require('node-rest-client').Client;
const Content = new Client()
const T = new twit(config)
const url = config.apiURL

run()

// fifo
let postQueue = {
  posts: [],
  
  /**
   * accepts array of posts or single post
   **/
  push: posts => {
    if (Array.isArray(posts)) {
      this.posts.concat(posts)
    } else {
      this.posts.push(posts)
    }
  },
  
  /**
   * Get first post
   */
  getPost: () => {
    return this.posts.pop()
  },

  isEmpty: () => {
    return !this.notEmpty()
  },

  notEmpty: () => {
    return this.posts.length 
  }
}

function run () {
  // open stream - check for errors
  
}

function log (msg) {
  console.log(msg)
}

function postAtInterval () {
  setInterval(() => {
    if (postQueue.notEmpty()) {
      const post = postQueue.getPost()
      tweet(post, (err, data, res) => {
        if (err) {
          log(err)
        } else {
          API.unpublish(data, (err, res) => {
            if (err) log(err)
          })
        }
      })
    } else {
      // if postQueue is empty, get more posts from API
      getAPIPosts((err, data) => {
        postQueue.push(posts)
      })
    }
  }, config.postInterval)
}

function searchAtInterval () {
  setInterval(() => 
    search(config.searchTerms, (err, res) => {
      if (err) {
        log(err)
      } else {
        // * handle posts here
        // * try to make sure they are friendly
        //   ... nlp? 
        //   ... 3d-party?
        // * add to postQueue  
      }
    })
  {}, config.searchInterval)
}

/** 
 * Tweet the dang tweet
 **/
function tweet (tweet, cb) {
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    console.log(data)
    if (err) {
      return cb(err)
    } else {
      return cb(null, data, response)
    }
  })
}

function retweet() {

}

function search (opts, cb) {
  T.search()
}

/**
 * API
 **/
function unpublish (data) {
  const url = `${apiURL}/tweet`

  client.put(url, args, function (data, response) {
    console.log(data)
	}); 
}

function getAPIPosts () {
  // config.APIPostBatchSize
}

function savePosts (posts) => {
  // save posts to api - yagni
}
