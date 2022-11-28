function getGamesListToday() {
  //mudar essas duas de baixo para ser uma função a parte chamando o login usando as propriedades do script
  let properties = PropertiesService.getScriptProperties().getProperties();
  let loginStatus = login(properties.loginEmail,properties.passwordLogin);
  //atualiza para ser o primeiro e unigo get de properties mas depois do login
  properties = PropertiesService.getScriptProperties().getProperties();
  let options = {
    'Method' : 'GET',
    'contentType': 'application/json',
    'headers' : {
      'Authorization': `Bearer ${properties.bearerToken}`,
    },
    'muteHttpExceptions' : true
  }
  let response = UrlFetchApp.fetch("http://api.cup2022.ir/api/v1/match",options);
  let parsedResponse = JSON.parse(response);
  
  let todaysGames = parsedResponse.data.filter(filterGamesToday)

  return todaysGames
}
function filterGamesToday(value)
{
  let dateToVerify = new Date(value.local_date);
  let today = new Date();
  let sameDay = dateToVerify.getDate() == today.getDate();
  let sameMonth = dateToVerify.getMonth() == today.getMonth();
  let sameYear = dateToVerify.getFullYear() == today.getFullYear();
  if(sameDay && sameMonth && sameYear){
    return value
  }else{
    return
  }
}
function login(email,password){
  let fetchBody = {
  email: email,
  password: password
  }
  let options = {
  'Method' : 'POST',
  'contentType': 'application/json',
  'muteHttpExceptions' : true,
  'connection' : 'keep-alive',
  // Convert the JavaScript object to a JSON string.
  'payload' : JSON.stringify(fetchBody)
  //Payload = Body da request
  }
  let response = UrlFetchApp.fetch("http://api.cup2022.ir/api/v1/user/login",options)
  let parsedResponse = JSON.parse(response);
  let token = parsedResponse.data.token;
  PropertiesService.getScriptProperties().setProperty("bearerToken",token)
  return parsedResponse;
}
function register(name,email,password){
  let fetchBody = {
  "name": name,
  "email": email,
  "password": password,
  "passwordConfirm" : password
  }
  ,jsonObj = JSON.stringify(fetchBody)
  ,options = {
  'Method' : 'POST',
  'contentType': 'application/json',
  'payload' : jsonObj
  }
  ,response = UrlFetchApp.fetch("http://api.cup2022.ir/api/v1/user",options)
  return JSON.parse(response);
}