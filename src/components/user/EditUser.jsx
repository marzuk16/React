import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';

const EditUser = () => {

    let history = useHistory();
    let { id } = useParams();

    const [users, setUsers] = useState({
        id: "",
        name: "",
        email: "",
        hobby: ""
    });

    const { name, email, hobby } = users;

    const onInputChange = e => {
        
        setUsers({...users, [e.target.name]: e.target.value});
    };

    const loadUser = async () => {
        
        try {

            const result = await axios.get(`http://localhost:3001/users/${id}`,users);
            
            setUsers(result.data);           
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/users/${id}`,users);

            history.push("/"); //redirect to home page
            toast.success('User update success !! ', { position: "top-right"}); 
        } catch (error) {
            console.log("Error: ", error);
        }

    };

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Edit User</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={ e => onInputChange(e) }
                        />
                    </div>
                    <div className="form-group my-2">
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={ e => onInputChange(e) }
                        />
                    </div>
                    <div className="form-group my-2">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Hobby"
                            name="hobby"
                            value={hobby}
                            onChange={ e => onInputChange(e) }
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Edit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;