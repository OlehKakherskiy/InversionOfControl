// Пример оборачивания функции в песочнице

var fs = require('fs'),
    vm = require('vm');

// Объявляем хеш из которого сделаем контекст-песочницу
var context = {
  module: {},
  console: console,
  // Помещаем ссылку на fs API в песочницу
  fs: cloneInterface(fs),
  setTimeout: setTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval
};

// Преобразовываем хеш в контекст
context.global = context;
var sandbox = vm.createContext(context);

  //лог количества вызовов функции с именем fnName
  var functionCallsCount = 0;
  //лог количества вызова коллбэков с функции с именем fnName
  var callbackCallsCount = 0;

//Клонирование интерфейса
function cloneInterface(interfaceName){
  var clonedInterface = {};
  for(var key in interfaceName){
    clonedInterface[key] = wrapFunction(key, interfaceName[key]);
  }
  return clonedInterface;
};

function wrapFunction(fnName, fn){

  return function wrapper(){
    var args = [];
    Array.prototype.push.apply(args, arguments);
    if(typeof args[args.length-1] == "function"){

      //сохраняем оригинальный коллбэк
      var callback = args[args.length-1];

      //записываем обертку вместо ориг. коллбэка
      args[args.length-1] = function(){

        //логируем вызов коллбэка и входные параметры
        console.log("callback is called with parameters:");
        console.log(arguments);

        callbackCallsCount += 1;

        //вызываем оригинальный коллбэк с масивом аргументов
        callback.apply(undefined, arguments);
      }
    }

    console.log("Call: "+ fnName);
    console.dir(args);
    functionCallsCount += 1;
    return fn.apply(undefined, args);
  }
}

// Читаем исходный код приложения из файла
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
});


var statisticalLogOutput = setInterval(function(){
  console.log("Function calls count = "+ functionCallsCount + "\n");
  console.log("Callbacs calls count = "+ callbackCallsCount + "\n");
},30000);

setTimeout(function(){
  clearInterval(statisticalLogOutput);
},90001);