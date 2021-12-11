import React from "react";
import styled from "styled-components";
import Page from "../Shared/Page";
import CoinSpotlight from "./CoinSpotlight";
import PriceGrid from "./PriceGrid";
import PriceChart from "./PriceChart";
import CandleStickChart from "./CandleStickChart";

const PriceChartGrid = styled.div`
    display: grid;
    margin-top: 20px;
    grid-gap: 15px;
    grid-template-columns: 1fr 3fr;
`

const StockChartGrid = styled.div`
    margin-top: 20px;
`



export default function({props}) {
    return(
        <Page name='dashboard'>
            <PriceGrid />
            <PriceChartGrid>
                <CoinSpotlight />
                <PriceChart />
            </PriceChartGrid>
            <StockChartGrid>
                <CandleStickChart />    
            </StockChartGrid>
        </Page>
    )
}