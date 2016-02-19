# Massive Music Viz

Real-time music visualization synchronized across mobile and desktop devices on a local network using HTML5 WebSockets. Designed and developed for a frog studio open house party in Austin leading up to SXSW 2016.

## Background

As one of several experiences designed and developed for an open house party hosted by frog in the Austin studio around SXSW 2016, this real-time music visualization piece combines live audio processing (spectrum analysis and beat detection), OSC (Open Sound Control) data broadcast over HTML5 WebSockets, and responsive SVG layout and animations to synchronize a large array of connected browser clients across desktop displays staged throughout the party space along with the mobile devices of partygoers. With capable Wi-Fi networking hardware (a single Netgear R7000 + DD-WRT) to create a high performance local network, around 200 connected devices can be supported and synchronized to visualize live music in tandem. The design matches the visual and interaction theme for the open house party with animations developed for the low (bass), mid (average), and high (treble) aggregate ranges of the processed spectrum along with a background cycle matched to the current beats per minute detected in the music.

## Dependencies

* Lightjams DMX Controller Software (Windows native or virtualized on Mac OS X) - http://www.lightjams.com/  (trial version is fully functional for demo purposes)
* Node.js - https://nodejs.org
* Bower - http://bower.io/ | npm install -g bower
* LESS - http://lesscss.org | npm install -g less (optional, CSS in repo is pre-compiled) 
* Modern Web Browser - (Chrome, Firefox, Safari, Edge, IE 11 / desktop and mobile)

## Build & Run

* Clone or download this repo locally
* Run "npm install" from a command line shell/terminal in the server directory
* Run "bower install" from a command line shell/terminal in the client/_/js/lib directory
	* For Live Music Source Using Lightjams
		* Open the Lightjams project file located in the lightjams directory
		* Consult the Lightjams documentation on configuring a live music source for processing (line in, microphone, Lightjams music player, etc.)
		* Edit server/config.js and set isDataSimulationLoopEnabled = false
	* With A Simulated Music Data Loop
		* Edit server/config.js and set isDataSimulationLoopEnabled = true
* Run "node server.js" from command line shell/terminal in the server directory

## Usage

* Launch one or more web browsers (desktop and/or mobile) to one of the available IP address endpoints logged in the console (localhost and/or local LAN assigned). Local firewall configuration may be required to allow inbound web traffic.
* All three data visualizations are displayed by default when loading the page
* Tap or click one of the visualizations to focus
* Tap or click to return to default view
* For desktop devices with keyboards, the following key commands are available as well:
	* F = toggle fullscreen browser mode (remove all chrome and hide cursor)
	* L = display low range visualization only
	* M = display mid range visualization only
	* H = display high range visualization only
	* A = display all visualizations
* For each visualization, the current power level calculated for that range is displayed using the element in the center (square, circle, triangle) and the current beats per minute value is represented by the loop animation in the background