const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorgaeTransactions = JSON.parse(
    localStorage.getItem('transactions')
)

let transactions =
    localStorgaeTransactions !== null ? localStorgaeTransactions : [];



//Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a text and amount');
    }
    else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
    }
}

//Add transactions to DOM list

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');

    //Add classes based on values
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML =
        item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onClick="removeTransaction(${transaction.id})">X</button>`;
    list.appendChild(item);

}

//update the balance, income, and expense
function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    
    const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    
    balance.innerText = `${total}`
    money_plus.innerText = `₹${income}`;
    money_minus.innerText = `₹${Math.abs(expense)}`;
}

//Remove transaction by id 
function removeTransaction(id) {
    transactions = transactions.filter((transaction)=> transaction.id !== id);
    updateLocalStorage();
    init();
}

//update the localStorage
function updateLocalStorage() {
    localStorage.setItem('transactions',JSON.stringify(transactions));
}
//initialize app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);;
    updateValues();
}

init();

//Generate random ID
function generateId() {
    return Math.floor(Math.random() * 100000000);
}
form.addEventListener('submit', addTransaction);