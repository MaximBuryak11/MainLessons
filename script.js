'use strict';

let money,
    start = function () {
    money = prompt ('Ваш месячный доход? ');

    while (isNaN(parseFloat(money))) {
        money = prompt ('Ваш месячный доход?');
    }
    };

start();

let appData = {
    budget: money,
    income: 2000,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(',');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');

            let sum = 0;
            let price;
            let expense;
            let obj = new Object();
        
            for (let i = 0; i < 2; i ++) {
                expense = prompt('Введите обязательную статью расходов');
                price = +prompt('Во сколько это обойдется?');
                obj[expense] = price;
                //test.push(obj);
                while (isNaN(parseFloat(price))) {
                    price = +prompt('Во сколько это обойдется?');
                }
            }
            //console.log(obj);
            appData.expenses = obj;
            //console.log(appData.expenses); 
    },
    getExpensesMonth: function () {
        let sum = 0;
        let obj = new Object();

        for (let prop in appData.expenses){
            sum += appData.expenses[prop];
        }
        appData.expensesMonth = sum;
        return sum;
    },
    getBudgetMonth: function () {
        let budgMonth = appData.budget - appData.expensesMonth;
        appData.budgetMonth = budgMonth;
        return budgMonth; 
    },
    getBudgetDay: function () {
        //debugger;
        let budgDay = Math.floor(appData.budgetMonth/30);
        //console.log(budgDay);
        appData.budgetDay = budgDay;
        return budgDay;
    },
    getTargetMonth: function () {
        let targetMoth = Math.ceil(appData.mission/appData.budgetMonth);
        if (targetMoth > 0) {
            console.log('Цель будет достигнута за  ' + targetMoth + ' месяца(ев)');
        }
        else {
            console.log('Цель не будет достигнута');
        }
        appData.period = targetMoth;
    },
    getStatusIncome: function () {
        let status;
        if (appData.income > 0) {
            status = "Есть дополнительный доход";
        }
        else if(appData.income === 0) {
            status = 'Нет дополнительного дохода';
        }
        else {
            status = 'Нет ответа';
        }
        console.log('status: ', status);
    },
    getProfitLevel:function () {
        //debugger;
        appData.getBudgetDay();
       switch(true) {
           case appData.budgetDay>1200:
            console.log('У вас высокий уровень дохода');
            break;    
           case appData.budgetDay<=1200 && appData.budgetDay>=600:
            console.log('У вас средний уровень дохода');
            break;
           case appData.budgetDay<600 && appData.budgetDay>0:
            console.log('К сожалению, у вас уровень дохода ниже среднего');
            break;
            case appData.budgetDay<0:
            console.log('Что-то пошло не так');
            break; 
       } 
    }

};

appData.asking();

let expensesMonth = appData.getExpensesMonth();
console.log('Расходы за месяц: ', expensesMonth);

let BudgetMonth = appData.getBudgetMonth();
appData.getTargetMonth();
appData.getProfitLevel();
console.log('Наша программа включает в себя данные: ');
for (let key in appData){
    console.log('appData.' + key + ' = ' + appData[key]);
}