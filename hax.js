function findOauthToken() {
  var oauthToken;
  document.cookie.split('; ').forEach(function(cookie){
      var keyValue = cookie.split('=')
      console.log(keyValue[0], keyValue[1])
      if(keyValue[0] === 'oauth_token') {
         oauthToken = keyValue[1]
         console.log('found it', keyValue[1])
         return
      }
  })
  return oauthToken
}

findOauthToken()
