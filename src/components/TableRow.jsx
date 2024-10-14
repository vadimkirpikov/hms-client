import React, {useState} from 'react';
import {Button, IconButton, Input, Td, Th} from "@chakra-ui/react";
import {CheckIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import * as api from "../Api/ApiClient";
import {getTypeForForm} from "../Other/HelpFunctions";

const TableRow = ({entityName, entity, isHeader, onDelete, onEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableEntity, setEditableEntity] = useState(entity);
    const {id, ...objectDto} = editableEntity;


    const toggleEdit = () => {
        if (isEditing) {
            onEdit(id, objectDto);
        }
        setIsEditing(!isEditing);

    };
    return (
        <>
            {(Object.keys(editableEntity)).map((field, index) => {
                if (isHeader) {
                    return <Th key={index} color={"white"} borderColor={"gray.800"}>{field}</Th>;
                }

                return (
                    <Td key={index} borderColor={"gray.800"} borderWidth={"2px"}>
                        {isEditing ? (
                            <Input
                                type={getTypeForForm(editableEntity[field])}
                                defaultValue={editableEntity[field]}
                                onChange={(e) => objectDto[field] = e.target.value}
                            />
                        ) : (
                            editableEntity[field]
                        )}
                    </Td>
                );
            })}
            {!isHeader && (
                <Td borderColor={"gray.800"} borderLeftWidth={"2px"}>
                    <IconButton
                        icon={isEditing ? <CheckIcon/> : <EditIcon/>}
                        onClick={toggleEdit}
                        colorScheme="blue"
                        mr={2} aria-label={"Edit"}
                        variant={"ghost"}
                    />
                    <IconButton
                        icon={<DeleteIcon/>}
                        onClick={onDelete}
                        colorScheme="red"
                        aria-label={"Delete"}
                        variant={"ghost"}
                    />
                </Td>
            )}
        </>
    );
};

export default TableRow;
