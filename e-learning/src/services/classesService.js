import axios from 'axios';

export const classesRemote = {
    getClasses: async () => {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:8080/users", {
            headers: {
                Authorization: token
            }
        });
        return data;
    },
    login: async (email, password) => {
        const { data } = await axios.post("http://localhost:8080/users/login", {
            email,
            password
        }
    );
        return data;
    }
}