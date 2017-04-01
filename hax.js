function findOauthToken() {
  var oauthToken;
  document.cookie.split('; ').forEach(function(cookie){
      var keyValue = cookie.split('=')      
      if(keyValue[0] === 'oauth_token') {
         oauthToken = keyValue[1]
         return
      }
  })
  return oauthToken
}

console.log('----- COPY AND PASTE VALUE BELOW INTO API KEY -----')
findOauthToken()
