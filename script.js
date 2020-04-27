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

    let leftDataElems = document.querySelector('.data');
    let rightResultElems = document.querySelector('.result');

    let inputFields = leftDataElems.querySelectorAll("input[type=text]");


class appData {
    constructor(budget = 0, budgetDay = 0,  budgetMonth = 0, income = {}, incomeMonth = 0, addIncome = [], expenses = {}, addExpenses = [], deposit = true, percentDeposit = 0, moneyDeposit = 0, expensesMonth = 0) {
        this.budget = budget;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.income = income;
        this.incomeMonth = incomeMonth;
        this.addIncome = addIncome;
        this.expenses = expenses;
        this.addExpenses = addExpenses;
        this.deposit = true;
        this.percentDeposit = percentDeposit;
        this.moneyDeposit = moneyDeposit;
        this.output = output;
    }
    eventFunc() {
        if(salaryAmount.value === ''){
            document.getElementById("start").disabled = true;
        }
        else {
            document.getElementById("start").disabled = false;
        }
    }
    start() {   
        this.budget = +salaryAmount.value;
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
    }

    cancel () {
        this.setEditabled();
        this.showBtnCalc();
        this.resetData();
        
    }
    setDisabled () {
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
    
    }
    
    setEditabled () {
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
    
    }

    hideBtnCalc () {
        start.style.display = 'none';
        cancel.style.display= 'block';
    }

    showBtnCalc () {
        start.style.display = 'block';
        cancel.style.display= 'none';
    }

    resetData () {
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

        const inputFields = rightResultElems.querySelectorAll("input[type=text]");
        inputFields.forEach((item) => {
          item.value = '';
          item.disabled = false;
        });

        this.budget =  0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.addExpenses = '';
        this.addIncome = '';
        this.income = {};
        this.incomeMonth = 0;
        this.expenses = {};

        targetMonthValue.value = 0;
        incomePeriodValue.value = 0;
        output.value = 1;
    }

    showResult () {
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
            incomePeriodValue.value = this.calcPeriod();
        });
        //console.log(this);
    }
    getRangeNumber() {
    
        output.innerHTML = periodSelect.value;
    }
    addExpensesBlock (){

        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    getExpenses () {
        expensesItems.forEach( (item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        }, this);
    }
    getIncome () {
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        }, this);

        for (let key in this.income){
            this.incomeMonth += this.income[key];
        }
    }
    getAddExpenses() {
        const addExpenses = additionalExpensesItems.value.split(',');
        addExpenses.forEach((item) => {
           item = item.trim();
           item = item.charAt(0).toUpperCase() + item.slice(1);
            if(item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    }
    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    getAddIncome() {
        additionalIncomeItem.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        }, this);

    }
    getExpensesMonth() {
        let sum = 0;
    
        for (let prop in this.expenses){
            sum += +this.expenses[prop];
        }
        this.expensesMonth = sum;
        return sum;
    }
    getBudget (){
        console.log(this.budget + ' ---' + this.incomeMonth);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        console.log(this.budgetMonth);
        this.budgetDay = Math.floor(this.budgetMonth/30); 
    }
    getTargetMonth () {
        return Math.ceil(targetAmount.value/this.budgetMonth);
    }
    getStatusIncome () {
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
    }
    getInfoDeposit () {
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
    }
    calcPeriod () {
        return this.budgetMonth * periodSelect.value;
    }
    targetAmountAddExpences () {
        let credit = '';
        for (let i = 0; i < this.addExpenses.length; i++) {
            let word;
            word = this.addExpenses[i].toLowerCase();
            word = word.charAt(0).toUpperCase() + word.slice(1);
            credit+=word;
            if (i < this.addExpenses.length - 1 ) {
                credit+=', ';  
            }
        }
        return credit;
    }
    eventListeners() {
        salaryAmount.addEventListener('input', this.eventFunc);
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.cancel.bind(this));
        document.getElementById("start").disabled = true;
        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('change', this.getRangeNumber);
    }

}

const calcAppData = new appData();

calcAppData.eventListeners();