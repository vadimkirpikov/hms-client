import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Grid,
    Text,
    Checkbox, IconButton,
} from '@chakra-ui/react';
import {CheckIcon} from "@chakra-ui/icons";

export const FilterEntityForm = ({ entity, isOpen, onClose, handleOrderBy, currentFilter }) => {
    const currentDirections = currentFilter === undefined ? {} :currentFilter.split(', ').reduce((acc, item) => {
        let values = item.split(' ');
        acc[values[0]] = values[1];
        return acc;
    }, {});
    console.log("cd: ", currentDirections);
    const changeDirection = (key, dir) => {
        setDirections((prev) => ({
            ...prev,
            [key]: dir,
        }));
    };
    const [directions, setDirections] = useState(
        Object.keys(entity).reduce((acc, key) => {
            if (currentDirections[key]) {
               acc[key] = currentDirections[key];
            }
            else {
                acc[key] = "";
            }
            return acc;
        }, {})
    );
    const [sortMas, setSortMas] = useState(Object.keys(currentDirections) === undefined || Object.keys(currentDirections)[0] === "" ? [] : Object.keys(currentDirections));
    console.log("sm: ", sortMas);



    const toggleSortItem = (key) => {
        if (sortMas.includes(key)) {
            setSortMas(sortMas.filter(item => item !== key));
            changeDirection(key, "");
        } else {
            setSortMas((prev) => [...prev, key]);
            changeDirection(key, "asc");
        }
    };

    const handleSortDirection = (key) => {
        if (directions[key] === "desc") {
            changeDirection(key, "asc");
        } else {
            changeDirection(key, "desc");
        }
    };


    console.log(sortMas.map((item) => `${item} ${directions[item]}`).join(', '));
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Filter entities</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
                    <IconButton icon={<CheckIcon />} onClick={() => handleOrderBy(sortMas.map((item) => `${item} ${directions[item]}`).join(', '))} aria-label={"SubmitOrderBy"} variant="solid" colorScheme={"green"} w={"100%"}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
