(function () {
    const STORAGE_KEY = 'cf100_solved_v1';
    const progressText = document.getElementById('progressText');
    const randomButton = document.getElementById('pickRandomQuestion');
    const unsolvedButton = document.getElementById('showUnsolvedProblems');
    const randomModal = document.getElementById('randomQuestionModal');
    const randomQuestionText = document.getElementById('randomQuestionText');
    const openRandomLink = document.getElementById('openRandomLink');
    const closeRandomModal = document.getElementById('closeRandomModal');
    const unsolvedModal = document.getElementById('unsolvedModal');
    const unsolvedSummary = document.getElementById('unsolvedSummary');
    const unsolvedList = document.getElementById('unsolvedList');
    const closeUnsolvedModal = document.getElementById('closeUnsolvedModal');
    
    const tbody = document.getElementById('problemsBody');

    // Parse the CSV data from cf_sheet.js
    function parseCSV(csv) {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',');
        const result = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i]) continue;
            // Match commas that are not inside quotes
            const row = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => {
                return col.replace(/^"|"$/g, '').trim();
            });
            const obj = {};
            headers.forEach((h, j) => {
                obj[h.trim()] = row[j];
            });
            result.push(obj);
        }
        return result;
    }

    const problemsData = parseCSV(csvData);

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return {};
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (e) {
            return {};
        }
    }

    function saveState(state) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    const state = loadState();
    const checkboxes = [];

    function updateProgress() {
        const solved = checkboxes.filter(cb => cb.checked).length;
        progressText.textContent = `Solved: ${solved} / ${problemsData.length}`;
    }

    function openModal(modal) {
        modal.classList.remove('hidden');
    }

    function closeModal(modal) {
        modal.classList.add('hidden');
    }

    // Render table with columns: ID, Problem Name, Rating, Solved Count, Solution, Solved
    problemsData.forEach((problem) => {
        const tr = document.createElement('tr');
        
        // 1. ID (s_no)
        const tdId = document.createElement('td');
        tdId.textContent = problem.s_no;
        tr.appendChild(tdId);
        
        // 2. Problem Name (link)
        const tdName = document.createElement('td');
        if (problem.link) {
            const a = document.createElement('a');
            a.href = problem.link;
            a.target = '_blank';
            a.textContent = problem.name;
            tdName.appendChild(a);
        } else {
            tdName.textContent = problem.name;
        }
        tr.appendChild(tdName);
        
        // 3. Rating
        const tdRating = document.createElement('td');
        tdRating.textContent = problem.rating;
        tr.appendChild(tdRating);
        
        // 4. Solved Count
        const tdSolvedCount = document.createElement('td');
        tdSolvedCount.textContent = problem.solvedCount;
        tr.appendChild(tdSolvedCount);
        
        // 5. Solution (Empty link for now)
        const tdSol = document.createElement('td');
        const solLink = document.createElement('a');
        solLink.href = '#';
        solLink.textContent = 'Code';
        tdSol.appendChild(solLink);
        tr.appendChild(tdSol);
        
        // 6. Solved (Checkbox)
        const tdSolved = document.createElement('td');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.setAttribute('aria-label', 'Mark as solved');
        cb.dataset.id = problem.s_no; 
        
        if (state[problem.s_no]) {
            cb.checked = true;
        }
        
        cb.addEventListener('change', () => {
            state[problem.s_no] = cb.checked;
            saveState(state);
            updateProgress();
        });
        
        checkboxes.push(cb);
        tdSolved.appendChild(cb);
        tr.appendChild(tdSolved);
        
        // Save reference to row for random scrolling
        problem.rowElement = tr;
        
        tbody.appendChild(tr);
    });
    
    updateProgress();

    randomButton.addEventListener('click', function () {
        const unsolved = problemsData.filter(p => !state[p.s_no]);
        const source = unsolved.length > 0 ? unsolved : problemsData;
        const pick = source[Math.floor(Math.random() * source.length)];
        if (!pick) return;

        if (pick.rowElement) {
            pick.rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            pick.rowElement.style.outline = '2px solid #f6a623';
            setTimeout(() => { pick.rowElement.style.outline = ''; }, 1800);
        }

        if (pick.link) {
            randomQuestionText.textContent = `#${pick.s_no} - ${pick.name}`;
            openRandomLink.href = pick.link;
            openRandomLink.classList.remove('disabled');
        } else {
            randomQuestionText.textContent = `#${pick.s_no} - ${pick.name} (Problem link not available)`;
            openRandomLink.href = '#';
            openRandomLink.classList.add('disabled');
        }
        openModal(randomModal);
    });

    closeRandomModal.addEventListener('click', () => closeModal(randomModal));
    closeUnsolvedModal.addEventListener('click', () => closeModal(unsolvedModal));

    randomModal.addEventListener('click', (event) => {
        if (event.target === randomModal) closeModal(randomModal);
    });

    unsolvedModal.addEventListener('click', (event) => {
        if (event.target === unsolvedModal) closeModal(unsolvedModal);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        if (!randomModal.classList.contains('hidden')) closeModal(randomModal);
        if (!unsolvedModal.classList.contains('hidden')) closeModal(unsolvedModal);
    });

    unsolvedButton.addEventListener('click', function () {
        const unsolved = problemsData.filter(p => !state[p.s_no]);

        unsolvedList.innerHTML = '';

        if (unsolved.length === 0) {
            unsolvedSummary.textContent = 'Awesome! All questions are solved.';
            const li = document.createElement('li');
            li.textContent = 'No unsolved problems left.';
            unsolvedList.appendChild(li);
        } else {
            unsolvedSummary.textContent = `You have ${unsolved.length} unsolved problem(s).`;
            unsolved.forEach((item) => {
                const li = document.createElement('li');
                if (item.link) {
                    const a = document.createElement('a');
                    a.href = item.link;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.textContent = `${item.s_no} - ${item.name} (${item.id})`;
                    li.appendChild(a);
                } else {
                    li.textContent = `${item.s_no} - ${item.name} (link unavailable)`;
                }
                unsolvedList.appendChild(li);
            });
        }

        openModal(unsolvedModal);
    });
})();