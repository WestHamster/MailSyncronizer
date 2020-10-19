var messages=[];
function getRelevantMessages(){
  var threads = GmailApp.getInboxThreads(0,50);
  threads.forEach(function(thread)                  {
                    messages.push(thread.getMessages()[0]);
  });
  Logger.log("getRelevantMessages()::messages:\n"+messages);
//  return messages;
}




function logMatchedMessages(number_req){
  for(let m=0;m<messages.length;m++){
    Logger.log("Fetching messages["+m+"]: subject: "+messages[m].getSubject());
      if((new RegExp(number_req,"g").exec(messages[m].getSubject()))!=null){
        Logger.log("MATCH FOUND");
        Logger.log("Sbuject: "+messages[m].getSubject());
        Logger.log("Date: "+messages[m].getDate());
        Logger.log("Attachments: "+messages[m].getAttachments());
        Logger.log("ID: "+messages[m].getId());
        Logger.log("https://mail.google.com/mail/u/0/#inbox/"+ messages[m].getId());
      }
  }
}



function getMessagesDisplay(number_req){
  Logger.log("getMessagesDisplay()::number_req:\n"+number_req);
  getRelevantMessages();
  var templ = HtmlService.createTemplateFromFile('index');
  templ.number_req = number_req;
  templ.messages = messages;
  logMatchedMessages(number_req);
  return templ.evaluate();
}



function doGet(e){
  return getMessagesDisplay(e.parameters.invoice[0]);
//  getMessagesDisplay("F1431");
}
