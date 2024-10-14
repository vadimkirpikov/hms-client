import { Select } from '@chakra-ui/react'
import {useState} from "react";


export const TableSelector = () => {

    const [ph, setPh] = useState('Select table');
    const handleSelect = (event) => {
        const url = event.target.value;
        setPh("pivo");
        window.location.href = url;
    }

    return (
        <Select placeholder={ph} onChange={handleSelect}>
            <option value={"/lodgers"}>Lodgers</option>
            <option value={"/flats"}>Flats</option>
            <option value={"/plots"}>Plots</option>
            <option value={"/department-plots"}>DepartmentPlots</option>
            <option value={"/ownerships"}>Ownerships</option>
            <option value={"/houses"}>Houses</option>
            <option value={"/services"}>Services</option>
            <option value={"/departments"}>Departments</option>
            <option value={"/rates"}>Rates</option>
        </Select>
    )
}