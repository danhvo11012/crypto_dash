import React from "react";
import styled, {css} from "styled-components";

import { AppContext } from "../App/AppProvider";
import CoinTile from "./CoinTile";

const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(130px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`

function getBodySectionCoins(coinList, filteredCoins) {
    return (
        (filteredCoins && Object.keys(filteredCoins)) || Object.keys(coinList).slice(0, 100)
    )
}

function getCoinsToDisplay(coinList, topSection, favorites, filteredCoins) {
    return topSection ? favorites : getBodySectionCoins(coinList, filteredCoins).slice(0,50);
}

export default function ({ topSection }) {
    return <AppContext.Consumer>
        {({ coinList, favorites, filteredCoins }) => (
            <CoinGridStyled>
                {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map((coinKey, k) => 
                    <CoinTile topSection={topSection} coinKey={coinKey} />
                )}
            </CoinGridStyled>
        )}
    </AppContext.Consumer>
}