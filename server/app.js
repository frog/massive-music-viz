var WebSocketServer = require("ws").Server;
var osc = require("osc");
var log = require("./log.js");
var config = require("./config.js");

var wss = null;

var udp = new osc.UDPPort(
{
	localAddress: "0.0.0.0",
	localPort: 9002
});

udp.on("bundle", function (bundle, timeTag, info) 
{	
	try 
	{
		processPacket(bundle.packets[0].args);
	}
	catch (e) { }
});

function processPacket(values)
{
	wss.broadcast
	([
		values[0] / 100, 		// low
		values[1] / 100, 		// mid
		values[2] / 100, 		// high
		values[3],				// bpm
		(values[4] > 0 ? 1 : 0)	// sync
	]);
	
	log(values);
}

function runDataSimulationLoop()
{
	// "Let's Dance" - David Bowie (samples from 25s at 40fps)
	var data = [{args:[0,0,0,60,100]},{args:[100,22,20,60,0]},{args:[17,26,22,60,0]},{args:[0,28,17,60,0]},{args:[0,27,10,60,0]},{args:[0,28,8,60,0]},{args:[0,31,8,60,0]},{args:[100,27,14,60,0]},{args:[32,28,12,60,0]},{args:[0,27,10,60,0]},{args:[0,26,8,60,0]},{args:[0,27,7,60,0]},{args:[43,31,10,60,0]},{args:[85,30,17,60,0]},{args:[42,29,11,60,0]},{args:[0,30,10,60,0]},{args:[0,27,9,60,0]},{args:[0,26,9,60,0]},{args:[100,27,17,60,0]},{args:[20,24,16,60,0]},{args:[36,26,10,60,0]},{args:[0,25,8,60,0]},{args:[0,23,7,60,0]},{args:[0,29,11,60,0]},{args:[100,28,16,60,0]},{args:[38,25,15,60,0]},{args:[30,24,11,60,0]},{args:[0,24,9,60,0]},{args:[0,27,9,60,0]},{args:[0,33,12,60,0]},{args:[92,27,18,60,0]},{args:[0,23,15,60,0]},{args:[10,23,13,60,0]},{args:[0,22,11,60,0]},{args:[0,24,9,60,0]},{args:[100,28,18,60,0]},{args:[0,28,21,60,0]},{args:[0,26,16,60,0]},{args:[0,25,8,60,0]},{args:[0,29,13,60,0]},{args:[100,28,16,60,0]},{args:[35,26,15,60,0]},{args:[0,20,11,60,0]},{args:[19,21,8,60,0]},{args:[0,23,7,60,0]},{args:[25,40,22,60,0]},{args:[79,28,20,60,0]},{args:[0,29,17,60,0]},{args:[0,30,13,60,0]},{args:[0,28,9,60,0]},{args:[0,27,9,60,0]},{args:[88,34,18,60,0]},{args:[80,32,19,60,0]},{args:[0,29,16,60,0]},{args:[15,28,12,60,0]},{args:[0,26,8,60,0]},{args:[0,29,12,60,0]},{args:[100,32,18,60,0]},{args:[8,26,16,60,0]},{args:[0,26,14,60,0]},{args:[0,26,11,60,0]},{args:[0,25,10,60,0]},{args:[0,40,24,60,0]},{args:[100,34,21,60,0]},{args:[48,28,20,60,0]},{args:[0,25,16,60,0]},{args:[0,28,11,60,0]},{args:[0,26,9,60,0]},{args:[2,35,17,60,0]},{args:[14,30,23,60,0]},{args:[9,26,20,60,0]},{args:[0,26,15,60,0]},{args:[0,28,8,60,0]},{args:[0,28,12,60,0]},{args:[85,32,22,60,0]},{args:[0,30,22,60,0]},{args:[0,27,16,60,0]},{args:[0,25,9,60,0]},{args:[0,26,7,60,0]},{args:[0,26,7,61,0]},{args:[0,31,11,62,0]},{args:[100,31,21,63,0]},{args:[100,31,21,64,0]},{args:[100,31,21,65,0]},{args:[0,25,23,66,0]},{args:[0,25,23,67,0]},{args:[0,24,18,68,0]},{args:[0,26,14,69,0]},{args:[0,26,14,70,0]},{args:[0,28,8,71,0]},{args:[0,28,8,72,0]},{args:[0,28,8,73,0]},{args:[0,38,22,74,0]},{args:[0,38,22,75,0]},{args:[100,28,23,76,0]},{args:[11,24,19,77,0]},{args:[11,24,19,78,0]},{args:[0,18,17,79,0]},{args:[0,18,17,80,0]},{args:[0,18,17,81,0]},{args:[0,18,9,82,0]},{args:[0,22,9,83,0]},{args:[0,22,9,84,0]},{args:[52,39,25,85,0]},{args:[52,39,25,86,0]},{args:[97,35,23,87,0]},{args:[97,35,23,88,0]},{args:[0,32,15,89,0]},{args:[0,28,12,90,0]},{args:[0,28,12,91,0]},{args:[0,26,11,92,0]},{args:[0,26,11,93,0]},{args:[0,27,10,94,0]},{args:[0,27,10,95,0]},{args:[100,35,22,95,0]},{args:[100,35,22,96,0]},{args:[0,28,18,97,0]},{args:[0,28,18,98,0]},{args:[0,25,18,99,0]},{args:[0,29,13,100,0]},{args:[0,29,13,101,0]},{args:[0,27,9,102,0]},{args:[0,27,9,103,0]},{args:[0,29,17,104,0]},{args:[100,31,21,104,0]},{args:[100,31,21,105,0]},{args:[7,29,20,106,0]},{args:[7,29,20,107,0]},{args:[29,27,16,107,0]},{args:[29,27,16,108,0]},{args:[0,29,12,109,0]},{args:[0,29,12,110,0]},{args:[0,26,11,110,0]},{args:[0,26,11,111,0]},{args:[58,38,23,112,0]},{args:[63,31,23,113,0]},{args:[63,31,23,114,0]},{args:[0,29,19,114,0]},{args:[0,29,19,115,0]},{args:[0,25,15,116,0]},{args:[0,23,11,117,0]},{args:[0,26,10,118,0]},{args:[0,26,10,119,0]},{args:[100,29,21,120,0]},{args:[57,25,24,121,0]},{args:[0,26,19,122,0]},{args:[0,25,14,123,0]},{args:[0,25,14,124,0]},{args:[0,27,10,125,0]},{args:[0,37,22,125,0]},{args:[0,37,22,126,0]},{args:[100,34,21,127,0]},{args:[0,27,21,128,0]},{args:[2,27,16,129,0]},{args:[0,24,15,130,0]},{args:[0,24,15,131,0]},{args:[0,27,12,131,0]},{args:[0,27,12,132,0]},{args:[43,35,15,132,0]},{args:[52,35,23,133,0]},{args:[52,35,23,134,0]},{args:[0,29,20,134,0]},{args:[0,29,20,135,0]},{args:[0,25,18,135,0]},{args:[0,27,13,136,0]},{args:[0,27,8,137,0]},{args:[0,27,8,138,0]},{args:[100,31,21,138,0]},{args:[100,31,21,139,0]},{args:[81,26,25,139,0]},{args:[0,25,17,140,0]},{args:[0,21,13,141,0]},{args:[0,21,13,142,0]},{args:[0,19,8,142,0]},{args:[0,33,16,143,0]},{args:[100,35,26,144,0]},{args:[12,28,24,145,0]},{args:[0,26,19,145,0]},{args:[0,26,19,146,0]},{args:[0,27,15,146,0]},{args:[0,27,15,147,0]},{args:[0,29,9,147,0]},{args:[0,29,9,148,0]},{args:[0,38,21,148,0]},{args:[100,33,23,149,0]},{args:[100,33,23,150,0]},{args:[0,31,21,151,0]},{args:[8,30,15,152,0]},{args:[30,28,12,153,0]},{args:[30,28,12,154,0]},{args:[26,26,10,154,0]},{args:[26,26,10,155,0]},{args:[26,26,10,156,0]},{args:[96,33,22,157,0]},{args:[64,28,25,157,0]},{args:[64,28,25,158,0]},{args:[0,27,19,159,0]},{args:[0,28,18,160,0]},{args:[0,28,18,161,0]},{args:[0,27,11,161,0]},{args:[0,27,11,162,0]},{args:[0,30,12,163,0]},{args:[100,31,24,164,0]},{args:[100,31,24,165,0]},{args:[0,31,21,165,0]},{args:[0,31,21,166,0]},{args:[0,30,18,167,0]},{args:[0,30,14,168,0]},{args:[0,30,14,169,0]},{args:[0,30,10,169,0]},{args:[0,34,18,170,0]},{args:[0,34,18,171,0]},{args:[100,30,22,171,0]},{args:[100,30,22,172,0]},{args:[0,31,24,172,0]},{args:[0,34,21,173,0]},{args:[0,31,18,173,0]},{args:[0,31,18,174,0]},{args:[0,28,15,174,0]},{args:[0,36,16,175,0]},{args:[100,31,15,176,0]},{args:[0,28,12,176,0]},{args:[0,28,12,177,0]},{args:[40,33,14,177,0]},{args:[100,25,9,178,0]},{args:[34,29,13,178,0]},{args:[34,29,13,179,0]},{args:[0,32,26,179,0]},{args:[0,33,28,180,0]},{args:[0,30,26,180,0]},{args:[0,28,20,180,0]},{args:[0,25,18,180,0]},{args:[0,26,13,180,0]},{args:[100,26,15,180,0]},{args:[52,22,16,180,0]},{args:[5,15,10,180,0]},{args:[0,11,5,180,0]},{args:[0,9,6,180,0]},{args:[0,34,33,180,0]},{args:[100,33,31,180,0]},{args:[81,27,32,180,0]},{args:[0,19,31,180,0]},{args:[0,14,29,180,0]},{args:[0,10,27,180,0]},{args:[0,9,27,180,0]},{args:[0,12,26,180,0]},{args:[0,9,26,180,0]},{args:[0,21,31,180,0]},{args:[0,26,29,180,0]},{args:[0,21,21,180,0]},{args:[0,39,30,180,0]},{args:[0,28,25,180,0]},{args:[0,24,24,179,0]},{args:[0,17,20,179,0]},{args:[9,16,18,179,0]},{args:[9,16,18,178,0]},{args:[0,8,14,178,0]},{args:[0,9,11,178,0]},{args:[0,9,11,177,0]},{args:[0,4,12,177,0]},{args:[0,3,11,177,0]},{args:[0,3,11,176,0]},{args:[0,11,16,176,0]},{args:[0,13,15,175,0]},{args:[0,37,27,175,0]},{args:[0,37,27,174,0]},{args:[100,30,24,174,0]},{args:[2,26,20,173,0]},{args:[18,24,15,173,0]},{args:[18,24,15,172,0]},{args:[63,14,7,172,0]},{args:[63,14,7,171,0]},{args:[0,9,4,171,0]},{args:[0,14,10,170,0]},{args:[0,15,12,170,0]},{args:[0,15,12,169,0]},{args:[0,13,10,169,0]},{args:[0,10,11,168,0]},{args:[0,6,5,168,0]},{args:[0,6,5,167,0]},{args:[0,10,6,167,0]},{args:[0,33,26,166,0]},{args:[0,27,26,166,0]},{args:[0,27,26,165,0]},{args:[0,21,19,165,0]},{args:[0,11,12,164,0]},{args:[0,2,2,164,0]},{args:[0,2,2,163,0]},{args:[0,1,0,163,0]},{args:[0,2,3,162,0]},{args:[0,0,3,162,0]},{args:[0,0,1,161,0]},{args:[0,0,0,161,0]},{args:[0,0,0,160,0]},{args:[56,32,16,160,0]},{args:[56,32,16,159,0]},{args:[100,21,5,159,0]},{args:[100,21,5,158,0]},{args:[60,17,1,158,0]},{args:[60,17,1,158,100]},{args:[20,12,0,158,0]},{args:[20,12,0,157,0]},{args:[0,6,0,157,0]},{args:[0,2,0,156,0]},{args:[0,1,0,156,0]},{args:[0,1,0,155,0]},{args:[0,3,0,154,0]},{args:[100,23,5,154,0]},{args:[100,20,0,153,0]},{args:[0,39,27,153,0]},{args:[0,28,19,152,0]},{args:[16,20,21,152,0]},{args:[16,20,21,151,0]},{args:[0,18,12,151,0]},{args:[0,6,6,151,0]},{args:[0,6,6,150,0]},{args:[0,7,0,150,0]},{args:[100,26,5,150,0]},{args:[100,26,5,149,0]},{args:[47,18,0,149,0]},{args:[0,12,0,149,0]},{args:[0,12,0,148,0]},{args:[7,11,1,148,0]},{args:[0,5,0,148,0]},{args:[0,5,0,147,0]},{args:[0,35,12,147,0]},{args:[100,22,2,147,0]},{args:[100,22,2,146,0]},{args:[55,17,0,146,0]},{args:[94,12,0,146,0]},{args:[58,7,0,145,0]},{args:[0,2,0,145,0]},{args:[0,3,0,145,0]},{args:[0,3,0,144,0]},{args:[0,0,0,144,0]},{args:[0,0,0,143,0]},{args:[0,2,1,143,0]},{args:[0,0,0,143,0]},{args:[0,0,0,142,0]},{args:[0,22,21,142,0]},{args:[0,21,22,142,0]},{args:[0,21,22,141,0]},{args:[0,13,18,141,0]},{args:[0,5,12,141,0]},{args:[0,1,2,141,0]},{args:[0,1,2,140,0]},{args:[0,2,0,140,0]},{args:[0,0,0,140,0]},{args:[0,0,0,139,0]},{args:[0,0,0,138,0]},{args:[100,35,19,138,0]},{args:[100,31,18,138,0]},{args:[100,31,18,137,0]},{args:[50,23,13,137,0]},{args:[94,19,8,137,0]},{args:[23,11,6,136,0]},{args:[0,7,6,136,0]},{args:[0,11,12,136,0]},{args:[0,11,12,135,0]},{args:[0,13,13,135,0]},{args:[0,14,11,135,0]},{args:[67,36,23,134,0]},{args:[60,28,17,134,0]},{args:[60,28,17,133,0]},{args:[0,24,15,132,0]},{args:[0,23,23,132,0]},{args:[0,24,21,131,0]},{args:[15,16,18,131,0]},{args:[15,16,18,130,0]},{args:[0,13,12,130,0]},{args:[0,11,9,129,0]},{args:[17,36,11,129,0]},{args:[17,36,11,128,0]},{args:[76,21,5,128,0]},{args:[20,16,8,127,0]},{args:[44,17,13,127,0]},{args:[44,17,13,126,0]},{args:[20,19,12,126,0]},{args:[0,18,15,126,0]},{args:[0,18,15,125,0]},{args:[99,32,23,125,0]},{args:[99,32,23,124,0]},{args:[19,30,21,124,0]},{args:[0,24,14,123,0]},{args:[64,14,9,123,0]},{args:[17,9,7,122,0]},{args:[0,7,9,122,0]},{args:[0,11,13,121,0]},{args:[0,13,13,121,0]},{args:[0,10,12,120,0]},{args:[0,4,12,119,0]},{args:[0,2,9,119,0]},{args:[0,36,29,119,0]},{args:[0,36,29,118,0]},{args:[0,21,22,118,0]},{args:[0,19,20,118,0]},{args:[0,19,20,117,0]},{args:[0,10,15,117,0]},{args:[0,0,5,117,0]},{args:[0,0,5,116,0]},{args:[0,0,0,116,0]},{args:[0,0,3,116,0]},{args:[0,0,1,115,0]},{args:[0,0,1,114,0]},{args:[0,0,0,114,0]},{args:[0,30,17,114,0]},{args:[0,30,17,113,0]},{args:[100,24,5,113,0]},{args:[18,15,0,113,0]},{args:[0,13,0,112,0]},{args:[28,13,0,112,0]},{args:[0,8,0,111,0]},{args:[0,5,0,111,0]},{args:[0,2,0,111,0]},{args:[0,2,0,110,0]},{args:[0,1,0,110,0]},{args:[0,6,1,110,0]},{args:[0,2,0,110,0]},{args:[0,2,0,109,0]},{args:[0,1,0,109,0]},{args:[0,29,22,109,0]},{args:[0,24,18,109,0]},{args:[0,24,18,108,0]},{args:[0,17,17,108,0]},{args:[0,15,5,108,0]},{args:[0,7,1,108,0]},{args:[0,7,1,107,0]},{args:[0,6,3,107,0]},{args:[0,2,0,107,0]},{args:[0,1,0,107,0]},{args:[0,1,0,106,0]},{args:[0,8,8,106,0]},{args:[0,4,1,106,0]},{args:[0,2,0,106,0]},{args:[0,2,0,105,0]},{args:[0,37,17,105,0]},{args:[59,23,2,105,0]},{args:[0,16,1,105,0]},{args:[0,16,1,104,0]},{args:[0,14,0,104,0]},{args:[21,8,0,104,0]},{args:[29,2,0,104,0]},{args:[3,1,0,104,0]},{args:[3,1,0,103,0]},{args:[0,1,0,103,0]},{args:[7,2,0,103,0]},{args:[9,2,0,103,0]},{args:[9,2,0,102,0]},{args:[0,13,11,102,0]},{args:[0,28,23,102,0]},{args:[56,24,22,102,0]},{args:[13,18,18,102,0]},{args:[38,16,15,102,0]},{args:[52,14,11,102,0]},{args:[100,15,4,102,0]},{args:[22,14,4,102,0]},{args:[12,16,3,102,0]},{args:[50,14,1,102,0]},{args:[21,14,1,102,0]},{args:[60,16,0,102,0]},{args:[60,16,0,103,0]},{args:[72,33,23,103,0]},{args:[32,29,20,103,0]},{args:[0,22,12,103,0]},{args:[62,23,8,103,0]},{args:[14,14,8,103,0]},{args:[0,8,6,103,0]},{args:[0,15,14,103,0]},{args:[0,13,10,103,0]},{args:[0,19,15,103,0]},{args:[100,28,20,103,0]},{args:[3,25,14,103,0]},{args:[43,36,31,103,0]},{args:[0,25,22,103,0]},{args:[0,20,21,103,0]},{args:[0,14,16,103,0]},{args:[0,10,13,103,0]},{args:[0,10,13,104,0]},{args:[0,10,10,104,0]},{args:[100,23,8,104,0]},{args:[67,15,7,104,0]},{args:[0,12,4,104,0]},{args:[0,17,11,104,0]},{args:[0,18,7,104,0]},{args:[0,20,16,104,0]},{args:[100,28,22,104,0]},{args:[0,26,16,104,0]},{args:[0,17,8,104,0]},{args:[0,19,8,104,0]},{args:[0,10,7,104,0]},{args:[0,9,4,104,0]},{args:[0,12,11,104,0]},{args:[0,15,8,104,0]},{args:[0,9,6,104,0]},{args:[0,7,9,104,0]},{args:[0,3,6,104,0]},{args:[0,28,22,104,0]},{args:[0,21,23,104,0]},{args:[0,16,19,104,0]}];
	
	var i = 0;
	setInterval(function() 
	{
		processPacket(data[i].args);
		i++;
		if (i == data.length) { i = 0; }
	}, 25);
};

module.exports.init = function(httpServer)
{
	if (config.isDataSimulationLoopEnabled)
	{
		runDataSimulationLoop();
	}
	else
	{
		udp.open();
	}
	
	wss = new WebSocketServer({ server: httpServer });
	wss.broadcast = function broadcast(data) 
	{
		for (var i = 0, ic = wss.clients.length; i < ic; i += 1)
		{
			try 
			{
				wss.clients[i].send(JSON.stringify(data));
			} catch (e) { }
		}
	};
}
