import React from 'react';
import {ChakraProvider, Heading, Table} from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import * as api from "./Api/ApiClient";
import ModelTable from "./Tables/ModelTable";
import {TableSelector} from "./Tables/TableSelector";


// Инициализация QueryClient
const queryClient = new QueryClient();

const MainPage = () => {
    return (
        <>
            <Heading textAlign={"center"}>Служба заказчика ГЖУ</Heading>
            <TableSelector header={"Выбрать таблицу"} names={["lodgers", "houses", "rates", "services", "plots", "department-plots", "ownerships", "departments", "flats"]} />
            <TableSelector header={"Выбрать отчет"} names={["rents", "departments-revenue", "lodger-plots"]} />
        </>
    )
}
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/:entity" element={<ModelTable/>} />
                    </Routes>
                </Router>
            </ChakraProvider>
        </QueryClientProvider>
    );
};

export default App;