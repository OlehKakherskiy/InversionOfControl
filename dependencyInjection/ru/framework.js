// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');
    // process = require('process');


// Читаем исходный код приложения из файла
var fileName = process.argv[2];
var d = process.argv[3];
var m = process.argv[4];
// Чоздаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { 
	module: {}, 
	console: clone(console), 
	setTimeout: setTimeout, 
	setInterval: setInterval,
	clearInterval: clearInterval,
	require:req,
	delay: d,
	message: m
};

function req(s){
	context.console.log(s);
	return require(s);
}

context.console.log = function(s){
	var res = fileName+" "+new Date() +" "+s;
	console.log(res);
	fs.appendFile("test.txt",res+"\n", function(err){
		if(err) console.log(err)
		else console.log("File is written");
	});
}

function clone(obj){
	var res = [];
	for(var k in obj) res[k] = obj[k];
	return res;
}

context.global = context;

var sandbox = vm.createContext(context);

fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
  
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  // console.dir(sandbox.module.exports.toString())
  sandbox.module.exports();
  
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.
});
