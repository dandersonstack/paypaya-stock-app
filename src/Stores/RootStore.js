import {observable, action} from 'mobx'

export default class RootStore {
    @observable currentText = '';


    @action updateCurrentText(newText) {
        this.currentText = newText
    }

    @action addCharToText(newChar) {
        this.currentText = this.currentText.concat(newChar)
    }

    @action evaluteCurrentText() {
        try {
            this.currentText = eval(this.currentText).toString()
        } catch(error){
            this.currentText = 'SyntaxError'
        }
    }
}