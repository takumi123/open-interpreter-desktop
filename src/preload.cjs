const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
	send: (channel, data) => {
		ipcRenderer.send(channel, data);
	},
	sendSync: (channel, data) => {
		ipcRenderer.sendSync(channel, data);
	},
	receive: (channel, func) => {
		ipcRenderer.on(channel, (event, ...args) => func(...args));
	},
	executeScript: (script) => {
		return ipcRenderer.invoke('execute-script', script);
	},
	executePythonScript: (script) => {
		return ipcRenderer.invoke('execute-python-script', script);
	},
	run_command: (command) => {
		console.log('run_command in preload');
		return ipcRenderer.invoke('run-command', command);
	}
});
