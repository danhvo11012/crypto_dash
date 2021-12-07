import React from "react";
import styled, {css} from "styled-components";

const CoinImageStyled = styled.img`
    height: 50px;

    ${props => props.spotlight && css`
        margin: auto;
        display: block;
        height: 200px;
    `}
`

export default function({coin, spotlight}) {
    return(
        <CoinImageStyled
            spotlight={spotlight}
            alt={coin.CoinSymbol}
            src={`https://www.cryptocompare.com/${coin.ImageUrl}`}
        />
    );
}