import {observable, action, computed} from 'mobx'
import axios from 'axios';

var axiosInstance = axios.create({
    baseURL: 'http://13.59.89.132/',
    timeout: 12000
});

export default class RootStore {
    @observable currentText = '';
    @observable currentSuggestions = [];

    @action updateCurrentText(newText) {
        this.currentText = newText;
        this.fetchSuggestions(newText)
    }

    @computed get filteredSuggestions() {
        let count = 0;
        return this.currentSuggestions.filter(suggestion => {
          const keep =
            (!this.currentText || suggestion.name.toLowerCase().indexOf(this.currentText.toLowerCase()) !== -1) &&
            count < 5;

          if (keep) {
            count += 1;
          }

          return keep;
        });
    }

    @action
    async fetchSuggestions(currentInput) {
        try {
           let path = 'stock-exchange-service/market/search';
           let results = (await axiosInstance.post(path, {"searchString": currentInput})).data.stocks;
           if(Array.isArray(results)) {
               this.currentSuggestions = results;
           }
        } catch(error) {
            console.log('there was an error: ', error);
        }

    }
}