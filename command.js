#!/usr/bin/env node
var _ = require('lodash')
var request = require('request')
var lodash = require ('lodash')
var fs = require('fs')
var apiKey = process.argv[2]

var likes = []

function getUser(callback) {
  request.get({
    url: 'https://api.soundcloud.com/me',
    qs: {
      oauth_token: apiKey
    },
    json: true
  }, function(error, response, body){
      callback(error, body)
  })
}

function getTrackLikes(options, callback) {
  var user = options.user
  var likesUrl = options.url || 'https://api-v2.soundcloud.com/users/'+user.id+'/track_likes'
  request.get({
    url: likesUrl,
    qs: {
      app_version: '1490962962',
      oauth_token: apiKey,
      limit: 1000
    },
    json: true
  }, function(error, response, body){
      if(error) return callback(error)

      likes = likes.concat(_.compact(_.map(body.collection, 'track.permalink_url')))
      likes = _.uniq(likes)
      console.log(likes.length)
      if(body.next_href) {
        console.log()

        return getTrackLikes({user: user, url: body.next_href}, callback)
      }
      callback(null, likes)
  })
}

getUser(function(error, user){
  getTrackLikes({user: user}, function (error, likes){
    fs.writeFileSync('likes.txt', likes.join('\n'))
  })
})
