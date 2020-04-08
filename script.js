'use strict';

let money,
    start = function () {
    money = prompt ('Ваш месячный доход?');

    while (isNaN(parseFloat(money))) {
        money = prompt ('Ваш месячный доход?');
    }
    };

start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: true,
    mission: 50000,
    period: 3,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {

            let itemIncome;
            itemIncome = prompt('Какой у вас дополнительный заработок?',  'Таксую');
            //confirm(typeof itemIncome);
            while (!isNaN(parseFloat(itemIncome))) {
                itemIncome = prompt('Какой у вас дополнительный заработок?',  'Таксую');
            }
            let cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 10000);
            while (isNaN(parseFloat(cashIncome))) {
                cashIncome = +prompt('Сколько в месяц вы на этом зарабатываете?');
            }
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            //appData.deposit = confirm('Есть ли у вас депозит в банке?');

            let sum = 0;
            let price;
            let expense;
            let obj = new Object();
        
            for (let i = 0; i < 2; i ++) {
                expense = prompt('Введите обязательную статью расходов');
                while (!isNaN(parseFloat(expense))) {
                    expense = prompt('Введите обязательную статью расходов');
                }                
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
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30); 
    },
    getTargetMonth: function () {
        let targetMoth = Math.ceil(appData.mission/appData.budgetMonth);
        if (targetMoth > 0) {
            console.log('Цель будет достигнута за  ' + targetMoth + ' месяца(ев)');
        }
        else {
            console.log('Цель не будет достигнута');
        }
        return targetMoth;
    },
    getStatusIncome: function () {
        switch(true) {
            case appData.budgetDay>1200:
             console.log('У вас высокий уровень дохода');
             break;    
            case appData.budgetDay>=600:
             console.log('У вас средний уровень дохода');
             break;
            case appData.budgetDay>0:
             console.log('К сожалению, у вас уровень дохода ниже среднего');
             break;
             case appData.budgetDay<=0:
             console.log('Что-то пошло не так');
             break; 
        }
    },
    getInfoDeposit: function () {
        if(appData.deposit) {
            appData.percentDeposit = prompt('Какой годовой процент?', '10');
            while (isNaN(parseFloat(appData.percentDeposit))) {
                appData.percentDeposit = +prompt('Какой годовой процент?');
            }
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
            while (isNaN(parseFloat(appData.moneyDeposit))) {
                appData.moneyDeposit = +prompt('Какая сумма заложена?');
            }
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }

};

appData.asking();

let expensesMonth = appData.getExpensesMonth();
console.log('Расходы за месяц: ', expensesMonth);

appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();

let credit = '';
for (let i = 0; i < appData.addExpenses.length; i++) {
    let word;
    word = appData.addExpenses[i].toLowerCase();
    word = word.charAt(0).toUpperCase() + word.slice(1);
    credit+=word;
    if (i < appData.addExpenses.length - 1 ) {
        credit+=', ';  
    }
}
console.log(credit);
/*console.log('Наша программа включает в себя данные: ');
for (let key in appData){
    console.log('appData.' + key + ' = ' + appData[key]);
}*/
//appData.getInfoDeposit();
//console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());