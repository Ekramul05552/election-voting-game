let totalSeats = 0;
let currentVotes = 0;
let pendingSelection = null;

let voteData = {
    "নৌকা": 0,
    "ধানের শীষ": 0,
    "দাড়ি পাল্লা": 0,
    "NCP": 0,
    "PGP": 0
};

const setupForm = document.getElementById('setup-form');
const setupScreen = document.getElementById('setup-screen');
const votingScreen = document.getElementById('voting-screen');
const resultsScreen = document.getElementById('results-screen');
const voteCounter = document.getElementById('vote-counter');
const tallyList = document.getElementById('tally-list');
const confirmModal = document.getElementById('confirm-modal');
const pendingText = document.getElementById('pending-candidate');

setupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    totalSeats = parseInt(document.getElementById('total-seats').value);
    if (totalSeats > 0) {
        setupScreen.classList.remove('active');
        votingScreen.classList.add('active');
        updateCounter();
    }
});

document.querySelectorAll('.vote-btn').forEach(button => {
    button.addEventListener('click', () => {
        pendingSelection = button.getAttribute('data-candidate');
        pendingText.innerText = pendingSelection;
        confirmModal.classList.add('show');
    });
});

document.getElementById('cancel-vote').addEventListener('click', () => {
    confirmModal.classList.remove('show');
    pendingSelection = null;
});

document.getElementById('confirm-vote').addEventListener('click', () => {
    if (pendingSelection && currentVotes < totalSeats) {
        voteData[pendingSelection]++;
        currentVotes++;
        updateCounter();
        confirmModal.classList.remove('show');

        if (currentVotes === totalSeats) {
            showResults();
        }
    }
});

function updateCounter() {
    voteCounter.innerText = `প্রদত্ত ভোট: ${currentVotes} / ${totalSeats}`;
}

function showResults() {
    votingScreen.classList.remove('active');
    resultsScreen.classList.add('active');

    const sorted = Object.entries(voteData).sort((a, b) => b[1] - a[1]);
    const winner = sorted[0];
    const runnerUp = sorted[1];
    const difference = winner[1] - runnerUp[1];

    document.getElementById('winner-name').innerText = `${winner[0]} বিজয়ী!`;
    document.getElementById('winner-diff').innerText = `ভোটের ব্যবধান: ${difference}`;

    tallyList.innerHTML = sorted.map(([name, count]) => `
        <div class="tally-item">
            <span>${name}</span>
            <span><strong>${count}</strong></span>
        </div>
    `).join('');
}