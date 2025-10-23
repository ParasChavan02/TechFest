const Tabs = require('../components/Tabs');

describe('Tabs', () => {
    let tabs;
    let container;
    
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="tabs">
                <div role="tablist">
                    <button role="tab" aria-selected="true">Tab 1</button>
                    <button role="tab" aria-selected="false">Tab 2</button>
                </div>
                <div>
                    <div role="tabpanel">Panel 1</div>
                    <div role="tabpanel" hidden>Panel 2</div>
                </div>
            </div>
        `;
        
        container = document.getElementById('tabs');
        tabs = new Tabs({ element: container });
    });

    test('Tabs initialize with correct state', () => {
        const firstTab = container.querySelector('[role="tab"]');
        const firstPanel = container.querySelector('[role="tabpanel"]');
        
        expect(firstTab.getAttribute('aria-selected')).toBe('true');
        expect(firstPanel.hasAttribute('hidden')).toBe(false);
    });

    test('Switching tabs updates aria states', () => {
        const [firstTab, secondTab] = container.querySelectorAll('[role="tab"]');
        secondTab.click();
        
        expect(firstTab.getAttribute('aria-selected')).toBe('false');
        expect(secondTab.getAttribute('aria-selected')).toBe('true');
    });
});