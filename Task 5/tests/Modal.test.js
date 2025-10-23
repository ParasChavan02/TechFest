const Modal = require('../components/Modal');

describe('Modal', () => {
    let modal;
    let modalElement;
    let openButton;
    
    beforeEach(() => {
        document.body.innerHTML = `
            <button id="openBtn">Open</button>
            <div id="modal" role="dialog" aria-hidden="true">
                <button class="modal-close">×</button>
            </div>
        `;
        
        modalElement = document.getElementById('modal');
        openButton = document.getElementById('openBtn');
        
        modal = new Modal({
            element: modalElement,
            openButton: openButton
        });
    });

    test('Modal initializes with correct state', () => {
        expect(modalElement.getAttribute('aria-hidden')).toBe('true');
        expect(modal.isOpen).toBe(false);
    });

    test('Modal opens correctly', () => {
        modal.open();
        expect(modalElement.getAttribute('aria-hidden')).toBe('false');
        expect(modal.isOpen).toBe(true);
    });

    test('Modal closes correctly', () => {
        modal.open();
        modal.close();
        expect(modalElement.getAttribute('aria-hidden')).toBe('true');
        expect(modal.isOpen).toBe(false);
    });
});