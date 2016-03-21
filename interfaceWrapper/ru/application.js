// Вывод из глобального контекста модуля
console.log('From application global context');

var fileName = './README.md';
console.log('Application going to read ' + fileName);

//чтение с файла с интервалом 1с.
var readInterval = setInterval(
	function(){fs.readFile(fileName, function(err, src) {
		console.log('File ' + fileName + ' size ' + src.length);
});}, 1000);


//запись в файл с интервалом 2с
console.log('Application is going to write ./test.txt');
var writeInterval = setInterval(function(){
	fs.appendFile("./test.txt","TestData\n", function(err){
	if(err) console.log(err)
	else console.log("File is written");
});},2000);

//прерывание интервала чтения с файла через 40с
setTimeout(function(){
	clearInterval(readInterval);
}, 40001);

//прерывание интервала чтения с файла через 60с
setTimeout(function(){
	clearInterval(writeInterval);
}, 60001);