import IntervalForm from "./IntervalForm";
import CheckboxFilter from "./CheckboxFilter";
import React from "react";

const DynamicFilter = ({entityName, entities, currentFilter, changeFilter}) => {
    switch (entityName) {
        case 'flats':
            return (<IntervalForm entities={entities} changeFilter={changeFilter} displayedIntervalName={"Площадь"} intervalName={"totalArea"} currentFilter={currentFilter} />);
        case 'lodgers':
            return (<IntervalForm entities={entities} changeFilter={changeFilter} displayedIntervalName={"Долг"} intervalName={"duty"} currentFilter={currentFilter} />);
        case "plots":
            return (<IntervalForm entities={entities} changeFilter={changeFilter} displayedIntervalName={"Бюджет"} intervalName={"budget"} currentFilter={currentFilter} />);
        case "rates":
            return (<IntervalForm entities={entities} changeFilter={changeFilter} displayedIntervalName={"Цена за месяц"} intervalName={"constantPricePerMonth"} currentFilter={currentFilter} />);
        case "ownerships":
            return (<IntervalForm entities={entities} changeFilter={changeFilter} displayedIntervalName={"Владеемая площадь"} intervalName={"ownedArea"} currentFilter={currentFilter} />);
        case "departments":
            return (<CheckboxFilter entities={entities} fieldName={"serviceId"} changeFilter={changeFilter} displayedName={"ID служб"} currentFilter={currentFilter} />);
        case "houses":
            return (<CheckboxFilter entities={entities} fieldName={"plotId"} changeFilter={changeFilter} displayedName={"ID участков"} currentFilter={currentFilter} />);
        case "department-plots":
            return (<CheckboxFilter entities={entities} fieldName={"departmentId"} changeFilter={changeFilter} displayedName={"ID отделов"} currentFilter={currentFilter} />);
        case "departments-revenue":
            return (<CheckboxFilter entities={entities} fieldName={"serviceId"} changeFilter={changeFilter} displayedName={"ID служб"} currentFilter={currentFilter} />);
        case "rents":
            return (<CheckboxFilter entities={entities} fieldName={"houseAddress"} changeFilter={changeFilter} displayedName={"Адреса дома"} currentFilter={currentFilter} />);
        case "suitability-of-plots":
            return (<IntervalForm entities={entities} fieldName={"budget"} changeFilter={changeFilter} displayedName={"Бюджет"} currentFilter={currentFilter} />);
        default:
            return null;
    }
}
export default DynamicFilter;