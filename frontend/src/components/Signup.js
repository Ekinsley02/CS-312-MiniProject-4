// import libaries
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// funciton to signup
function Signup() 
    {
    
    // define userId, password and name constants
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    
    // handle the signup informatino
    const handleSignup = async ( e ) => 
        {
        
        // prevent the default
        e.preventDefault();
        try 
            {

            await axios.post('http://localhost:8000/signup',
                                    { userId, password, name });
            
            // aleart successfl sign in
            alert('Signup successful! Please sign in.');
            
            // reroute to root
            navigate('/');
            }

        catch( error ) 
            {

            alert( 'Signup failed: ' + error.response.data.message );
            }
        };
    

    // return the signn up information
    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={( e ) => setUserId( e.target.value )}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={( e ) => setPassword( e.target.value )}
                />

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={( e ) => setName( e.target.value )}
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
    }

export default Signup;
