const body = document.querySelector('body');
const colorBtns = document.querySelectorAll('.circle');
const addBtn = document.querySelector('.add-transaction');
const deleteBtn = document.querySelector('.delete-everything');
const dark = document.querySelector('.dark');
const newTransaction = document.querySelector('.new-transaction');
const workBtns = document.querySelectorAll('.workButtons');
const error = document.querySelector('.error');
const income = document.querySelector('.income');
const expenses = document.querySelector('.expenses');
const inputName = document.querySelector('.transaction-name');
const inputSum = document.querySelector('.transaction-sum');
const category = document.querySelector('.category');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const funds = document.querySelector('.active-funds');

let money = 0;
let updateMoney = 0;

const changeBgc = () => {
	colorBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			if (btn.classList.contains('light')) {
				body.style.backgroundColor = 'white';
				body.style.color = 'black';
				addBtn.style.color = 'black';
				deleteBtn.style.color = 'black';
			} else {
				body.style.backgroundColor = '#050311';
				body.style.color = 'white';
				addBtn.style.color = 'white';
				deleteBtn.style.color = 'white';
				dark.style.border = '1px solid white';
			}
		});
	});
};

changeBgc();

const showNewTransaction = () => {
	newTransaction.style.display = 'flex';
};

const check = () => {
	if (
		inputName.value !== '' &&
		inputSum.value !== '' &&
		category.value !== '0'
	) {
		error.style.visibility = 'hidden';
		newTransaction.style.display = 'none';
		newOne();
		inputName.value = '';
		inputSum.value = '';
		category.value = '0';
	} else if (
		inputName.value == '' ||
		inputSum.value == '' ||
		category.value == '0'
	) {
		error.style.visibility = 'visible';
	}
};

const newOne = () => {
	if (inputSum.value > 0 && category.value == '1') {
		const newT = document.createElement('div');
		newT.innerHTML = `<p class = 'incomeText'> <span><i class="lni lni-cash-app" > </i> ${inputName.value} </span> 
		<span class='dollars'> ${inputSum.value} zł </span> <i class="lni lni-close"></i></p>`;
		income.appendChild(newT);
		addFunds();
	} else if (inputSum.value < 0 && category.value !== '1') {
		const newT = document.createElement('div');
		if (category.value == '2') {
			newT.innerHTML = `<p class = 'expenseText'> <span><i class="lni lni-shopping-basket"></i> ${inputName.value} </span>  <span class='dollars'> ${inputSum.value} zł </span> <i class="lni lni-close"></i></p>`;
		} else if (category.value == '3') {
			newT.innerHTML = `<p class = 'expenseText'> <span><i class="lni lni-pizza"></i> ${inputName.value} </span>  
			<span class='dollars'> ${inputSum.value} zł </span> <i class="lni lni-close"></i></p>`;
		} else if (category.value == '4') {
			newT.innerHTML = `<p class = 'expenseText'> <span><i class="lni lni-facetime"></i> ${inputName.value} </span>  
			<span class='dollars'> ${inputSum.value} zł </span> <i class="lni lni-close"></i></p>`;
		}

		expenses.appendChild(newT);
		addFunds();
	}
};

const cancelNew = () => {
	inputName.value = '';
	inputSum.value = '';
	category.value = '0';
	newTransaction.style.display = 'none';
	error.style.visibility = 'hidden';
};

const addFunds = () => {
	money = parseInt(money) + parseInt(inputSum.value);
	funds.textContent = money + 'zł';
};

income.addEventListener('click', (e) => {
	if (e.target.classList.contains('lni-close')) {

		e.target.parentElement.remove();
		updateMoney = parseInt(e.target.previousElementSibling.textContent);
		money = money - updateMoney
		funds.textContent = money + 'zł';
	}
});


expenses.addEventListener('click', (e) => {
	if (e.target.classList.contains('lni-close')) {

		e.target.parentElement.remove();
		updateMoney = parseInt(e.target.previousElementSibling.textContent);
		money = money - updateMoney
		funds.textContent = money + 'zł';
	}
});


const deleteAll = () => {
	money = 0
	updateMoney = 0
	income.innerHTML = '<p>Przychód:</p>'
	expenses.innerHTML = '  <p>Wydatki:</p>'
	funds.textContent = '0zł'
}

deleteBtn.addEventListener('click', deleteAll)
cancelBtn.addEventListener('click', cancelNew);
saveBtn.addEventListener('click', check);
addBtn.addEventListener('click', showNewTransaction);
