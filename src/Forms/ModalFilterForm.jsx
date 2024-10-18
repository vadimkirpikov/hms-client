import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    VStack, Checkbox, ModalCloseButton, IconButton
} from '@chakra-ui/react';
import IntervalForm from "./IntervalForm";
import CheckboxFilter from "./CheckboxFilter";
import { FiFilter } from 'react-icons/fi';
import DynamicFilter from "./DynamicFilter";
import {CheckIcon} from "@chakra-ui/icons";




const FilterModal = ({ entityName ,entities, handleFilter, currentFilter }) => {

    const [filter, setFilter] = useState(currentFilter || "");

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const changeFilter = (newFilter) => {
        setFilter(newFilter);
    }
    const handleSubmit = () => {
        console.log("filter:", filter);
        handleFilter(filter);
    }

    return (
        <>
            <IconButton icon={<FiFilter />} onClick={openModal} colorScheme="teal" aria-label={"OpenFilter"} />
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>Фильтр</ModalHeader>
                    <ModalBody>
                        <VStack spacing={4}>
                            <DynamicFilter entityName={entityName} entities={entities} currentFilter={currentFilter} changeFilter={changeFilter} />
                            <IconButton
                                aria-label={"IntervalSubmit"}
                                icon={<CheckIcon />}
                                colorScheme={"green"}
                                onClick={handleSubmit}
                                width={"100%"}
                            />
                        </VStack>
                    </ModalBody>


                </ModalContent>
            </Modal>
        </>
    );
};

export default FilterModal;
