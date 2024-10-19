import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import DynamicFilter from "./DynamicFilter";
import OrderByForm from "./OrderByForm";
import {CheckIcon, SettingsIcon} from "@chakra-ui/icons";


const ReportFilterModal = ({entityName, entities, handleSubmit, isOpen, onOpen, onClose, currentFilter, currentOrderBy}) => {
    const [filter, setFilter] = useState('');
    const [orderBy, setOrderBy] = useState('');

    const handleOrderBy = (newOrderBy) => {
        setOrderBy(newOrderBy);
    }
    const handleFilter = (newFilter) => {
        setFilter(newFilter);
    }
    const onSubmit = () => {
        handleSubmit(filter, orderBy);
        onClose();
    }

    return (
        <>
        <IconButton icon={<SettingsIcon />} onClick={onOpen} colorScheme="teal" aria-label={"OpenReportFilter"} />
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg={"whiteAlpha.900"}/>
            <ModalContent>
                <ModalHeader>Фильтр и сортировка</ModalHeader>
                <ModalBody>
                    <ModalCloseButton />
                    <DynamicFilter entityName={entityName} entities={entities} currentFilter={currentFilter} changeFilter={handleFilter} />
                    <Text>Сортировка</Text>
                    <OrderByForm  entity={entities[0]} currentFilter={currentOrderBy} changeOrderByString={handleOrderBy}  />
                    <IconButton icon={<CheckIcon />} aria-label={"Submit filter for report"} variant="solid" colorScheme={"green"} w={"100%"} onClick={onSubmit} />
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}
export default ReportFilterModal;