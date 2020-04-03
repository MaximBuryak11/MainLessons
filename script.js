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

let start = function () {
    money = prompt ('Ваш месячный доход?');

    while (isNaN(parseFloat(money))) {
        money = prompt ('Ваш месячный доход?');
    }
}

start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');


// п.1
let expenses = [];

const getExpensesMonth = function () {
    let sum = 0;
    let price;

    for (let i = 0; i < 2; i ++) {
        expenses[i] = prompt('Введите обязательную статью расходов?');
        price = prompt('Во сколько это обойдется?');
        while (isNaN(parseFloat(price))) {
            price = prompt('Во сколько это обойдется?');
        }
        sum += Number(price); 
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();
console.log('Расходы за месяц: ', expensesAmount);

// п.2
const getAccumulatedMonth = function(debit, costs) {
    return (debit - costs);
};
console.log(getAccumulatedMonth(money,expensesAmount));
// п.3
let accumulatedMonth = getAccumulatedMonth(money,expensesAmount);
// п.4
const getTargetMonth = function (purpose, savings) {
    // mission/накопления в месяц;
    let targetMoth = Math.ceil(purpose/savings);
    if (targetMoth > 0) {
        console.log('Цель будет достигнута за:  ' + targetMoth + ' месяца(ев)');
    }
    else {
        console.log('Цель не будет достигнута');
    }
};

getTargetMonth(mission,accumulatedMonth);

let budgetDay;
budgetDay = Math.floor(accumulatedMonth/30);
// п.7
const showTypeOf = function (variable) {
    return (typeof variable);
}
console.log(showTypeOf(budgetDay));
console.log(showTypeOf(deposit));
console.log(showTypeOf(addExpenses));

addExpenses = addExpenses.split(', '); 
for (let i = 0; i < addExpenses.length; i++) {
    console.log(addExpenses[i]);
}


console.log('Бюджет на день: ', budgetDay);

const getStatusIncome = function (addIncome) {
    let status;
    if (addIncome > 0) {
        status = "Есть дополнительный доход";
    }
    else if( addIncome === 0) {
        status = 'Нет дополнительного дохода';
    }
    else {
        status = 'Нет ответа';
    }
    return status;
}
console.log(getStatusIncome(income));