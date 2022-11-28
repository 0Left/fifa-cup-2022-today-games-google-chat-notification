# fifa-cup-2022-today-games-google-chat-notification
Script de notificação para google chat, utilizando Google Apps Scripts e a [free-api-worldcup2022](https://github.com/raminmr/free-api-worldcup2022) para enviar um card com os jogos e placares do dia atual, no momento da request.

# Tutorial
    1. Copie os 2 arquivos GS para dentro do seu Script App
    2. troque os textos placeHolders da função executeRegister() e execute para registar uma nova conta
    3. entre nas configurações do projeto e adicione as seguintes propriedades:
       1. WEBHOOK_URL
       2. bearerToken
       3. loginEmail
       4. passwordLogin
    4. atualize os valores para os respectivos:
       1. link do seu WebHook
       2. deixa um valor qualquer "placeHolder"
       3. insira o email usado no register
       4. insira a senha usada no register
    5. execute a função sendNotification() para testar
    6. configure os triggers para executar sempre que quiser


[como gerar web hook](https://developers.google.com/chat/how-tos/webhooks#step_1_register_the_incoming_webhook)
