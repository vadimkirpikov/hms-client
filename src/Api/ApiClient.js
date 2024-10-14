const API_URL = "http://localhost:1307";


export const readEntities = async (entity, filter, order) => {
    let url = `${API_URL}/${entity}/read?filter=${filter}&orderBy=${order}`;
    console.log(url);
    const response = await fetch(url,
        {
            method: "GET"
        });
    if (!response.ok) {
        throw new Error(`Failed to read entities ${entity}`);
    }
    return await response.json();
}

export const createEntity = async (entity, objectDto) => {
    console.log("objectDto перед отправкой:", objectDto);
    const response = await fetch(`${API_URL}/${entity}/create`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(objectDto)
        });
    if (!response.ok) {
        throw new Error(`Failed to create entity ${entity}`);
    }
}

export const updateEntity = async (entity, id, objectDto) => {
    let url = `${API_URL}/${entity}/update/${id}`;
    console.log("objectDto перед отправкой:", objectDto);
    console.log("URL запроса:", url);

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objectDto)
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update entity ${entity}. Status: ${response.status}. Message: ${errorMessage}`);
    }
};


export const deleteEntity = async (entity, id) => {
    const response = await fetch(`${API_URL}/${entity}/delete/${id}`,
        {
            method: "DELETE"
        }
    );
    if (!response.ok) {
        throw new Error(`Failed to delete entity ${entity}`);
    }
}