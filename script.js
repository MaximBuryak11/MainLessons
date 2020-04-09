'use strict'

let btnCalculate = document.getElementById('start');

let btnPlus = document.getElementsByClassName('btn_plus');

let chkId = document.querySelector('#deposit-check');

let addIncItem = document.querySelectorAll('.additional_income-item');

let result = [];
let len = document.getElementsByClassName('result-total').length;
for (let i = 1; i < len; i++) {
    result.push(document.getElementsByClassName('result-total')[i]);
}
for (let res of result) {
    console.log(res);
  }

  console.log(' ');
  let data = document.querySelector('.data');
  let dataLen = data.getElementsByTagName('input').length;

  let leftResult = [];
  for (let j = 0; j < dataLen; j++) {
      leftResult.push(data.getElementsByTagName('input')[j]);
  }

  for (let res of leftResult) {
    console.log(res);
  }

