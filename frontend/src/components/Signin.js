// import libaries
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

// function to sign in
function Signin( { setIsAuthenticated } ) 
    {
    
    // set the user id
    const [ userId, setUserId ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();
    
    // handle the signin
    const handleSignin = async (e) => 
        {

        e.preventDefault();

        // try to get the sign in page
        try {

            const response = await axios.post( 'http://localhost:8000/signin',
                                                             { userId, password } );
            alert(response.data.message);

            setIsAuthenticated( true );
            navigate( '/blog' );
            }
        
        // otherwise throw the fetch error
        catch( error )
            {

            alert('Sign-in failed: ' + error.response.data.message);
            }
        };
    
    // return the sign in information with link to signup
    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={ handleSignin }>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Sign In</button>
                
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    );
}

export default Signin;
