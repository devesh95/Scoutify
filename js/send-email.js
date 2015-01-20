// Create a function to log the response from the Mandrill API
function log(obj) {
    console.log(JSON.stringify(obj));
	document.getElementById("email").setAttribute("value","Email sent!");
	document.getElementById("email").setAttribute("onclick","");
}

// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill('lvh8hM4-xC_Yh4OiVaLUXg');
var url = "";
var directionsHTML = "";

function encodedImageUrl(eurl) {
	console.log("Static Image URL: "+eurl);
	url += eurl;
}

function addDirections (dir) {
	directionsHTML += dir;
}
// create a variable for the API call parameters
var params = {
    "message": {
        "from_email":"scoutifyme@gmail.com",
        "to":[{"email": ""}],
        "subject": "Your Scoutify Schedule & Map",
        "html": "",
		"auto_text": "null",
    }
};

function sendTheMail() {
	params["message"]["html"] = "<body><center class=\"wrapper\" style=\"display: table;table-layout: fixed;width: 100%;min-width: 620px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;background-color: #fff\"> <table class=\"gmail\" style=\"border-collapse: collapse;border-spacing: 0;width: 650px;min-width: 650px\"><tbody><tr><td style=\"padding: 0;vertical-align: top;font-size: 1px;line-height: 1px\"></td></tr></tbody></table> <table class=\"preheader centered\" style=\"border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto\"> <tbody><tr> <td style=\"padding: 0;vertical-align: top\"><table class=\"header centered\" style=\"border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;width: 602px\"> <tbody><tr><td class=\"border\" style=\"padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #ededed;width: 1px\"></td></tr> <tr><td class=\"logo\" style=\"padding: 32px 0;vertical-align: top;mso-line-height-rule: at-least\"><div class=\"logo-center\" style=\"font-size: 26px;font-weight: 700;letter-spacing: -0.02em;line-height: 32px;color: #4c1d6b;font-family: sans-serif;text-align: center\" align=\"center\" id=\"emb-email-header\"></div></td></tr> </tbody></table> <table class=\"border\" style=\"border-collapse: collapse;border-spacing: 0;font-size: 1px;line-height: 1px;background-color: #ededed;Margin-left: auto;Margin-right: auto\" width=\"602\"> <tbody><tr><td style=\"padding: 0;vertical-align: top\"></td></tr> </tbody></table> <table class=\"centered\" style=\"border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto\"> <tbody><tr> <td class=\"border\" style=\"padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #ededed;width: 1px\"></td> <td style=\"padding: 0;vertical-align: top\"> <table class=\"one-col\" style=\"border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;width: 600px;background-color: #ffffff;font-size: 14px\"> <tbody><tr> <td class=\"column\" style=\"padding: 0;vertical-align: top;text-align: left\"> <div><div class=\"column-top\" style=\"font-size: 32px;line-height: 32px\"></div></div> <table class=\"contents\" style=\"border-collapse: collapse;border-spacing: 0;width: 100%\"> <tbody><tr> <td class=\"padded\" style=\"padding: 0;vertical-align: top;padding-left: 32px;padding-right: 32px\"><br/> <h1 style=\"Margin-top: 0;color: #178ddc;font-weight: 700;font-size: 32px;Margin-bottom: 18px;font-family: \'Futura\';line-height: 42px\">Thanks for using Scoutify!</h1><h2 style=\"Margin-top: 0;color: #565656;font-style: italic;font-weight: normal;font-size: 24px;line-height: 32px;Margin-bottom: 20px;font-family: Futura\">Here's where you have to be today...</h2><img style=\"border: 0;-ms-interpolation-mode: bicubic;display: block;Margin-left: auto;Margin-right: auto;\" src=\""+url+"\" alt=\"Image goes here\"/>"+directionsHTML+"<p style=\"Margin-top: 0;color: #565656;font-family: futura;font-size: 16px;line-height: 25px;Margin-bottom: 25px\">Check Scoutify to see your schedule and never worry about planning again!</p><p style=\"Margin-top: 0;color: #565656;font-family: futura;font-size: 16px;line-height: 25px;Margin-bottom: 25px\">Have a great day!</p><p style=\"Margin-top: 0;color: #565656;font-family: futura;font-size: 16px;line-height: 25px;Margin-bottom: 25px\">The Scoutify Team</p><p style=\"Margin-top: 0;color: #565656;font-family: futura;font-size: 16px;line-height: 25px;Margin-bottom: 25px\"></p> </td> </tr> </tbody></table> <table class=\"contents\" style=\"border-collapse: collapse;border-spacing: 0;width: 100%\"> <tbody><tr> <td class=\"padded\" style=\"padding: 0;vertical-align: top;padding-left: 32px;padding-right: 32px\"> <div style=\"height:22px\"></div> </td> </tr> </tbody></table> <table class=\"contents\" style=\"border-collapse: collapse;border-spacing: 0;width: 100%\"> <tbody><tr> <td class=\"padded\" style=\"padding: 0;vertical-align: top;padding-left: 32px;padding-right: 32px\"> <div class=\"btn\" style=\"Margin-bottom: 24px;padding: 2px;text-align: center\"> <a style=\"border: 1px solid #ffffff;display: inline-block;font-size: 13px;font-weight: bold;line-height: 15px;outline-style: solid;outline-width: 2px;padding: 10px 30px;text-align: center;text-decoration: none !important;transition: all .2s;color: #fff !important;font-family: futura;background-color: #178ddc;outline-color: #6229ad;text-shadow: 0 1px 0 #58259c\" href=\"http://www.scoutify.me\">Go to Scoutify Now</a> </div> </td> </tr> </tbody></table> <div class=\"column-bottom\" style=\"font-size: 8px;line-height: 8px\"></div> </td> </tr> </tbody></table> </td> <td class=\"border\" style=\"padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #ededed;width: 1px\"></td> </tr> </tbody></table> <table class=\"border\" style=\"border-collapse: collapse;border-spacing: 0;font-size: 1px;line-height: 1px;background-color: #ededed;Margin-left: auto;Margin-right: auto\" width=\"602\"> <tbody><tr><td style=\"padding: 0;vertical-align: top\"></td></tr> </tbody></table> <div class=\"spacer\" style=\"font-size: 1px;line-height: 32px;width: 100%\"></div> <table class=\"footer centered\" style=\"border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;width: 602px\"> <tbody><tr> <td class=\"social\" style=\"padding: 0;vertical-align: top;padding-top: 32px;padding-bottom: 22px\" align=\"center\"> </td> </tr> <tr><td class=\"border\" style=\"padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #ededed;width: 1px\"></td></tr> <tr> <td style=\"padding: 0;vertical-align: top\"> <table style=\"border-collapse: collapse;border-spacing: 0\"> <tbody><tr> <td class=\"address\" style=\"padding: 0;vertical-align: top;width: 250px;padding-top: 32px;padding-bottom: 64px\"> <table class=\"contents\" style=\"border-collapse: collapse;border-spacing: 0;width: 100%\"> <tbody><tr> <td class=\"padded\" style=\"padding: 0;vertical-align: top;padding-left: 0;padding-right: 10px;text-align: left;font-size: 12px;line-height: 20px;color: #999;font-family: futura\"> <div>Scoutify</div> </td> </tr> </tbody></table> </td> <td class=\"subscription\" style=\"padding: 0;vertical-align: top;width: 350px;padding-top: 32px;padding-bottom: 64px\"> <table class=\"contents\" style=\"border-collapse: collapse;border-spacing: 0;width: 100%\"> <tbody><tr> <td class=\"padded\" style=\"padding: 0;vertical-align: top;padding-left: 10px;padding-right: 0;font-size: 12px;line-height: 20px;color: #999;font-family: futura;text-align: right\"> <div>Devesh Dayal | Jacob Kahn | Sammi Caby | Summer Yue</div> <div> <span class=\"block\"> </div> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </td> </tr> </tbody></table> </center> </body> ";
		params["message"]["to"][0]["email"] = user_email;
    m.messages.send(params, function(res) {
        log(res);
    }, function(err) {
        log(err);
    });
}
