var fs = require('fs'),
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,

	options = null;
	mongoClient = null;

if (process.argv.length <= 2 || process.argv.indexOf('--help') !== -1) {
	showHelp();
	return;
}

options = getOptions();
exportFile();

function showHelp() {
	console.error([
		'Export MongoDB data to JSON files.',
		'',
		'options:',
  		' --help                                produce help message',
  		' -h [ --host ] arg                     mongo host to connect to',
  		' --port arg                            server port',
  		' -u [ --username ] arg                 username',
  		' -p [ --password ] arg                 password',
  		' -d [ --db ] arg                       database to use',
  		' -c [ --collection ] arg               collection to use (some commands)',
  		' -o [ --out ] arg                      output file'
	].join('\n'));
}

function getOptions() {
	var args = process.argv,
		options = {
			host: '127.0.0.1',
			port: 27017
		},
		keys = {
			'-h': 'host',
			'--host': 'host',
			'--port': 'port',
			'-u': 'username',
			'--username': 'username',
			'-p': 'password',
			'--password': 'password',
			'-d': 'db',
			'--db': 'db',
			'-c': 'collection',
			'--collection': 'collection',
			'-o': 'output',
			'--out': 'output'
		};
	for (var i = 2; i < args.length; i += 2) {
		if (keys.hasOwnProperty(args[i])) {
			options[keys[args[i]]] = args[i + 1];
		}
	}
	return options;
}

function exportFile() {
	mongoClient = new MongoClient(new Server(options.host, options.port, {native_parse: true}));
	mongoClient.open(function(err, mongoclient) {
		var db = mongoclient.db(options.db);
		db.collection(options.collection).find().toArray(function(err, results) {
			if (err) {
				console.log(err);
				return;
			}
			fs.writeFile(options.output, JSON.stringify(results), function(err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log([
					'connected to: ' + options.host,
					'exported ' + results.length + ' records'
				].join('\n'));
				mongoClient.close();
			});
		});	
	});
}
