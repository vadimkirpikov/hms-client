import React, {useEffect, useState} from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    IconButton,
    Text,
    VStack
} from '@chakra-ui/react';

const IntervalFilter = ({currentFilter, displayedIntervalName, intervalName, changeFilter }) => {
    let fr = 0;
    let t = 2000000000;
    if (currentFilter !== undefined && currentFilter !== "") {
        fr = Number(currentFilter.slice(currentFilter.indexOf('=') + 1, currentFilter.indexOf("and")).trim());
        t =  Number(currentFilter.slice(currentFilter.lastIndexOf('=') + 1).trim());
    }
    const [from, setFrom] = useState(fr);
    const [to, setTo] = useState(t);

    const onChange = () => {
        if (from <= to) {
            changeFilter(`${intervalName} >= ${from} and ${intervalName} <= ${to}`);
        }
    };
    useEffect(() => {
            onChange();
    });

    return (
        <VStack spacing={4}>
            <FormControl>
                <FormLabel>{displayedIntervalName} от</FormLabel>
                <Input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    type="number"
                    min={0}
                />
            </FormControl>
            <FormControl>
                <FormLabel>{displayedIntervalName} до</FormLabel>
                <Input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    type="number"
                    min={0}
                />
            </FormControl>


            {from > to && (
                <Text color={"red.500"}>
                    Ошибка: "{displayedIntervalName} от" не может быть больше, чем "{displayedIntervalName} до"
                </Text>
            )}
        </VStack>
    );
};

export default IntervalFilter;
