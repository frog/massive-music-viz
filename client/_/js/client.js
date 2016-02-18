var client =
{
	bpm: 60,
	range: -1,
	ranges: ["low", "mid", "high"],
	levelScaleFactors: [ 1.75, 2.5, 4.0 ],
	levelPeakFactors: [ 0.1, 0.2, 0.15 ],
	levelSelectors: [ null, null, null ],
	webSocket: null
};

client.init = function ()
{
	$("body").on("keydown", function(e) 
	{
		switch (e.keyCode) 
		{
			case 70: // [F] - fullscreen
				client.toggleFullScreen();
				break;
			case 76: // [L]
				client.setRange(0);
				break;
			case 77: // [M]
				client.setRange(1);
				break;
			case 72: // [H]
				client.setRange(2);
				break;
			case 65: // [A]
				client.setRange(-1);
				break;
			default:
				break;
		}
	});
	
	$("section").on("pointerdown", function (e)
	{
		client.setRange((client.range == -1) ? client.ranges.indexOf(e.currentTarget.id) : -1);
	});
	
	$(".level").velocity({ scale: 1 }, { duration: 0 });
	$(".tempo").velocity({ scale: 0 }, { duration: 0 });

	client.levelSelectors[0] = $("#low .level");
	client.levelSelectors[1] = $("#mid .level");
	client.levelSelectors[2] = $("#high .level");
	
	client.startTempo();
	
	if (client.isSimulationEnabled)
	{
		client.runSimulation();
	}
	else
	{
		client.connectWebSocket();
	}
};

client.connectWebSocket = function()
{
	$(client.webSocket).off();
	
	client.webSocket = new WebSocket("ws://" + window.document.location.host.replace(/:.*/, ""));
	
	client.webSocket.onmessage = function(e) 
	{
		try 
		{
			client.processMessage(JSON.parse(e.data));
		}
		catch (e) { }
	};
	
	client.webSocket.onclose = function(e) 
	{
		var timeout = (Math.floor(Math.random() * (30 - 15)) + 15) * 1000;
		setTimeout(client.connectWebSocket, timeout);
	};
};

client.processMessage = function(data)
{
	for (var i = 0, ic = 3; i < ic; i += 1)
	{
		var level = data[i];
		client.levelSelectors[i]
			.velocity("stop").velocity({ scale: ((level * client.levelScaleFactors[i]) + 1) }, { duration: 75 }, "ease-out")
			.toggleClass("peak", level > client.levelPeakFactors[i]);
	}
	
	client.bpm = data[3];
	
	if (data[4] == 1)
	{
		$(".tempo").velocity("stop");
		client.startTempo();
	}
};

client.startTempo = function()
{
	var duration = (60000 / client.bpm) * 2;
	$(".tempo")
		.velocity({ scale: [0 ,0] }, { duration: duration * .45, easing: "linear", complete: function(e) { $(".overlay").css("opacity", 0); } })
		.velocity({ scale: [1, 0] }, { duration: duration * .15, easing: "linear" })
		.velocity({ scale: [1, 1] }, { duration: duration * .40, easing: "linear", complete: function(e) { $(".overlay").css("opacity", 1); client.startTempo(); } });
};

client.setRange = function(range)
{
	client.range = range;
	switch (range) 
	{
		case 0:
		case 1:
		case 2:
			$("section").addClass("mute");
			$("#" + client.ranges[range]).removeClass("mute").addClass("solo");
			break;
		default:
			$("section").removeClass("mute").removeClass("solo");
			break;
	}
};

client.toggleFullScreen = function()
{
	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) 
	{
		if (document.documentElement.requestFullscreen) { document.documentElement.requestFullscreen(); } 
		else if (document.documentElement.msRequestFullscreen) { document.documentElement.msRequestFullscreen(); } 
		else if (document.documentElement.mozRequestFullScreen) { document.documentElement.mozRequestFullScreen(); } 
		else if (document.documentElement.webkitRequestFullscreen) { document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT); }
		
		$("main").addClass("fullscreen");
	} 
	else 
	{
		if (document.exitFullscreen) { document.exitFullscreen(); } 
		else if (document.msExitFullscreen) { document.msExitFullscreen(); } 
		else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); } 
		else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
		
		$("main").removeClass("fullscreen");
	}
};