'use strict';

let money; 
let income; 
let addExpenses;
let deposit;
let mission;
let period;

money = 25000;
income = 20;
addExpenses = 'Интернет, такси, коммуналка';
deposit = true;
mission = 50000;
period = 11;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(', '));
let budgetDay;
budgetDay = money/30;
console.log(budgetDay);
console.log('-------------------------');

// п.2
money=+prompt('Ваш месячный доход?');
// п.3
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// п.4
deposit = confirm('Есть ли у вас депозит в банке?');
// п.5
let expenses1, expenses2;
let amount1, amount2;
expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = +prompt('Во сколько обойдется ' + expenses1 + '?');
expenses2 = prompt('Введите еще одну обязательную статью расходов?');
amount2 = +prompt('Во сколько обойдется ' + expenses2 + '?');
//п.6
let budgetMonth, amount;
amount = amount1 + amount2;
money -= amount;
budgetMonth = money;
console.log('Бюджет на месяц: ', budgetMonth);
//п.7
//let monthCount;
//monthCount = Math.ceil(mission/budgetMonth);
console.log('Цель будет достигнута за:  ' + Math.ceil(mission/budgetMonth) + ' месяца(ев)');
//п.8
budgetDay=Math.floor(budgetMonth/30);
console.log('Бюджет на день: ', budgetDay);
//п.9 Конструкция условий
if (budgetDay > 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay <= 1200 && budgetDay >= 600) {
        console.log('У вас средний уровень дохода');
}
else if(budgetDay < 600 && budgetDay >0) {
    console.log('К сожалению, у вас уровень дохода ниже среднего');
}
else {
    console.log('Что-то пошло не так');
}