import { Select } from '@chakra-ui/react'
import {translateToRu} from "../Other/HelpFunctions";


export const TableSelector = ({header, names}) => {
    const handleSelect = (event) => {
        const url = event.target.value;
        window.location.href = url;
    }

    return (
        <Select placeholder={header} onChange={handleSelect}>
            {names.map((name) => (
                <option key={name} value={`/${name}`}>{translateToRu(name)}</option>
            ))}
        </Select>
    )
}