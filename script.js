'use strict'

const collection = document.querySelectorAll('.book');
const adv = document.getElementsByClassName('adv');

//console.log(adv);

adv[0].remove();

collection[1].after(collection[0]);

collection[0].after(collection[4]);

collection[4].after(collection[3]);
collection[3].after(collection[5]);

let body = document.body;
body.setAttribute('style', 'background-image: url(./image/123.jpg)');

let aa = collection[4].querySelector('[target="_blank"]')
aa.innerHTML = "Книга 3. this и Прототипы Объектов";


let unit2 = collection[0].querySelectorAll('li');
console.log(unit2);
unit2[3].after(unit2[6]);
unit2[6].after(unit2[8]);
unit2[10].before(unit2[2]);

let unit5 = collection[5].querySelectorAll('li');
//console.log(unit5);
unit5[1].after(unit5[9]);
unit5[4].after(unit5[2]);
unit5[8].before(unit5[5]);
//unit5[3].remove();

let li = document.createElement('li');
console.log(li);
li.innerHTML = 'Глава 8: За пределами ES6';
console.log(li);
let unit6 = collection[2].querySelectorAll('li');
unit6[9].before(li);



