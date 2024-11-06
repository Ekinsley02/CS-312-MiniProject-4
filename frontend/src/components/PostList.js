// import libaries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// function to post edit
function PostList( { onEditPost } ) 
    {
    
    // get the posts and state
    const [ posts, setPosts ] = useState( [] );
    
    // fetch the posts
    const fetchPosts = async () => 
        {
        
        // try to get the post page
        try 
            {

            const response = await axios.get( 'http://localhost:8000/blogs' );
            setPosts(response.data);
            } 
        
        // otherwise throw exception
        catch( error)
            {

            console.error( 'Error fetching posts', error );
            }
        };

    const handleDelete = async ( postId ) => 
        {
        
        // try to get the deletion post
        try 
            {

            await axios.delete(`http://localhost:8000/blogs/${postId}`);
            setPosts(posts.filter(post => post.id !== postId)); // Update the local state to remove the deleted post
            } 

        // catch the error
        catch( error ) {
            console.error('Error deleting post', error);
            alert('Failed to delete the post');
        }
    };

    // fetch the posts
    useEffect(() => 
        {

        fetchPosts();
        }, [] );
    
    // return the post information
    return (
        <div>
            <h2>Blog Posts</h2>

            {posts.map(post => 
                (

                <div key={ post.id } className="post">
                    <h3>{ post.title }</h3>
                    <p>{ post.body }</p>
                    <p><strong>Author:</strong> {post.author}</p>
                    
                    <button onClick={() => onEditPost(post)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
                ))}
        </div>
    );
}

export default PostList;
