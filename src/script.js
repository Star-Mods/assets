function createItemList({
                            dataUrl,
                            containerSelector,
                            searchInputSelector,
                            renderItemFn,
                            getFilterTextFn,
                            onRendered,
                            debounceDelay = 300,
                        }) {
    const container = document.querySelector(containerSelector);
    const searchInput = document.querySelector(searchInputSelector);
    const getFilterText = getFilterTextFn || (el => el.getAttribute('data-name') || '');

    let debounceTimer = null;

    async function load() {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'flex'; // show preloader
        try {
            const response = await fetch(dataUrl);
            if (!response.ok) throw new Error(`Failed to load ${dataUrl}`);
            const text = await response.text();
            const items = text.split('\n').map(line => line.trim()).filter(Boolean);
            render(items);
            attachSearch();
        } catch (e) {
            console.error(e);
        } finally {
            if (preloader) preloader.style.display = 'none'; // hide preloader
        }
    }

    function render(items) {
        container.innerHTML = '';
        items.forEach(itemName => {
            const el = renderItemFn(itemName);
            el.setAttribute('data-name', itemName.toLowerCase());
            container.appendChild(el);
        });
        if (typeof onRendered === 'function') onRendered();
    }

    function attachSearch() {
        if (!searchInput) return;
        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const query = searchInput.value.trim().toLowerCase();
                for (const el of container.children) {
                    const text = getFilterText(el).toLowerCase();
                    el.style.display = text.includes(query) ? '' : 'none';
                }
                if (typeof onRendered === 'function') onRendered();
            }, debounceDelay);
        });
    }

    return { load };
}
