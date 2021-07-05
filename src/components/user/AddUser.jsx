import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import axios from 'axios';

const AddUser = () => {

    let history = useHistory();

    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        hobby: ""
    });

    const { name, email, hobby } = user;

    const onInputChange = e => {
        console.log("Event: ", e.target.value);
        setUser({...user, [e.target.name]: e.target.value});
    };


    const onSubmit = async e => {
        e.preventDefault();

        try {

            let res = await axios.post("http://localhost:3001/users", user);

            history.push("/"); //redirect to home page
            toast.success('User create success !! ', { position: "top-right"});
        } catch (error) {
            console.log("error: ", error);
        }

    };

    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add User</h2>
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
                        <button className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;