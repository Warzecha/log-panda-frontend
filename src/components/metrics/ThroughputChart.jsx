import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment";
import {makeStyles} from "@material-ui/core/styles";
import {round} from "../../utils/numberUtils";
import {generateRandomData} from "../../utils/chartUtils";


export default function ThroughputChart() {

    const classes = useStyle();

    const data = generateRandomData();

    const tooltipFormatter = (value) => {
        return [round(value, 1) + '%', "Capacity"]
    };

    const tooltipLabelFormatter = (timestamp) => moment(timestamp).format('HH:mm');

    return (
        <ResponsiveContainer width={300} height={200} className={classes.container}>
            <LineChart
                data={data}
                margin={{top: 5, right: 0, left: 0, bottom: 5}}
            >
                <defs>
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff0000" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#00ff00" stopOpacity={0.3}/>
                    </linearGradient>
                </defs>

                <XAxis dataKey='timestamp'
                       domain={['dataMin', 'dataMax']}
                       name='Time'
                       tickFormatter={(unixTime) => moment(unixTime).format('HH:mm')}
                       type='number'/>
                <YAxis domain={[0, 100]} name={'Capacity'} unit={'%'}/>
                <Tooltip
                    formatter={tooltipFormatter}
                    labelFormatter={tooltipLabelFormatter}
                />
                <CartesianGrid stroke="#f5f5f5"/>
                <Line type="monotone" dataKey="value" stroke="url(#color)" dot={false} strokeWidth={3}/>
            </LineChart>
        </ResponsiveContainer>)
}

const useStyle = makeStyles(() => ({
    container: {
        marginTop: 20,
    },
}));
