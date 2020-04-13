'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0], // + document.querySelectorAll('.additional_income-item') - document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelector('.expenses-title'),
    //expensesItems = document.querySelector('expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    additionalExpensesItems = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    output = document.querySelector('.period-amount');

let money;


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: true,
    percentDeposit: 0,
    moneyDeposit: 0,
    expensesMonth: 0,
    output: 0,

    start: function () {

        /*if (salaryAmount.value === '') {
            alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
            //document.getElementById("start").disabled = true;
            return;
        }*/
           
        appData.budget = +salaryAmount.value;
        console.log('salaryAmount.value: ', salaryAmount.value);
        appData.getRangeNumber();
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.getRangeNumber();
        appData.showResult();
        
    },
    showResult: function() {
        budgetMonthValue.value =  appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
        output.value = appData.getRangeNumber();
        //periodSelect.addEventListener('change', appData.getRangeNumber);
        periodSelect.addEventListener('change', function () {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    getRangeNumber: function () {
        
        output.innerHTML = periodSelect.value;
    },
    addExpensesBlock: function (){

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },    
    getExpenses: function() {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
    },    
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItems.value.split(',');
        addExpenses.forEach(function(item){
           item = item.trim();
            if(item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    addIncomeBlock: function (){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function () {
        let sum = 0;

        for (let prop in appData.expenses){
            sum += +appData.expenses[prop];
        }
        appData.expensesMonth = sum;
        return sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30); 
    },
    getTargetMonth: function () {
        // let targetMoth = Math.ceil(appData.mission/appData.budgetMonth);
        /*if (targetMoth > 0) {
            console.log('Цель будет достигнута за  ' + targetMoth + ' месяца(ев)');
        }
        else {
            console.log('Цель не будет достигнута');
        }*/
        return Math.ceil(targetAmount.value/appData.budgetMonth);
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
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    eventFunc: function(event) {
        if(salaryAmount.value === ''){
        //console.log('Пусто');
        document.getElementById("start").disabled = true;
        }
        else {
            document.getElementById("start").disabled = false;
        }
        //console.log(event.type);
    }
};

start.addEventListener('click', appData.start);
salaryAmount.addEventListener('input', appData.eventFunc);
document.getElementById("start").disabled = true;
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
//getRangeNumber.addEventListener('click',appData.getRangeNumber);
periodSelect.addEventListener('change', appData.getRangeNumber);








/*appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();*/

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
//console.log(credit);
/*console.log('Наша программа включает в себя данные: ');
for (let key in appData){
    console.log('appData.' + key + ' = ' + appData[key]);
}*/
//appData.getInfoDeposit();
//console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());