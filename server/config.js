var config =
{
	httpServerPort: 80,
	webRootDirName: "client",
	defaultDocument: "client.htm",
	isCachingDisabled: true,
	isLogOutputEnabled: true,
	doBrowserLaunch: false,
	contentTypes:
	{
		".htm": "text/html",
		".css": "text/css",
		".js": "text/javascript",
		".svg": "image/svg+xml",
		".json": "application/json",
		".mp3": "audio/mpeg",
	},
	isDataSimulationLoopEnabled: false
};

module.exports = config;
