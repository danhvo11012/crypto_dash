import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import PriceTile from "./PriceTile";

const PriceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 40px;
`

export default function ({props}) {
    return(
        <AppContext.Consumer>
            {({prices, currentFavorite}) => (
                <PriceGrid>
                    {prices.map((price, k) => <PriceTile price={price} index={k} key={k} currentFavorite={currentFavorite} />)}
                </PriceGrid>
            )}
        </AppContext.Consumer>
    )
}