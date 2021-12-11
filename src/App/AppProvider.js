import React from "react";
import moment from 'moment';

/**Set CryptoCompare API key */
require('dotenv').config();
const apiKey = process.env.REACT_APP_CC_API_KEY;
const cc = require('cryptocompare');
cc.setApiKey(apiKey);

/**Import Lodash for Array manipulation */
var _ = require('lodash');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNIT = 10;

export class AppProvider extends React.Component {
    /**State Provider for App */
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC'],
            ...this.savedSetting(),
            timeInterval: 'days',
            changeTISelect: this.changeTISelect,
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setCurrentFavorite: this.setCurrentFavorite,
            setFilteredCoins: this.setFilteredCoins,
        }
    }

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
        this.fetchCandlestick();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }

    fetchPrices = async () => {
        // Skip fetching prices if on the first visit. Instead, let users confirm their
        // favorite coins first
        if (this.state.firstVisit) return;

        // Only fetch prices if not the first visit
        let prices = await this.ccPrices();
        this.setState({prices});
    }

    ccPrices = async () => {
        let returnData = [];
        for (let i = 0; i < this.state.favorites.length; i++) {
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData);
            } catch (e) {
                console.warn("Fetch price error: ", e);
            }
        }
        return returnData;
    }

    fetchHistorical = async () => {
        if (this.state.firstVisit) return;

        let historicalResults = await this.ccHistorical();
        let historicalData = [
            {
                name: this.state.currentFavorite,
                data: historicalResults.map((ticker, index) => [
                    moment().subtract({[this.state.timeInterval]: TIME_UNIT - index}).valueOf(),
                    ticker.USD
                ])
            }
        ]

        this.setState({historicalData})
    }

    ccHistorical = () => {
        try{
            let promises = [];
            for (let unit = TIME_UNIT; unit >= 0; unit--) {
                promises.push(
                    cc.priceHistorical(
                        this.state.currentFavorite,
                        ['USD'],
                        moment()
                            .subtract({ [this.state.timeInterval]: unit })
                            .toDate()
                    )
                )
            }
    
            return Promise.all(promises);
        } catch (e) {
            console.error(e);
        }
        return;
    }

    fetchCandlestick = async () => {
        const candlestickData = await (await fetch('https://demo-live-data.highcharts.com/aapl-ohlc.json')).json();
        this.setState({candlestickData});
    }

    savedSetting() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) return {page: 'settings', firstVisit: true}
        let {favorites, currentFavorite} = cryptoDashData;
        return {favorites, currentFavorite};
    }

    // Check if a key exists in favorites
    isInFavorites = key => _.includes(this.state.favorites, key);

    addCoin = key => {
        let favorites = [...this.state.favorites];

        if (favorites.length < MAX_FAVORITES) {
            if (!this.isInFavorites(key)) {
                favorites.push(key);
                this.setState({ favorites });
            }
        }
    }

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({ favorites: _.pull(favorites, key)});
    }

    /**Updater of page */
    setPage = page => this.setState({page});

    confirmFavorites = () => {
        let currentFavorite = this.state.currentFavorite? 
            ((_.includes(this.state.favorites, this.state.currentFavorite)) ? 
                this.state.currentFavorite : this.state.favorites[0]) : this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite,
            prices: null
        }, () => {
            this.fetchPrices();
            this.fetchHistorical();
        });
        
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: [...this.state.favorites],
            currentFavorite
        }));
    }

    setCurrentFavorite = (newCurrentFavorite) => {
        // Set current favorite for the app's state
        this.setState({
            currentFavorite: newCurrentFavorite,
            historicalData: null,
        }, this.fetchHistorical)

        // Set current favorite for the browser's local storage
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite: newCurrentFavorite
        }));


    }

    setFilteredCoins = (filteredCoins) => {
        this.setState({filteredCoins});
    }

    changeTISelect = ti => {
        console.log(ti);
        this.setState({timeInterval: ti, historicalData: null}, this.fetchHistorical);
    }


    render() {
        return(
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}