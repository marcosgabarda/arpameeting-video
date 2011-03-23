/**
 * 
 */
var net_group_name = "videop2p_testing";

var input = {
		stream : "peer1",
		container : "peer2ContainerId", 
		width : 300,
		height : 300
};

var output = { 
		width : 300,
		height : 300,
		peers : [
		{ stream : "peer2", container : "peer2ContainerId"},
		{ stream : "peer3", container : "peer3ContainerId"}
]};

var version = "10.1.0";



function setInputContainer(containerId)
{
	inputContainerId = containerId;
}

function addOutputContainersId(newOutput)
{
	output.peers.push(newOutput);
}

/*
swfUrl (String, requerido) especifica la URL de tu SWF
id (String, requerido) especifica el id del elemento HTML que contiene el contenido alternativo y que será reemplazado por el archivo Flash
width (String, requerido) especifica la anchura del SWF
height (String, requerido) especifica la altura del SWF
version (String, requerido) especifica la versión del Flash Player para la que tu SWF fue publicado (el formato es: "major.minor.release")
expressInstallSwfurl (String, opcional) especifica la URL del SWF para la instalación automática con Express Install [ http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75 ].
Express install solamente se ejecuta una vez (la primera vez que es invocado), solo lo soportan Flash Player 6.0.65 o versiones posteriores en Win y Mac y el SWF requiere un tamaño mínimo de 310x137px.
flashvars (Object, opcional) especifica tus variables flash (flashvars) con parejas name:value
params (Object, opcional) especifica los elementos param anidados bajo el elemento object con parejas name:value
attributes (Object, opcional) especifica los atributos del objeto con parejas name:value
*/

/*
 * swfobject.embedSWF(swfUrl, id, width, height, version, 
		expressInstallSwfurl, flashvars, params,
		attributes);
*/

function createInputSWF()
{
	var url = "input.swf?group=" + net_group_name + "&stream=" + input.stream;
	swfobject.embedSWF(url, input.container, input.width, input.height, version);
}



function newIncomingStream(stream)
{
	for ( var i = 0; i < output.peers.length; i++)
	{
		var peer = output.peers[i];
		if (peer.stream == stream)
		{
			// Create output swf
			var url = "output.swf?group=" + net_group_name + "&stream=" 
						+ peer.stream
			swfobject.embedSWF(url, peer.container, output.width, output.height, version);
		}
	}
}
