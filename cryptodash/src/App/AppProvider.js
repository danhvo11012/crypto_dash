import React from "react";

/**Set CryptoCompare API key */
require('dotenv').config();
const apiKey = process.env.REACT_APP_CC_API_KEY;
const cc = require('cryptocompare');
cc.setApiKey(apiKey);

/**Import Lodash for Array manipulation */
var _ = require('lodash');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
    /**State Provider for App */
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC'],
            ...this.savedSetting(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
        }
    }

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices()
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

    savedSetting() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) return {page: 'settings', firstVisit: true}
        let {favorites} = cryptoDashData;
        return {favorites};
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
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        }, () => {
            this.fetchPrices()
        });
        
        localStorage.setItem('cryptoDash', JSON.stringify({
            favorites: [...this.state.favorites]
        }));
    }

    setFilteredCoins = (filteredCoins) => {
        this.setState({filteredCoins});
    }

    render() {
        return(
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}