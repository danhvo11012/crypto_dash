import React from "react";
import styled from "styled-components";

export default function({coin, style}) {
    return(
        <img
            alt={coin.CoinSymbol}
            style={style || { height: '50px' }}
            src={`https://www.cryptocompare.com/${coin.ImageUrl}`}
        />
    );
}