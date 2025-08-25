document.addEventListener('DOMContentLoaded', () => {
    const state = {
        twins: [],
        styles: [],
        gallery: [],
        credits: 1250
    };

    // Element cache
    const DOMElements = {
        navLinks: document.querySelectorAll('.nav-link'),
        views: document.querySelectorAll('.view'),
        twinSelect: document.getElementById('twin-select'),
        styleSelect: document.getElementById('style-select'),
        promptInput: document.getElementById('prompt-input'),
        generatorForm: document.getElementById('generator-form'),
        outputArea: document.getElementById('output-area'),
        galleryGrid: document.getElementById('gallery-grid'),
        twinList: document.getElementById('twin-list'),
        createTwinBtn: document.getElementById('create-twin-btn'),
        cancelTwinCreationBtn: document.getElementById('cancel-twin-creation'),
        simulateUploadBtn: document.getElementById('simulate-upload-btn'),
        startTrainingBtn: document.getElementById('start-training-btn'),
        uploadFeedback: document.getElementById('upload-feedback'),
        newTwinName: document.getElementById('new-twin-name'),
        userCredits: document.getElementById('user-credits')
    };

    // --- App Logic ---

    const fetchAndInitialize = async () => {
        const response = await fetch('assets/dummy-data.json');
        const data = await response.json();
        state.twins = data.twins;
        state.styles = data.styles;
        state.gallery = data.gallery;
        
        updateUI();
    };

    const updateUI = () => {
        populateTwins();
        populateStyles();
        renderGallery();
        renderTwinsList();
        updateCredits();
    };

    const switchView = (viewId) => {
        DOMElements.views.forEach(view => view.classList.add('hidden'));
        document.getElementById(`${viewId}-view`).classList.remove('hidden');

        DOMElements.navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.view === viewId);
        });
    };

    const updateCredits = () => {
        DOMElements.userCredits.textContent = `Credits: ${state.credits}`;
    }

    // --- Render Functions ---

    const populateTwins = () => {
        DOMElements.twinSelect.innerHTML = state.twins
            .filter(twin => twin.status === 'ready')
            .map(twin => `<option value="${twin.id}">${twin.name}</option>`).join('');
    };

    const populateStyles = () => {
        DOMElements.styleSelect.innerHTML = state.styles
            .map(style => `<option value="${style.id}">${style.name}</option>`).join('');
    };

    const renderGallery = () => {
        DOMElements.galleryGrid.innerHTML = state.gallery
            .map(item => `
                <div class="gallery-card">
                    <img src="${item.url}" alt="${item.prompt}" loading="lazy">
                </div>
            `).join('');
    };
    
    const renderTwinsList = () => {
        DOMElements.twinList.innerHTML = state.twins
            .map(twin => `
                <div class="twin-card">
                    <img src="${twin.thumbnail}" alt="${twin.name}">
                    <h3>${twin.name}</h3>
                    <span class="status ${twin.status}">${twin.status}</span>
                </div>
            `).join('');
    };

    // --- Event Handlers ---

    const handleNavClick = (e) => {
        e.preventDefault();
        const viewId = e.target.dataset.view;
        if (viewId) {
            switchView(viewId);
        }
    };

    const handleGeneration = (e) => {
        e.preventDefault();
        if (state.credits < 5) {
            alert('Not enough credits!');
            return;
        }
        state.credits -= 5;
        updateCredits();
        
        const prompt = DOMElements.promptInput.value;
        const selectedTwin = DOMElements.twinSelect.options[DOMElements.twinSelect.selectedIndex].text;

        DOMElements.outputArea.innerHTML = `<div class="loading-spinner"></div>`;

        setTimeout(() => {
            const randomImage = state.gallery[Math.floor(Math.random() * state.gallery.length)];
            DOMElements.outputArea.innerHTML = `
                <div class="generated-image-wrapper">
                    <img src="${randomImage.url}" class="generated-image" alt="${prompt}">
                </div>
            `;
             // Add to gallery (simulation)
            const newItem = { ...randomImage, prompt: `${prompt} (Generated with ${selectedTwin})` };
            state.gallery.unshift(newItem);
            renderGallery();
        }, 2000);
    };
    
    const handleTwinCreationFlow = () => {
        DOMElements.createTwinBtn.addEventListener('click', () => switchView('twin-creation'));
        DOMElements.cancelTwinCreationBtn.addEventListener('click', () => switchView('twins'));

        DOMElements.simulateUploadBtn.addEventListener('click', () => {
            DOMElements.uploadFeedback.classList.remove('hidden');
            DOMElements.uploadFeedback.textContent = '15 photos selected successfully.';
            if(DOMElements.newTwinName.value.trim() !== '') {
                 DOMElements.startTrainingBtn.disabled = false;
            }
        });
        
        DOMElements.newTwinName.addEventListener('input', (e) => {
            if (e.target.value.trim() !== '' && !DOMElements.uploadFeedback.classList.contains('hidden')) {
                 DOMElements.startTrainingBtn.disabled = false;
            } else {
                 DOMElements.startTrainingBtn.disabled = true;
            }
        });

        DOMElements.startTrainingBtn.addEventListener('click', () => {
            if (state.credits < 150) {
                alert('Not enough credits for training!');
                return;
            }
            state.credits -= 150;
            updateCredits();

            const newTwin = {
                id: `twin_0${state.twins.length + 1}`,
                name: DOMElements.newTwinName.value.trim() || `New Twin ${state.twins.length}`,
                thumbnail: 'https://placehold.co/512x512/2a2a2a/e0e0e0?text=Training',
                status: 'training'
            };
            state.twins.push(newTwin);
            renderTwinsList();
            switchView('twins');
            
            // Reset form
            DOMElements.newTwinName.value = '';
            DOMElements.uploadFeedback.classList.add('hidden');
            DOMElements.startTrainingBtn.disabled = true;

            // Simulate training completion
            setTimeout(() => {
                const trainedTwin = state.twins.find(t => t.id === newTwin.id);
                if (trainedTwin) {
                    trainedTwin.status = 'ready';
                    trainedTwin.thumbnail = 'https://placehold.co/512x512/bb86fc/121212?text=Ready';
                    renderTwinsList();
                    populateTwins();
                }
            }, 15000);
        });
    };

    // --- Initialization ---

    DOMElements.navLinks.forEach(link => link.addEventListener('click', handleNavClick));
    DOMElements.generatorForm.addEventListener('submit', handleGeneration);
    handleTwinCreationFlow();
    
    fetchAndInitialize();
    switchView('generator');
});
