/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.6fdc7487-57d4-48a0-84a5-3796552565c5"; 

/**
 * The AlexaSkill prototype and helper functions
 */
var http = require('http'), AlexaSkill = require('./AlexaSkill');
/**
 * Quote is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 */
var Quote = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Quote.prototype = Object.create(AlexaSkill.prototype);
Quote.prototype.constructor = Quote;

Quote.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
};

Quote.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
	handleQuoteRequest(response);
};

Quote.prototype.eventHandlers.onSessionEnded = function (event, context) {
};

Quote.prototype.intentHandlers = {
   
	QuoteIntent: function (intent, session, response) {
		handleQuoteRequest(response);
	},
	
    HelpIntent: function (intent, session, response) {
         var speechOutput = "I am here to make you laugh, and all you need to do is ask! For example, tell me a quote, make me smile, cheer me up, or, you can say exit. Now, what can I help you with?";
    
		var repromptText = "I am sorry I didn't quite catch that. You can say – tell me a quote, make me smile, cheer me up, or, you can say exit. Now, what can I help you with?";

		response.ask(speechOutput, repromptText, false);
	
		
    },
	"AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

function handleQuoteRequest(response) {
	var max = 29;
	var randonNumber = Math.floor(Math.random() * (max - 1 + 1)) + 1;
	var speechOutput = {
            speech: "<speak><audio src='https://s3.amazonaws.com/alexastuff/FunnyQuotes/"+randonNumber+".mp3'/></speak>",
            type: AlexaSkill.speechOutputType.SSML
        };
    response.tellWithCard(speechOutput, "Funny Quote");
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Quote skill.
    var instanceQuote = new Quote();
    instanceQuote.execute(event, context);
};