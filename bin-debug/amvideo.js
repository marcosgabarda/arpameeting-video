/*!
 * ArpaMeeting P2P Videoconference Module.
 * 
 * swfobject is required. http://code.google.com/p/swfobject/
 * 
 * @author Marcos Gabarda <marcos@arpamet.com>
 */
var AMVideo = {
	/*!
	 * URL of SWF objects.
	 */
	url_root = '';
	/*!
	 * Group name for NetGroup Adobe Flash. This name will be appended to other 
	 * string to create the final group name.
	 */
	net_group_name: "videop2p_testing",
	/*!
	 * Default parameters for input SWF object.
	 */
	input: {
			stream : "peer1",
			container : "peer2ContainerId",
			autopublish: false,
			width : 320,
			height : 240
	},
	/*!
	 * Default parameters for output SWF objects.
	 */
	output: { 
			width : 320,
			height : 240,
			peers : [
			{ stream : "peer2", container : "peer2ContainerId"},
			{ stream : "peer3", container : "peer3ContainerId"}
	]},
	/*!
	 * Version of Adobe Flash required.
	 */
	version: "10.1.0",
	/*!
	 * Register a new output (i.e participant). The parameter must be in JSON 
	 * notation, like:
	 * { stream : "stream_name", containter : "id_of_container" }
	 */
	addOutputContainersId: function (new_output)
	{
		if (new_output.stream && new_output.container)
		{
			this.output.peers.push(new_output);
		}
	},
	/*!
	 * Embed the inpunt SWF. Only one in a page.
	 */
	createInputSWF: function ()
	{
		var url = this.url_root + "input.swf?group=" + this.net_group_name + "&stream=" + 
			this.input.stream + "&autopublish=" + this.input.autopublish;
		swfobject.embedSWF(url, this.input.container, this.input.width, 
				this.input.height, this.version);
	},
	/*!
	 * Called from input SWF file when a new stream is detected in the 
	 * P2P group. Adds the corresponding SWF object.
	 */
	newIncomingStream: function (stream)
	{
		for ( var i = 0; i < this.output.peers.length; i++)
		{
			var peer = this.output.peers[i];
			if (peer.stream == stream)
			{
				var url = this.url_root + "output.swf?group=" + this.net_group_name + "&stream=" 
							+ peer.stream
				swfobject.embedSWF(url, peer.container, this.output.width, 
						this.output.height, this.version);
			}
		}
	}
};