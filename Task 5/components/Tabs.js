class Tabs {
    constructor(options = {}) {
        this.container = options.element;
        this.tabList = this.container.querySelector('[role="tablist"]');
        this.tabs = Array.from(this.tabList.querySelectorAll('[role="tab"]'));
        this.panels = Array.from(this.container.querySelectorAll('[role="tabpanel"]'));
        
        this.init();
    }

    init() {
        // Add click events to tabs
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => this.switchTab(index));
            tab.addEventListener('keydown', (e) => this.handleKeyDown(e, index));
        });

        // Initialize ARIA attributes
        this.tabs.forEach((tab, index) => {
            const panel = this.panels[index];
            tab.setAttribute('aria-controls', `panel-${index}`);
            panel.setAttribute('id', `panel-${index}`);
            tab.setAttribute('tabindex', tab.getAttribute('aria-selected') === 'true' ? '0' : '-1');
        });
    }

    switchTab(index) {
        // Update tab states
        this.tabs.forEach((tab, i) => {
            const isSelected = i === index;
            tab.setAttribute('aria-selected', isSelected);
            tab.setAttribute('tabindex', isSelected ? '0' : '-1');
        });

        // Update panel visibility
        this.panels.forEach((panel, i) => {
            if (i === index) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });

        // Focus the selected tab
        this.tabs[index].focus();
    }

    handleKeyDown(e, index) {
        let targetIndex;

        switch(e.key) {
            case 'ArrowLeft':
                targetIndex = index - 1;
                if (targetIndex < 0) targetIndex = this.tabs.length - 1;
                break;
            case 'ArrowRight':
                targetIndex = index + 1;
                if (targetIndex >= this.tabs.length) targetIndex = 0;
                break;
            case 'Home':
                targetIndex = 0;
                break;
            case 'End':
                targetIndex = this.tabs.length - 1;
                break;
            default:
                return;
        }

        e.preventDefault();
        this.switchTab(targetIndex);
    }
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Tabs;
}