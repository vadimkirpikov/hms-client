export const getTypeForForm = (item) => {
    if (typeof (item) === 'number') return 'number';
    return 'text';
}
export const translateToRu = (item) => {
    const dict = {
        services: "Службы",
        plots: "Участки",
        departments: "Отделы",
        "department-plots": "Участки-Отделы",
        flats: "Квартиры",
        lodgers: "Жильцы",
        houses: "Дома",
        ownerships: "Собственность",
        rates: "Тарифы",
        rents: "Квартплата",
        "departments-revenue": "Выручка отделов",
        "suitability-of-plots": "Пригодность участков"
    }
    return dict[item];
}