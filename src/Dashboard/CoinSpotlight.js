import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import CoinImage from "../Shared/CoinImage";
import { Tile } from "../Shared/Tile";
import PriceChart from "./PriceChart";

const SpotlightName = styled.h2`
    text-align: center;
`

export default function() {
    return(
        <AppContext.Consumer>
            {({currentFavorite, coinList}) => (
                <Tile>
                    <SpotlightName>{coinList[currentFavorite].CoinName}</SpotlightName>
                    <CoinImage coin={coinList[currentFavorite]} spotlight />
                </Tile>
            )}
        </AppContext.Consumer>
    )
}