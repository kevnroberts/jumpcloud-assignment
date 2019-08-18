const BASE_URL = 'http://localhost:8005/api/systemusers';

const apiFetch = ({
    resource = BASE_URL,
    method = 'GET',
    body,
} = {}) => {
    return fetch(resource, {
        method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body,
    })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const getSystemUserList = (page, pageSize) => {
    const skip = pageSize * (page - 1);
    const resource = `${BASE_URL}?fields=created email firstname id lastname username&limit=${pageSize}&skip=${skip}`;
    return apiFetch({ resource });
};

export const getSystemUser = id => {
    return apiFetch({ resource: `${BASE_URL}/${id}` });
};

export const createSystemUser = systemUser => {
    return apiFetch({
        method: 'POST',
        body: JSON.stringify(systemUser),
    });
};

export const updateSystemUser = systemUser => {
    const { id } = systemUser;
    return apiFetch({
        resource: `${BASE_URL}/${id}`,
        method: 'PUT',
        body: JSON.stringify(systemUser),
    });
};

export const deleteSystemUser = id => {
    return apiFetch({
        resource: `${BASE_URL}/${id}`,
        method: 'DELETE',
    });
};
