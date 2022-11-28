function sendNotification(){
  let jogosDoDia = getGamesListToday();
  //jogosDoDia.map
  let mapJogos = jogosDoDia.map((value)=>{
    return {
      casa:
        {placar: value.home_score,
         logo: value.home_flag,
         time: value.home_team_en
        },
      fora:
        {placar: value.away_score,
        logo: value.away_flag,
         time: value.away_team_en
        }
      }
  })

  chatNotificationBot.postToRoom(mapJogos)
}
/* 
 * chatNotificationBot Class - Google Form Notifications
 */
class chatNotificationBot {

  /* 
   * Constructor function
   */
  constructor() {
    const self = this;
  }

  
  static postToRoom(gameEvent) {
    const notificationsBot = new chatNotificationBot(),
          url = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL');
    let response;
    if (url) {
      try {
        let payload = notificationsBot.makeCard(gameEvent);
        let options = {
          'method' : 'post',
          'contentType': 'application/json; charset=UTF-8',
          'muteHttpExceptions' : true,
          'payload' : JSON.stringify(payload)
        };

        response = UrlFetchApp.fetch(url, options); 
        console.log(response.getContentText())
      } catch(err) {
        console.log(err.message);
      }
    } else {
      console.log('formsNotificationBot: No Webhook URL specified for Bot');
    }
  }

  makeCard(gameEvent) {
    let self = this,
          sections = [],
          cards = [],
          card = {},
          response = {};
    card.header = self.getCardHeader_();
    gameEvent.forEach(game => {
      sections.push({"widgets" : [self.createGameWidget(game)]});
    });
    card.sections = sections;
    cards.push({"card": card});
    response.cardsV2 = cards;
    return response;
  }

  getCardHeader_() {
    let today = new Date()
    const widget = {};
    widget.title = "Jogos do Dia  -- Copa 2022";
    widget.subtitle = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
    return widget;
  }

  #TODO trocar a widget por uma grid para deixar centralizado os placares
  //[{casa{time,placar,logo},fora{time,placar,logo}}]
  createGameWidget(game){
    let holderObj = {},
    widget = {};
    holderObj.startIcon = {
      "altText" : game.casa.time,
      "imageType" : "CIRCLE",
      "iconUrl" : game.casa.logo
    }
    holderObj.text = `<b>${game.casa.placar} X ${game.fora.placar}</b>`;
    holderObj.endIcon = {
      "altText" : game.fora.time,
      "imageType" : "CIRCLE",
      "iconUrl" : game.fora.logo
    }
    widget.decoratedText = holderObj;
    return widget;

  }
}

#TODO fução de criação de triggers automático