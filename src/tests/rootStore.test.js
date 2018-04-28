import RootStore from '../Stores/RootStore';

describe("RootStore", () => {
    it("is intialized with an empty answer key", () => {
        const rootStore = new RootStore();
        expect(rootStore.currentText).toBe('');
    });

    it("can add values to the current value", () => {
        const rootStore = new RootStore();
        expect(rootStore.currentText).toBe('');
        rootStore.addCharToText('1');
        rootStore.addCharToText('+');
        rootStore.addCharToText('4');
        expect(rootStore.currentText).toBe('1+4');
    });


    it("can rewrite the current value", () => {
        const rootStore = new RootStore();
        expect(rootStore.currentText).toBe('');
        rootStore.updateCurrentText('1+4');
        expect(rootStore.currentText).toBe('1+4');
    });

    it("can evaluate simple functions", () => {
        const rootStore = new RootStore();
        rootStore.updateCurrentText('1+4');
        rootStore.evaluteCurrentText();
        expect(rootStore.currentText).toBe('5');
    });

    it("can evaluate complex functions", () => {
        const rootStore = new RootStore();
        rootStore.updateCurrentText('(1+4)*84-9');
        rootStore.evaluteCurrentText();
        expect(rootStore.currentText).toBe('411');
    });

    it("displays syntax errors", () => {
        const rootStore = new RootStore();
        rootStore.updateCurrentText('4+');
        rootStore.evaluteCurrentText();
        expect(rootStore.currentText).toBe('SyntaxError');
    });

    it("hides anything but syntax errors", () => {
        let x = 2;
        const rootStore = new RootStore();
        rootStore.updateCurrentText('x+4');
        rootStore.evaluteCurrentText();
        expect(rootStore.currentText).toBe('SyntaxError');
    });

});