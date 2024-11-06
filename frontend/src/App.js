// import libaries
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';

import Signin from './components/Signin';
import BlogPostForm from './components/BlogPostForm';
import PostList from './components/PostList';

// function to control sign up and sign in navigation
function App() {

    // make a constant for authentification
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // return the state of the signup/blog path
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element=
                        {<Signin setIsAuthenticated={ setIsAuthenticated } />} />

                <Route path="/signup" element={ <Signup /> } />
                <Route
                    path="/blog"

                    // make sure to be autheticated before blog section
                    element={
                        isAuthenticated ? 
                            (

                            <Blog />
                            ) : 
                            (

                            <Navigate to="/" replace />
                            )
                    }
                    />
                </Routes>
            </Router>
        </div>
    );
}

// function to handle blog interactions
function Blog() 
    {

    // constant to refresh posts
    const [ refreshPosts, setRefreshPosts ] = useState( false );

    // constant to edit post
    const [ editingPost, setEditingPost ] = useState( null );

    // handle post submission
    const handlePostSubmit = () => 
        {

        setRefreshPosts( !refreshPosts );
        setEditingPost( null );
        };
    
    // handle edit post submission
    const handleEditPost = (post) => 
        {

        setEditingPost( post );
        };
    
    // clear the edited post
    const clearEditingPost = () => 
        {

        setEditingPost( null );
        };
    
    // return the bog post form
    return (
        <div>
            <BlogPostForm
                onPostSubmit = { handlePostSubmit }
                editingPost = { editingPost }
                clearEditingPost = { clearEditingPost }
            />

            
            <PostList key={ refreshPosts } onEditPost = { handleEditPost } />
        </div>
    );
}

export default App;
