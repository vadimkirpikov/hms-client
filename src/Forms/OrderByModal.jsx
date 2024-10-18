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
import OrderByForm from "./OrderByForm";

export const OrderByModal = ({ entity, isOpen, onClose, handleOrderBy, currentFilter }) => {
    const [orderByString, setOrderByString] = useState(currentFilter);
    const changeOrderByString = (newString) => {
        setOrderByString(newString);
    }
    const sendToServer = () => {
        console.log(orderByString);
        handleOrderBy(orderByString);
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Filter entities</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <OrderByForm changeOrderByString={changeOrderByString} entity={entity} currentFilter={currentFilter} />
                    <IconButton icon={<CheckIcon />} onClick={sendToServer} aria-label={"SubmitOrderBy"} variant="solid" colorScheme={"green"} w={"100%"}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
