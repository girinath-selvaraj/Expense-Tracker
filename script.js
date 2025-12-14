const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const amount = +document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    if (!date || !description || !amount) {
        alert("Please fill all fields");
        return;
    }

    const transaction = {
        id: Date.now(),
        date,
        description,
        category,
        amount,
        type
    };

    transactions.push(transaction);
    updateLocalStorage();
    renderTransactions();
    form.reset();
}

function renderTransactions() {
    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
        const li = document.createElement("li");
        li.classList.add("transaction", t.type);

        li.innerHTML = `
            <span>${t.date} | ${t.description} | ${t.category} | ₹${t.amount}</span>
            <button class="delete-btn" onclick="deleteTransaction(${t.id})">X</button>
        `;

        list.appendChild(li);

        if (t.type === "income") {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });

    incomeEl.innerText = `₹${income}`;
    expenseEl.innerText = `₹${expense}`;
    balanceEl.innerText = `₹${income - expense}`;
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    renderTransactions();
}

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

renderTransactions();
