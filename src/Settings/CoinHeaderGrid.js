import React from "react";
import styled from "styled-components";
import { DeletableTile } from "../Shared/Tile";

const HEADER_HEIGH = "40px";

export const CoinHeaderGridStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: ${HEADER_HEIGH};
`

export const CoinSymbol = styled.div`
    justify-self: right;
`


export const Delete = () => { return (<span class="material-icons" >delete_forever</span>);}

export const DeleteIcon = styled.div`
    justify-self: right;
    opacity: 0;
    transition: all 400ms ease;

    ${DeletableTile}:hover & {
        opacity: 1;
        color: red;
    }
`

export default function({ name, symbol, topSection }) {
    return <CoinHeaderGridStyled>
        <div> {name} </div>
        {topSection ? <DeleteIcon> <Delete /> </DeleteIcon> : <CoinSymbol> {symbol} </CoinSymbol> }
    </CoinHeaderGridStyled>
}