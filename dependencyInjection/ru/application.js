// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');

// setTimeout(function(){
// 	console.log("from setTimeout");
// }, delay);
var util = require("util")
var interval = setInterval(function(){
	console.log(message);
}, delay);

setTimeout(function(){
	clearInterval(interval);
}, 3100);

console.log("really array ", util.isArray([]));

module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};

var ojb = {
	
};
