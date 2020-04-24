'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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
    output = document.querySelector('.period-amount'),
    inputElems = document.getElementsByTagName('input');

const AppData = function (){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = true;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.expensesMonth = 0;
    this.output = 0;
};

AppData.prototype.check = function () {
    if (salaryAmount.value !== ''){
        start.removeAttribute('disabled');
    }
};

AppData.prototype.start = function () {
       
    this.budget = +salaryAmount.value;
    //console.log('salaryAmount.value: ', salaryAmount.value);

    //console.log(inputElems);
    //console.log(this);
    this.getRangeNumber();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.getRangeNumber();
    this.setDisabled();
    this.hideBtnCalc();
    this.showResult();
    
};

AppData.prototype.cancel =  function () {
    this.setEditabled();
    this.showBtnCalc();
    this.resetData();
    
};
AppData.prototype.setDisabled =  function () {
    salaryAmount.setAttribute('readonly', true);
    targetAmount.setAttribute('readonly', true);
    additionalExpensesItems.setAttribute('readonly', true);
    //console.log(additionalIncomeValue);
    additionalIncomeItem[0].setAttribute('readonly', true);
    additionalIncomeItem[1].setAttribute('readonly', true);
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title');
        let cashExpenses = item.querySelector('.expenses-amount');
        itemExpenses.setAttribute('readonly', true);
        cashExpenses.setAttribute('readonly', true);
    });
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title');
        let cashIncome = item.querySelector('.income-amount');
        itemIncome.setAttribute('readonly', true);
        cashIncome.setAttribute('readonly', true);
    });

};
AppData.prototype.setEditabled =  function () {
    salaryAmount.removeAttribute('readonly');
    targetAmount.removeAttribute('readonly');
    additionalExpensesItems.removeAttribute('readonly');
    //console.log(additionalIncomeValue);
    additionalIncomeItem[0].removeAttribute('readonly');
    additionalIncomeItem[1].removeAttribute('readonly');
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title');
        let cashExpenses = item.querySelector('.expenses-amount');
        itemExpenses.removeAttribute('readonly');
        cashExpenses.removeAttribute('readonly');
    });
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title');
        let cashIncome = item.querySelector('.income-amount');
        itemIncome.removeAttribute('readonly');
        cashIncome.removeAttribute('readonly');
    });

};

AppData.prototype.hideBtnCalc =  function () {
    start.style.display = 'none';
    cancel.style.display= 'block';
};

AppData.prototype.showBtnCalc =  function () {
    start.style.display = 'block';
    cancel.style.display= 'none';
};

AppData.prototype.resetData =  function () {
    salaryAmount.value = '';
    targetAmount.value = '';
    additionalExpensesItems.value = '';
    additionalIncomeItem[0].value = '';
    additionalIncomeItem[1].value = '';
    //document.querySelectorAll('.expenses-items')
    expensesItems.forEach(function (item) {
        item.querySelector('.expenses-title').value = '';
        item.querySelector('.expenses-amount').value = '';
    });
    incomeItems.forEach(function (item) {
        item.querySelector('.income-title').value = '';
        item.querySelector('.income-amount').value = '';
    });
    budgetMonthValue.value =  0;
    budgetDayValue.value = 0;
    expensesMonthValue.value = 0;
    additionalExpensesValue.value = '';
    additionalIncomeValue.value = '';
    targetMonthValue.value = 0;
    incomePeriodValue.value = 0;
    output.value = 1;
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value =  this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    //console.log(appData.getTargetMonth());
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    output.value = this.getRangeNumber();
    //periodSelect.addEventListener('change', appData.getRangeNumber);
    periodSelect.addEventListener('change', function () {
        incomePeriodValue.value = _this.calcPeriod();
    });
    //console.log(this);
};
AppData.prototype.getRangeNumber =  function () {
    
    output.innerHTML = periodSelect.value;
};
AppData.prototype.addExpensesBlock =  function (){

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};    
AppData.prototype.getExpenses =  function() {
    const _this = this;
    expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
};    
AppData.prototype.getAddExpenses =  function () {
    let addExpenses = additionalExpensesItems.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item){
       item = item.trim();
        if(item !== '') {
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.addIncomeBlock =  function (){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.getAddIncome =  function () {
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth =  function () {
    let sum = 0;

    for (let prop in this.expenses){
        sum += +this.expenses[prop];
    }
    this.expensesMonth = sum;
    return sum;
};
AppData.prototype.getBudget =  function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth/30); 
};
AppData.prototype.getTargetMonth =  function () {
    return Math.ceil(targetAmount.value/this.budgetMonth);
};
AppData.prototype.getStatusIncome =  function () {
    switch(true) {
        case this.budgetDay>1200:
         console.log('У вас высокий уровень дохода');
         break;    
        case this.budgetDay>=600:
         console.log('У вас средний уровень дохода');
         break;
        case this.budgetDay>0:
         console.log('К сожалению, у вас уровень дохода ниже среднего');
         break;
         case this.budgetDay<=0:
         console.log('Что-то пошло не так');
         break; 
    }
};
AppData.prototype.getInfoDeposit =  function () {
    if(this.deposit) {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
        while (isNaN(parseFloat(this.percentDeposit))) {
            this.percentDeposit = +prompt('Какой годовой процент?');
        }
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        while (isNaN(parseFloat(this.moneyDeposit))) {
            this.moneyDeposit = +prompt('Какая сумма заложена?');
        }
    }
};
AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.eventFunc = function(event) {
    if(salaryAmount.value === ''){
    //console.log('Пусто');
    document.getElementById("start").disabled = true;
    }
    else {
        document.getElementById("start").disabled = false;
    }
    //console.log(event.type);
};
AppData.prototype.targetAmountAddExpences = function () {
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
    return credit;
};



AppData.prototype.eventListeners = function () {
    const _this = this;
    salaryAmount.addEventListener('input', _this.eventFunc);
    start.addEventListener('click', _this.start.bind(appData));
    cancel.addEventListener('click', _this.cancel.bind(appData));
    document.getElementById("start").disabled = true;
    expensesPlus.addEventListener('click', _this.addExpensesBlock);
    incomePlus.addEventListener('click', _this.addIncomeBlock);
    periodSelect.addEventListener('change', _this.getRangeNumber);
};
const appData = new AppData();
//console.log(appData);
appData.eventListeners();