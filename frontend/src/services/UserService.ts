import http from "../http-common";

const getAll = () => {
    return http.get("/users");
};

const getById = (id : number) => {
    return http.get(`/users/${id}`);
};

const create = (data : Object )=> {
    return http.post("/users", data);
};

const update = (id : number, data : Object) => {
    return http.put(`/users/${id}`, data);
};

const deleteUser = (id: number)  => {
    return http.delete(`/users/${id}`);
};

const UserService = {
    getAll,
    getById,
    create,
    update,
    deleteUser
};

export default UserService;