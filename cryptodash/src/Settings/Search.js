import React from "react";
import styled from 'styled-components';
import { AppContext } from "../App/AppProvider";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";

var _ = require('lodash');
var fuzz = require('fuzzy');

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
`

const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    border: 1px solid;
    height: 25px;
    color: #1163c9;
    place-self: center left;
`

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    let allCoinSymbols = Object.keys(coinList);
    let allCoinNames = allCoinSymbols.map(symbol => coinList[symbol].CoinName);
    let allCoinResults = allCoinSymbols.concat(allCoinNames);

    let filteredSearchResults = fuzz
        .filter(inputValue, allCoinResults, {})
        .map(result => result.string);

    let filteredCoins = _.pickBy(coinList, (result, symbolKey) => {
        let coinName = result.CoinName;
        return (_.includes(filteredSearchResults, symbolKey) || _.includes(filteredSearchResults, coinName));
    });

    setFilteredCoins(filteredCoins);
}, 500)


function filterCoins(event, coinList, setFilteredCoins) {
    let inputValue = event.target.value;
    if (!inputValue) setFilteredCoins(null);
    handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function() {
    return (
        <AppContext.Consumer>
            {({coinList, setFilteredCoins}) => {
                return(
                    <SearchGrid>
                        <h2>Search for Coin</h2>
                        <SearchInput onKeyUp={(e) => filterCoins(e, coinList, setFilteredCoins)} />
                    </SearchGrid>
                )
            }}
        </AppContext.Consumer>
    );
}