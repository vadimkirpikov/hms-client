import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Flex, IconButton, Input, Table, Tbody, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from '../Api/ApiClient';
import TableRow from "./TableRow";
import { useParams } from "react-router-dom";
import {AddIcon, MinusIcon, PlusSquareIcon, Search2Icon, useDisclosure} from "@chakra-ui/icons";
import { CreateEntityForm } from "./CreateEntityForm";
import {FilterEntityForm} from "./FilterEntitiesForm";
import {TableSelector} from "./TableSelector";
import HouseAndFlatsForm from "../Forms/HouseAndFlatsForm";

const ModelTable = () => {
    const { entity } = useParams();
    const [filters, setFilters] = useState({ filter: "", orderBy: "" });
    const [flexHeight, setFlexHeight] = useState(100);
    const [filter, setFilter] = useState("");
    const [orderBy, setOrderBy] = useState("");
    const createManage = useDisclosure();
    const filterManage = useDisclosure();

    const toast = useToast();
    const editFilter = useRef(null);
    const flexRef = useRef(null);
    const queryClient = useQueryClient();

    const { data, error, isLoading, isError } = useQuery({
        queryKey: [entity, filter, orderBy],
        queryFn: () => api.readEntities(entity, filter, orderBy),
        onError: () => {
            alert(`Failed to load entity: ${entity}`);
        },
        retry: 0
    });

    const deleteEntity = useMutation({
        mutationFn: (id) => api.deleteEntity(entity, id),
        onSuccess: async () => {
            await queryClient.clear();
            toast({
                title: "Entity deleted.",
                description: "The entity has been successfully deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: "Error deleting entity.",
                description: "Failed to delete the entity.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const updateEntity = useMutation({
        mutationFn: ({ id, objectDto }) => api.updateEntity(entity, id, objectDto),
        onSuccess: async () => {
            await queryClient.clear();
            toast({
                title: "Entity updated.",
                description: "The entity has been successfully updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: "Error updating entity.",
                description: "Failed to update the entity.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const createEntity = useMutation({
        mutationFn: ({ objectDto }) => api.createEntity(entity, objectDto),
        onSuccess: async () => {
            await queryClient.clear();
            toast({
                title: "Entity created.",
                description: "The entity has been successfully created.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: () => {
            toast({
                title: "Error creating entity.",
                description: "Failed to create the entity.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    });

    const handleDelete = (id) => deleteEntity.mutate(id);
    const handleEdit = (id, objectDto) => {
        updateEntity.mutate({ id, objectDto });
    };
    const handleCreate = (objectDto) => {
        createEntity.mutate({ objectDto });
    };

    const handleForm = () => {
        setFilters({ filter: editFilter.current.values });
    };

    const handleOrderBy = (currentOrderBy) => {
        setFilters({filter: editFilter.current.value, orderBy: currentOrderBy});
    }

    useEffect(() => {
        if (flexRef.current) {
            setFlexHeight(flexRef.current.offsetHeight);
        }
        const handleResize = () => {
            if (flexRef.current) {
                setFlexHeight(flexRef.current.offsetHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    console.log("f: ", filters.orderBy);
    if (isLoading) return <p>Loading...</p>;
    let displayedData = data;
    return (
        <>
            <CreateEntityForm entity={data[0]} entityName={entity} isOpen={createManage.isOpen} onClose={createManage.onClose} handleCreate={handleCreate} />
            <FilterEntityForm entity={data[0]} isOpen={filterManage.isOpen} onClose={filterManage.onClose} handleOrderBy={handleOrderBy} currentFilter={filters.orderBy} />
            <Flex
                ref={flexRef}
                direction={['column', 'row']}
                justify="space-between"
                position="fixed"
                left={0}
                top={0}
                width="100%"
                backgroundColor="white"
                zIndex={1}
                padding={4}
            >
                <TableSelector />
                <IconButton icon={<PlusSquareIcon/>} onClick={createManage.onOpen} aria-label={"Add"}/>
                <IconButton icon={<MinusIcon/>} onClick={filterManage.onOpen} aria-label={"Filter"}/>
                <Input
                    type={"text"}
                    placeholder={"filter"}
                    ref={editFilter}
                    defaultValue={filters.filter}
                    borderColor={"gray.400"}
                    borderWidth={"2px"}
                />
                {/*<Input*/}
                {/*    type={"text"}*/}
                {/*    placeholder={"orderBy"}*/}
                {/*    ref={editOrderBy}*/}
                {/*    defaultValue={filters.orderBy}*/}
                {/*    borderColor={"gray.400"}*/}
                {/*    borderWidth={"2px"}*/}
                {/*    margin={"20px"}*/}
                {/*/>*/}
                <IconButton colorScheme={"blue"} onClick={() => setFilter(editFilter.current.value)} icon={<Search2Icon />} variant={"ghost"} aria-label={"Search"} />
            </Flex>
            <Box
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        backgroundColor: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'gray.700',
                        borderRadius: '24px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'gray.800',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                    },
                }}
                overflowX="auto"
                overflowY="auto"
                top={`${flexHeight}px`}
                position="fixed"
                height={`calc(100% - ${flexHeight+50}px)`}
                width={"100%"}
                marginTop={"50px"}
            >
                <Table variant={"simple"} borderColor="gray.300">
                    <Thead position={"sticky"} top={0} backgroundColor={"gray.800"} zIndex={1}>
                        <Tr borderBottom="2px" borderColor="gray.400">
                            {displayedData.length > 0 && <TableRow entity={displayedData[0]} isHeader={true} />}
                            <Th color={"white"}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {displayedData.length > 0 && displayedData.map((item, index) => {
                            const values = Object.values(item);
                            return (
                                <Tr key={index} borderBottom="1px" borderColor="gray.300">
                                    <TableRow
                                        entity={item}
                                        isHeader={false}
                                        onDelete={() => handleDelete(values[0])}
                                        entityName={entity}
                                        onEdit={handleEdit}
                                    />
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Box>
        </>

    );
};

export default ModelTable;
