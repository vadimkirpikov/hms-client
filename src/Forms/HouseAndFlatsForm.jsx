import {
    Flex,
    FormControl, FormLabel, IconButton,
    Input,
    Text
} from '@chakra-ui/react'
import {useState} from "react";
import {getTypeForForm} from "../Other/HelpFunctions";
import {AddIcon, CheckIcon, DeleteIcon} from "@chakra-ui/icons";


const HouseAndFlatsFrom = ({handleCreate}) => {
    const [house, setHouse] = useState({plotId: 0, floorCount: 0, address: ""});
    const [flats, setFlats] = useState([]);

    const addFlatToForm = () => {
        setFlats(prevState => {
            let newFlats = [...prevState];
            newFlats.push({number: "", floor: "", totalArea: ""});
            return newFlats;
        });
    }
    const deleteFlatFromForm = () => {
        setFlats(prevState => {
            let newFlats = [...prevState];
            newFlats.pop();
            return newFlats;
        });
    }

    const updateHouse = (key, value) => {
        console.log("old ", house);
        setHouse(prevHouse => ({
            ...prevHouse,
            [key]: value
        }));
        console.log("current ", house);
    }
    const updateFlats = (index, key, value) => {
        console.log("old ", flats);
        setFlats(prevFlats => {
            let newFlats = [...prevFlats];
            newFlats[index][key] = value;
            return newFlats;
        })
        console.log("current ", flats);
    }

    const onSubmit = () => {
        flats.forEach(item => {
            item["houseId"] = 0
        });
        const objToSend = {houseDto: house, flatsDto: flats};
        handleCreate(objToSend);
        flats.forEach(item => delete item["houseId"]);
    }

    return (
        <>
            <FormControl>
                <FormLabel>ID участка</FormLabel>
                <Input type={"number"} defaultValue={0} onChange={(e) => updateHouse("plotId", e.target.value)}/>
            </FormControl>
            <FormControl>
                <FormLabel>Кол-во этажей</FormLabel>
                <Input type={"number"} defaultValue={0} onChange={(e) => updateHouse("floorCount", e.target.value)}/>
            </FormControl>
            <FormControl>
                <FormLabel>Адрес</FormLabel>
                <Input type={"text"} defaultValue={""} onChange={(e) => updateHouse("address", e.target.value)}/>
            </FormControl>
            {flats.map((flat, index) => {
                return (
                    <>
                        <Text>Новая квартира</Text>
                        {Object.keys(flat).map((key, pos) => {
                            return (
                                <FormControl key={`${index}-${pos}`}>
                                    <FormLabel>{key}</FormLabel>
                                    <Input type={getTypeForForm(flat[key])}
                                           onChange={(e) => updateFlats(index, key, e.target.value)}></Input>
                                </FormControl>
                            )
                        })
                        }
                        </>
                )
            })}
            <Flex>
                <IconButton icon={<AddIcon/>} aria-label={"AddFlat"} colorScheme={"green"} onClick={addFlatToForm}
                            variant={"ghost"} w={"100%"}/>
                <IconButton icon={<DeleteIcon/>} aria-label={"AddFlat"} colorScheme={"red"} onClick={deleteFlatFromForm}
                            variant={"ghost"} w={"100%"}/>
            </Flex>
            <IconButton icon={<CheckIcon/>} onClick={onSubmit} aria-label={"SubmitHouseWithFlats"} colorScheme={"green"}
                        w={"100%"}/>
        </>
    )
}
export default HouseAndFlatsFrom;
