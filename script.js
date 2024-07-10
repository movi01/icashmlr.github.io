const correctPassword = '2008';
let total = 0;
const counts = {
    30000: 0,
    35000: 0,
    40000: 0,
    45000: 0,
    50000: 0,
    55000: 0,
    70000: 0,
    75000: 0
};
const recentOutputs = [];
const maxRecentOutputs = 3;
const exchangeRates = {
    dollar: 0.00068, // معدل تحويل الدولار
    euro: 0.00059   // معدل تحويل اليورو
};

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === correctPassword) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    } else {
        alert('رمز غير صحيح');
    }
}

function addAmount(amount) {
    total += amount;
    counts[amount]++;
    updateOutputs();
}

function updateOutputs() {
    const totalElement = document.getElementById('total');
    const totalDollarElement = document.getElementById('total-dollar');
    const totalEuroElement = document.getElementById('total-euro');

    totalElement.textContent = total;
    totalDollarElement.textContent = (total * exchangeRates.dollar).toFixed(2);
    totalEuroElement.textContent = (total * exchangeRates.euro).toFixed(2);

    for (const amount in counts) {
        document.getElementById(`count${amount}`).textContent = counts[amount];
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString('ar-EG') + ' ' + now.toLocaleTimeString('ar-EG');
    recentOutputs.unshift({ amount: total, date: formattedDate });

    if (recentOutputs.length > maxRecentOutputs) {
        recentOutputs.pop();
    }

    const recentList = document.getElementById('recent-list');
    recentList.innerHTML = '';

    for (const output of recentOutputs) {
        const listItem = document.createElement('li');
        listItem.textContent = `${output.amount} د.ع (${(output.amount * exchangeRates.dollar).toFixed(2)} $ / ${(output.amount * exchangeRates.euro).toFixed(2)} €) - ${output.date}`;
        recentList.appendChild(listItem);
    }
}