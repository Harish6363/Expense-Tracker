const expenseForm = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");
const errorMessage = document.getElementById("error-message");

let expenses = [];

// Load from localStorage
const savedExpenses = localStorage.getItem("expenses");
if (savedExpenses) {
  expenses = JSON.parse(savedExpenses);
  updateExpenseList();
  updateTotal();
}

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (title === "" || isNaN(amount) || amount <= 0) {
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none";

  const expense = {
    id: Date.now(),
    title,
    amount
  };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  updateExpenseList();
  updateTotal();

  titleInput.value = "";
  amountInput.value = "";
});

function updateExpenseList() {
  expenseList.innerHTML = "";

  expenses.forEach(exp => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${exp.title}: ₹${exp.amount.toFixed(2)}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";

    deleteBtn.addEventListener("click", () => {
      expenses = expenses.filter(e => e.id !== exp.id);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      updateExpenseList();
      updateTotal();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
  });
}

function updateTotal() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}
