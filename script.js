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

// п.1
const getExpensesMonth = function (cost1, cost2) {
    return (cost1+ cost2);
};
console.log(getExpensesMonth(4000,5000));
// п.2
const getAccumulatedMonth = function(debit, costs) {
    return (debit - costs);
};
//console.log(getAccumulatedMonth(100,60));
// п.3
let accumulatedMonth = getAccumulatedMonth(25000,9000);
// п.4
const getTargetMonth = function (purpose, savings) {
    // mission/накопления в месяц;
    return (Math.ceil(purpose/savings));
};
// п.5
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

console.log('Цель будет достигнута за:  ' + getTargetMonth(mission,accumulatedMonth) + ' месяца(ев)');
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