const API_URL = '/api/shapes';

const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMsg = 'An error occurred';
        try {
            const errData = await response.json();
            errorMsg = errData.message || errorMsg;
        } catch (e) {
            errorMsg = response.statusText || errorMsg;
        }
        throw new Error(`Error ${response.status}: ${errorMsg}`);
    }

    if (response.status === 204) return null;
    return response.json();
};

export const fetchShapesPaged = async (page = 0, size = 5) => {
    try {
        const response = await fetch(`${API_URL}?page=${page}&size=${size}&sort=id,desc`);
        const data = await handleResponse(response);


        if (data && typeof data.totalPages !== 'undefined') {
            return data;
        }


        const arrayData = Array.isArray(data) ? data : [];

        arrayData.sort((a, b) => b.id - a.id);
        const startIndex = page * size;
        const endIndex = startIndex + size;
        const pagedContent = arrayData.slice(startIndex, endIndex);

        return {
            content: pagedContent,
            totalPages: Math.ceil(arrayData.length / size) || 1,
            totalElements: arrayData.length,
            number: page,
            size: size
        };
    } catch (error) {
        throw new Error(`Failed to load shapes: ${error.message}`);
    }
};

export const fetchShapeById = async (id) => {
    try {
        console.log(`Loading shape by id: ${id}`);
        const response = await fetch(`${API_URL}/${id}`);
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Failed to load shape: ${error.message}`);
    }
};

export const createShape = async (shapeData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shapeData),
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Failed to create shape: ${error.message}`);
    }
};

export const updateShape = async (id, shapeData) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(shapeData),
        });
        return await handleResponse(response);
    } catch (error) {
        throw new Error(`Failed to update shape: ${error.message}`);
    }
};

export const deleteShape = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        await handleResponse(response);
    } catch (error) {
        throw new Error(`Failed to delete shape: ${error.message}`);
    }
};
