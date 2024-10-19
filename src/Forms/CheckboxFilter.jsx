import React, {useState} from 'react';
import {
    FormControl,
    FormLabel,
    Checkbox,
    IconButton,
    VStack, Text, Grid
} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';

const CheckboxFilter = ({entities, displayedName, fieldName, changeFilter}) => {
    const fields = [...new Set(entities.map(entity => String(entity[fieldName])))];
    const [items, setItems] = useState([]);

    const onFilter = (updatedItems) => {
        if (updatedItems.length > 0) {
            let filter = `${fieldName} IN (${updatedItems.join(", ")})`;
            changeFilter(filter);
            console.log("Filter query:", filter);
        } else {
            console.log("No items selected for filtering.");
        }
    };

    const toggleItem = (key) => {
        setItems((prevItems) => {
            const updatedItems = prevItems.includes(key)
                ? prevItems.filter(item => item !== key)
                : [...prevItems, key];

            onFilter(updatedItems);

            return updatedItems;
        });
    };


    return (
        <>
            <Text>Выберите {displayedName}</Text>
            {fields.map((field, index) => (
                <Grid
                    key={index}
                    templateColumns="auto 1fr auto auto"
                    gap={3}
                    alignItems="center"
                    marginBottom="10px"
                >
                    <Checkbox
                        key={`field`}
                        isChecked={items.includes(field)}
                        onChange={() => toggleItem(field)}
                    />
                    <Text whiteSpace="nowrap">{field}</Text>
                </Grid>
            ))}
        </>
    );
};

export default CheckboxFilter;
