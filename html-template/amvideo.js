/**
 * ArpaMeeting - Videoconference P2P module
 */
var AMVideo = {
	/**
	 * Group name for NetGroup Adobe Flash.
	 */
	net_group_name: "videop2p_testing",
	/**
	 * Default parameters for input SWF object.
	 */
	input: {
			stream : "peer1",
			container : "peer2ContainerId",
			autopublish: false,
			width : 300,
			height : 300
	},
	/**
	 * Default parameters for output SWF objects.
	 */
	output: { 
			width : 300,
			height : 300,
			peers : [
			{ stream : "peer2", container : "peer2ContainerId"},
			{ stream : "peer3", container : "peer3ContainerId"}
	]},
	/**
	 * Version of Adobe Flash required.
	 */
	version: "10.1.0",
	/**
	 * 
	 */
	addOutputContainersId: function (newOutput)
	{
		this.output.peers.push(newOutput);
	},
	/**
	 * 
	 */
	createInputSWF: function ()
	{
		var url = "input.swf?group=" + this.net_group_name + "&stream=" + 
			this.input.stream + "&autopublish=" + this.input.autopublish;
		swfobject.embedSWF(url, this.input.container, this.input.width, 
				this.input.height, this.version);
	},
	/**
	 * 
	 */
	newIncomingStream: function (stream)
	{
		for ( var i = 0; i < this.output.peers.length; i++)
		{
			var peer = this.output.peers[i];
			if (peer.stream == stream)
			{
				var url = "output.swf?group=" + this.net_group_name + "&stream=" 
							+ peer.stream
				swfobject.embedSWF(url, peer.container, this.output.width, 
						this.output.height, this.version);
			}
		}
	}
};