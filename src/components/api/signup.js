import axios from 'axios';

export const createUser = async (data) => {
    try {
        const res = await axios.post(global.BASEURL + '/users/signup' + data.param,
            data, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // console.log(res.data, "res");
        return res?.data
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const getCurrentUser = async (data) => {
    try {
        const res = await axios.get(global.BASEURL + '/auth/get/user',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': global.TOKEN
                }
            });
        // console.log(res.data, "res");
        return res?.data
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const getUser = async (lastId) => {
    try {
        const res = await axios.post(global.BASEURL + '/getUser', {
            last_id: lastId
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log(res, "res")
        return res;
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
}
export const sendCode = async (email) => {
    try {
        const res = await axios.post(global.BASEURL + '/users/send-code', {
            email,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const forgotPassword = async (email) => {
    try {
        const res = await axios.post(global.BASEURL + '/users/forget-password', {
            email,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const verfiyPassCode = async (code, token) => {
    try {
        const res = await axios.put(global.BASEURL + '/users/code-verify', {
            code: code.toString(), token,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const updateUserPassword = async (password, token) => {
    try {
        const res = await axios.put(global.BASEURL + '/users/update-password', {
            password, token,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const Login = async (data) => {
    try {
        const res = await axios.post(global.BASEURL + '/auth/login/user',
            {
                email: data.email,
                password: data.password,
            }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // console.log(res.data, "res");
        return res?.data
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const updateUser = async (data) => {
    try {
        const res = await axios.post(global.BASEURL + '/auth/edit/' + data.param, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': global.TOKEN
            }
        });
        // console.log(res.data, "res");
        return res?.data
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const editWorkExperience = async (data) => {
    try {
        const res = await axios.post(global.BASEURL + '/auth/work/exp/edit/' + data.param, data, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': global.TOKEN
            }
        });
        // console.log(res.data, "res");
        return res?.data
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const getUsers = async (data) => {
    try {
        const res = await axios.get(global.BASEURL + '/auth/get/users', {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': global.TOKEN
            }
        });
        // console.log(res.data, "res");
        return res?.data
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const updateFormUser = async (data) => {
    try {
        const res = await axios.post(global.BASEURL + '/auth/update/user', data, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': global.TOKEN
            }
        });
        // console.log(res.data, "res");
        return res?.data
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const signUpUser = async (data) => {
    try {
        const res = await axios.post(global.BASEURL + '/signupUserWHLogin',
            {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                country: data.country,
                address: data.address,
                addressTemp: data.addressTemp,
                state: data.state,
                zipCode: data.zipCode,
                companyName: data.companyName,


            }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // console.log(res.data, "res");
        return res?.data
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
export const checkEmail = async (email) => {
    try {
        const res = await axios.post(global.BASEURL + '/checkEmail',
            {
                email: email,
            }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res.data;
    } catch (error) {
        console.log(error, "error");
        throw error; // Rethrow the error to handle it in the component
    }
};
export const getSpecificUser = async (id) => {
    try {
        const res = await axios.post(global.BASEURL + '/getSpecificUser', {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    } catch (error) {
        console.log(error, "error");
        throw error;
    }
};
// export const deleteUser = async (data) => {
//     try {
//         const res = await axios.post(global.BASEURL + '/deleteCategory',
//             {
//                 id: data,

//             }, {
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });
//         return res

//     } catch (error) {
//         console.log(error, "error");
//         throw error;
//     }
// };
// export const searchUser = async (lastId, value) => {
//     try {
//         const res = await axios.post(global.BASEURL + '/searchCategory', {
//             search: value,
//             last_id: lastId
//         });
//         return res.data;
//     } catch (error) {
//         console.log(error, "error");
//         throw error; // Rethrow the error to handle it in the component
//     }
// };