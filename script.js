
(function () {
    const STORAGE_KEY = 'cf100_solved_v1';
    const checkboxes = Array.from(document.querySelectorAll('table tr td input[type="checkbox"]'));
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

    function getRowIdFromCheckbox(checkbox) {
        const row = checkbox.closest('tr');
        if (!row) return null;
        const idCell = row.querySelector('td');
        if (!idCell) return null;
        return idCell.textContent.trim();
    }

    function getRowTitleFromCheckbox(checkbox) {
        const row = checkbox.closest('tr');
        if (!row) return '';
        const titleAnchor = row.querySelector('td:nth-child(2) a');
        if (!titleAnchor) return '';
        return titleAnchor.textContent.trim();
    }

    function getRowProblemLinkFromCheckbox(checkbox) {
        const row = checkbox.closest('tr');
        if (!row) return '';
        const titleAnchor = row.querySelector('td:nth-child(2) a');
        if (!titleAnchor) return '';
        return titleAnchor.getAttribute('href') || '';
    }

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

    function updateProgress() {
        const solved = checkboxes.filter(cb => cb.checked).length;
        progressText.textContent = 'Solved: ' + solved + ' / ' + checkboxes.length;
    }

    function openModal() {
        randomModal.classList.remove('hidden');
    }

    function closeModal() {
        randomModal.classList.add('hidden');
    }

    function openUnsolvedModal() {
        unsolvedModal.classList.remove('hidden');
    }

    function closeUnsolved() {
        unsolvedModal.classList.add('hidden');
    }

    const state = loadState();
    checkboxes.forEach((cb) => {
        const rowId = getRowIdFromCheckbox(cb);
        if (rowId && state[rowId] === true) cb.checked = true;

        cb.addEventListener('change', function () {
            const id = getRowIdFromCheckbox(cb);
            if (!id) return;
            state[id] = cb.checked;
            saveState(state);
            updateProgress();
        });
    });

    randomButton.addEventListener('click', function () {
        const unsolved = checkboxes.filter(cb => !cb.checked);
        const source = unsolved.length > 0 ? unsolved : checkboxes;
        const pick = source[Math.floor(Math.random() * source.length)];
        if (!pick) return;

        const row = pick.closest('tr');
        const rowId = getRowIdFromCheckbox(pick);
        const rowTitle = getRowTitleFromCheckbox(pick);
        const link = row ? row.querySelector('td:nth-child(2) a') : null;

        if (row) {
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            row.style.outline = '2px solid #f6a623';
            setTimeout(function () { row.style.outline = ''; }, 1800);
        }

        if (link && link.href) {
            randomQuestionText.textContent = '#' + rowId + ' - ' + rowTitle;
            openRandomLink.href = link.href;
            openRandomLink.classList.remove('disabled');
            openModal();
        } else {
            randomQuestionText.textContent = '#' + rowId + ' - ' + rowTitle + ' (Problem link not available)';
            openRandomLink.href = '#';
            openRandomLink.classList.add('disabled');
            openModal();
        }
    });

    closeRandomModal.addEventListener('click', closeModal);

    closeUnsolvedModal.addEventListener('click', closeUnsolved);

    randomModal.addEventListener('click', function (event) {
        if (event.target === randomModal) {
            closeModal();
        }
    });

    unsolvedModal.addEventListener('click', function (event) {
        if (event.target === unsolvedModal) {
            closeUnsolved();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape') return;
        if (!randomModal.classList.contains('hidden')) {
            closeModal();
        }
        if (!unsolvedModal.classList.contains('hidden')) {
            closeUnsolved();
        }
    });

    unsolvedButton.addEventListener('click', function () {
        const unsolved = checkboxes
            .filter(cb => !cb.checked)
            .map(cb => ({
                id: getRowIdFromCheckbox(cb),
                title: getRowTitleFromCheckbox(cb),
                link: getRowProblemLinkFromCheckbox(cb)
            }))
            .filter(item => item.id);

        unsolved.sort(function (a, b) {
            return Number(a.id) - Number(b.id);
        });

        unsolvedList.innerHTML = '';

        if (unsolved.length === 0) {
            unsolvedSummary.textContent = 'Awesome! All 100 questions are solved.';
            const li = document.createElement('li');
            li.textContent = 'No unsolved problems left.';
            unsolvedList.appendChild(li);
            openUnsolvedModal();
            return;
        }

        unsolvedSummary.textContent = 'You have ' + unsolved.length + ' unsolved problem(s).';

        unsolved.forEach(function (item) {
            const li = document.createElement('li');

            if (item.link) {
                const a = document.createElement('a');
                a.href = item.link;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = item.id + ' - ' + item.title;
                li.appendChild(a);
            } else {
                li.textContent = item.id + ' - ' + item.title + ' (link unavailable)';
            }

            unsolvedList.appendChild(li);
        });

        openUnsolvedModal();
    });

    updateProgress();
})();