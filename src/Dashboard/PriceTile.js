import React from "react";
import styled, {css} from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import { CoinHeaderGridStyled } from "../Settings/CoinHeaderGrid";
import { AppContext } from "../App/AppProvider";

const _ = require('lodash');

const numberFormat = number => {
    if (number) {
        let strNumber = number.toLocaleString('en-US', {minimumFractionDigits: 6}).slice(0, 7);
        let decimalIndex = (_.indexOf(strNumber, "."));
        if (decimalIndex === strNumber.length - 1) strNumber = _.slice(strNumber, 0, decimalIndex);;
        return strNumber;
    }
    return "N/A";
}

const JustifyRight = styled.div`
    justify-self: right;
`

const JustifyLeft = styled.div`
    justify-self: left;
`

const TickerPrice = styled.div`
    ${fontSizeBig}
`

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        ${fontSize3}
        justify-items: right;
        display: grid;
        grid-gap: 5px;
        grid-template-columns: repeat(3, 1fr);
    `}

    ${props => props.currentFavorite && css`
        ${greenBoxShadow}
        pointer-events: none;
    `}
`

const ChangePctStyled = styled.div`
    ${props => props.data.CHANGEPCT24HOUR && (props.data.CHANGEPCT24HOUR < 0) ? 
    css` color: red; ` : css` color: green `}
`

const ChangePct = ({data}) => {
    return(
        <JustifyRight>
            <ChangePctStyled data={data}>
                {numberFormat(data.CHANGEPCT24HOUR)}% 
            </ChangePctStyled>
        </JustifyRight>
    )
}

const PriceTile = ({symbol, data, currentFavorite, setCurrentFavorite}) => {

    return(
        <PriceTileStyled currentFavorite={currentFavorite} onClick={() => setCurrentFavorite(symbol)}>
            <CoinHeaderGridStyled>
                <div>{symbol}</div>
                <ChangePct data={data} />
            </CoinHeaderGridStyled>
            <TickerPrice>
                ${numberFormat(data.PRICE)}
            </TickerPrice>
        </PriceTileStyled>
    )
}

const PriceTileCompact = ({symbol, data, setCurrentFavorite}) => {
    return(
        <PriceTileStyled compact onClick={() => setCurrentFavorite(symbol)}>
            <JustifyLeft>{symbol}</JustifyLeft>
            <ChangePct data={data} />
            ${numberFormat(data.PRICE)}
        </PriceTileStyled>
    )
}

export default function({ price, index }) {

    let symbol = Object.keys(price)[0];
    let data = price[symbol]['USD']
    let TileClass = index < 10 ? PriceTile : PriceTileCompact;

    return (
        <AppContext.Consumer>
            {({currentFavorite, setCurrentFavorite}) => (
                <TileClass 
                    symbol={symbol} 
                    data={data} 
                    currentFavorite={currentFavorite===symbol}
                    setCurrentFavorite={setCurrentFavorite}
                />                
            )}
        </AppContext.Consumer>
    )
}