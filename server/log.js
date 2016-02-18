var config = require("./config.js");

module.exports = function log(message)
{
	if (config.isLogOutputEnabled) 
	{
		console.log("[" + new Date().toJSON() + "]", message);
	}
};
