import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const Home = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async() => {
        try {
            const result = await axios.get("http://localhost:3001/users");

            console.log("result: ", result);
            setUsers(result.data);
            
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const deleteUser = async id => {
        
        try {

            await axios.delete(`http://localhost:3001/users/${id}`);
            
            loadUsers();
            toast.success('Delete success !! ', { position: "top-right"});
            
        } catch (error) {
            console.log("Error: ", error);
            
        }
    };


    return(
        
        <div className="container">

            <div className="py-4">
                <div className="row">
                    <div className="col-md-10">
                        <h1 className="text-center display-4">Users</h1>
                    </div>
                </div>

                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Hobby</th>
                        <th scope="col">Action</th>
                        <th scope="col">
                            <Link className="btn btn-outline-primary" exact to="/users/add" title="add user"><strong>+</strong></Link>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map( (user, index) => (
                                <tr key={index}>
                                    <th scope="row">{ (index + 1)}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.hobby}</td>
                                    
                                    <td>
                                        <Link className="btn btn-outline-primary mx-2" exact to={`/users/edit/${user.id}`}>Edit</Link>
                                        <Link className="btn btn-outline-danger" onClick={() => deleteUser(user.id)}>Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>    

            </div>
        </div>
    );
};

export default Home;