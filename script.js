document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const size = 4; // 4x4 grid
    let numbers = Array.from({ length: (size * size) / 2 }, (_, i) => i + 1);
    numbers = numbers.concat(numbers); // Duplicate numbers for matching
    numbers.sort(() => Math.random() - 0.5); // Shuffle the numbers

    let selected = [];
    let matchedCount = 0;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.number = numbers[i];
        cell.addEventListener('click', onCellClick);
        grid.appendChild(cell);
    }

    function onCellClick(event) {
        const cell = event.target;
        if (cell.classList.contains('matched') || selected.length === 2 || cell.textContent) {
            return;
        }

        cell.textContent = cell.dataset.number;
        selected.push(cell);

        if (selected.length === 2) {
            if (selected[0].dataset.number === selected[1].dataset.number) {
                selected.forEach(cell => cell.classList.add('matched'));
                matchedCount += 2;
                if (matchedCount === size * size) {
                    setTimeout(() => alert('You win!'), 500);
                }
                selected = [];
            } else {
                setTimeout(() => {
                    selected.forEach(cell => (cell.textContent = ''));
                    selected = [];
                }, 1000);
            }
        }
    }
});
