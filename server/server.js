var http = require("http");
var url = require("url");
var path = require("path");
var fs = require("fs");
var os = require("os");
var exec = require('child_process').exec;
var app = require("./app.js");
var log = require("./log.js");
var config = require("./config.js");

var webRootDirPath = path.resolve(process.cwd(), ".." + path.sep + config.webRootDirName);

var httpServer = http.createServer(function(request, response) 
{
	var filePath = path.join(webRootDirPath, url.parse(request.url).pathname);
	
	fs.exists(filePath, function(isValidPath) 
	{
		if (isValidPath) 
		{
			if (fs.statSync(filePath).isDirectory())
			{ 
				filePath += config.defaultDocument;
			}

			fs.readFile(filePath, "binary", function(err, file) 
			{
				if (!err) 
				{
					response.statusCode = 200;
					response.setHeader("Content-Type", config.contentTypes[path.extname(filePath)] || "text/plain");
					response.setHeader("Cache-Control", config.isCachingDisabled ? "no-cache, no-store, max-age=0, must-revalidate" : "public");
					response.write(file, "binary");
					response.end();
				}
				else
				{   
					response.statusCode = 500;
					response.setHeader("Content-Type", "text/plain");
					response.write(err, "utf-8");
					response.end();
				}
			});
		}
		else
		{
			response.statusCode = 404;
			response.end();
		}

		log("URL requested: " + request.url + " [" + response.statusCode + "]");
	});
});

app.init(httpServer);

httpServer.listen(config.httpServerPort);

var ipAddresses = [];
var networkInterfaces = os.networkInterfaces();
for (var name in networkInterfaces) 
{
	var items = networkInterfaces[name];
	for (var i = 0, ic = items.length; i < ic; i++)
	{
		var address = items[i];
		if ((!address.internal && address.family == "IPv4") || address.address == "127.0.0.1")
		{
			ipAddresses.push(address.address);
		}
	}
}

log("Web server listening on port " + config.httpServerPort + " at the following IPv4 addresses: " + ipAddresses.join(", "));

if (config.doBrowserLaunch)
{
	var launchURL = "http://127.0.0.1:" + config.httpServerPort + "/";
	var execParam = ' "' + launchURL.replace(/"/, '\\\"') + '"';

	switch (process.platform) 
	{
		case "win32":
			exec('start ""' + execParam);
			break;
		case "darwin":
			exec("open" + execParam);
			break;
		case "linux":
			exec("xdg-open" + execParam);
			break;
		default:
			break;
	}

	log("Default web browser launched to " + launchURL);
}
