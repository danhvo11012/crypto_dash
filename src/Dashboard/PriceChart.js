import React from "react";
import highChartsConfig from "./HighChartsConfig";
import {Tile} from "../Shared/Tile";
import {AppContext} from "../App/AppProvider";
import ChartTimeIntervalSelect from "./ChartTimeIntervalSelect";
import ReactHighCharts from 'react-highcharts';
import HighChartsTheme from "./HighChartsTheme";
ReactHighCharts.Highcharts.setOptions(HighChartsTheme);

export default function () {
    return (
        <AppContext.Consumer>
            {({historicalData, changeTISelect}) => (
                <Tile>
                    <ChartTimeIntervalSelect 
                        defaultValue={""}
                        onChange={e => changeTISelect(e.target.value)}
                    >
                        <option value="days"> Days </option>
                        <option value="weeks"> Weeks </option>
                        <option value="months"> Months </option>

                    </ChartTimeIntervalSelect>
                    {   
                        historicalData ?
                        <ReactHighCharts config={highChartsConfig(historicalData)} />
                        : <div> Loading Historical Data... </div>
                    }
                    
                </Tile>
            )}
        </AppContext.Consumer>
    )
}