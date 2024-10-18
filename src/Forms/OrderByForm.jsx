import React, {useState} from "react";
import {Checkbox, Grid, Text} from "@chakra-ui/react";

const OrderByForm = ({entity, currentFilter, changeOrderByString}) => {
    const currentDirections = currentFilter === undefined ? {} : currentFilter.split(', ').reduce((acc, item) => {
        let values = item.split(' ');
        acc[values[0]] = values[1];
        return acc;
    }, {});
    console.log("cd: ", currentDirections);
    const [directions, setDirections] = useState(
        Object.keys(entity).reduce((acc, key) => {
            acc[key] = currentDirections[key] || "";
            return acc;
        }, {})
    );
    const [sortMas, setSortMas] = useState(Object.keys(currentDirections) === undefined || Object.keys(currentDirections)[0] === "" ? [] : Object.keys(currentDirections));

    const toggleSortItem = (key) => {
        setSortMas((prevSortMas) => {
            const updatedSortMas = prevSortMas.includes(key)
                ? prevSortMas.filter(item => item !== key)
                : [...prevSortMas, key];

            setDirections((prevDirections) => {
                const updatedDirections = {
                    ...prevDirections,
                    [key]: prevSortMas.includes(key) ? "" : "asc",
                };

                const orderByString = updatedSortMas
                    .map((item) => `${item} ${updatedDirections[item]}`)
                    .join(', ');

                changeOrderByString(orderByString);

                return updatedDirections;
            });

            return updatedSortMas;
        });
    };

    const handleSortDirection = (key) => {
        setDirections((prevDirections) => {
            const newDirection = prevDirections[key] === "desc" ? "asc" : "desc";

            const updatedDirections = {
                ...prevDirections,
                [key]: newDirection,
            };

            const orderByString = sortMas
                .map((item) => `${item} ${updatedDirections[item]}`)
                .join(', ');

            changeOrderByString(orderByString);

            return updatedDirections;
        });
    };

    return (
        <>
            {Object.keys(entity).map((key, index) => (
                <Grid
                    key={index}
                    templateColumns="auto 1fr auto auto"
                    gap={3}
                    alignItems="center"
                    marginBottom="10px"
                >
                    <Checkbox
                        key={`${index}-sort`}
                        isChecked={sortMas.includes(key)}
                        onChange={() => toggleSortItem(key)}
                    />
                    <Text whiteSpace="nowrap">{key}</Text>
                    <Checkbox
                        key={`${index}-direction`}
                        isChecked={directions[key] === "desc"}
                        onChange={() => handleSortDirection(key)}
                        isDisabled={!sortMas.includes(key)}
                    />
                    <Text whiteSpace="nowrap">DESC</Text>
                </Grid>
            ))}
        </>
    )
}

export default OrderByForm;