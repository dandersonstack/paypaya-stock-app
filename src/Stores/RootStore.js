import {observable, action, computed} from 'mobx'
import axios from 'axios';
import moment from 'moment';

var axiosInstance = axios.create({
    baseURL: 'http://13.59.89.132/stock-exchange-service/',
    timeout: 12000
});

export default class RootStore {
    @observable currentText = '';
    @observable currentSuggestions = [];
    @observable funds = 0;
    @observable myStocks = [];
    @observable username = '';
    @observable following = {};

    @action
    async buyStock(stock_symbol) {
        try {
            let path = 'market/buy';
            console.log(stock_symbol)
            await axiosInstance.post(path, {
              "stockSymbol": stock_symbol,
              "stockQuantity": 1
            });
            this.initalize();
        } catch (error) {
            console.log('there was an error: ', error);
        }
    }

    @action updateCurrentText(newText) {
        this.currentText = newText;
        this.fetchSuggestions(newText)
    }

    @computed get autoCompleteText() {
        if(this.currentSuggestions.length === 0) {
            return ''
        }
        return this.currentSuggestions[0].name;
    }

    @computed get formattedSuggestions() {
        let suggestions = this.currentSuggestions.splice(0, 5);
        return suggestions.map(suggestion =>{
            suggestion.following = this.following[suggestion.name];
            suggestion.can_buy = (this.funds - suggestion.currentPrice) > 0;
            suggestion.startOfCommerce = moment(suggestion.startOfCommerce).format('MM/DD/YYYY');
            suggestion.currentPrice    = parseFloat(suggestion.currentPrice).toFixed(2);
            suggestion.can_sell = this.myStocks[suggestion.name];
            return suggestion
        })
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
    async initalize() {
        try {
            let path = 'portfolio';
            let results = (await axiosInstance.get(path));
            this.funds = results.data.funds;
            this.myStocks = results.data.myStocks;
            this.username = results.data.username;
        } catch (error) {
            console.log('there was an error: ', error);
        }
    }

    @action
    async fetchSuggestions(currentInput) {
        try {
            let path = 'market/search';
            let results = (await axiosInstance.post(path, {"searchString": currentInput})).data.stocks;
            if(Array.isArray(results)) {
               this.currentSuggestions = results;
            }
        } catch(error) {
            console.log('there was an error: ', error);
        }

    }
}