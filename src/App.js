import React from 'react';
import {ChakraProvider, Table} from '@chakra-ui/react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import * as api from "./Api/ApiClient";
import ModelTable from "./components/ModelTable";


// Инициализация QueryClient
const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <Router>
                    <Routes>
                        <Route path="/:entity" element={<ModelTable/>} />
                    </Routes>
                </Router>
            </ChakraProvider>
        </QueryClientProvider>
    );
};

export default App;