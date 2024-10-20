import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input,
    Grid,
    Text,
    IconButton,
} from '@chakra-ui/react';
import { getTypeForForm } from '../Other/HelpFunctions';
import { CheckCircleIcon, CheckIcon } from '@chakra-ui/icons';
import HouseAndFlatsForm from "./HouseAndFlatsForm";



const DefaultCreateForm = ({entity, handleCreate}) => {
    const { id, ...objectDto } = entity;

    const [formData, setFormData] = useState(
        Object.keys(objectDto).reduce((acc, key) => {
            if (getTypeForForm(objectDto[key]) === 'number') {
                acc[key] = 0;
            } else acc[key] = '';
            return acc;
        }, {})
    );

    const onCreate = () => handleCreate(formData);
    const handleChange = (e, key) => {
        setFormData({
            ...formData,
            [key]: e.target.value,
        });
    };
    return (
        <>
            {Object.keys(objectDto).map((key, index) => (
                <Grid
                    key={index}
                    templateColumns="30px 1fr 2fr"
                    gap={3}
                    alignItems="center"
                    marginBottom="10px"
                >
                    <CheckCircleIcon
                        color={formData[key] ? 'green.500' : 'black'}
                    />

                    <Text fontWeight="bold">{key}</Text>

                    <Input
                        type={getTypeForForm(objectDto[key])}
                        value={formData[key]}
                        onChange={(e) => handleChange(e, key)}
                    />
                </Grid>
            ))}

            <IconButton
                icon={<CheckIcon />}
                width={"100%"}
                aria-label="Submit"
                variant="solid"
                colorScheme="green"
                onClick={onCreate}
                display="block"
                margin="20px auto 0"
            />
        </>
    )
}

const DynamicCreateForm = ({entityName, entity, handleCreate}) => {
    console.log(entityName);
    if (entityName === "houses") return <HouseAndFlatsForm handleCreate={handleCreate} />;
    return <DefaultCreateForm entity={entity} handleCreate={handleCreate} />;
}

export const CreateEntityForm = ({ entity, isOpen, onClose, handleCreate, entityName }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Добавить</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <DynamicCreateForm entity={entity} handleCreate={handleCreate} entityName={entityName} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
