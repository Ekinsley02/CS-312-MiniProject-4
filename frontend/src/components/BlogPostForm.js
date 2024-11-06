// import libaries
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// function for blog post form
function BlogPostForm( { onPostSubmit, editingPost, clearEditingPost } ) 
    {

    const [ title, setTitle ] = useState( '' );
    const [ body, setBody ] = useState( '' );
    const [ author, setAuthor ] = useState( '' );

    // pre fill the form to edit
    useEffect(() => {

        // check if editing post
        if( editingPost ) 
            {
            
            // set information
            setTitle( editingPost.title );
            setBody( editingPost.body );
            setAuthor( editingPost.author );
            }
    }, [ editingPost ]);

    const handleSubmit = async (e) => 
        {
        
        // prevent the default
        e.preventDefault();

        // try to either eidt or create new post
        try {

            if( editingPost ) 
                {

                // Edit existing post
                await axios.put(`http://localhost:8000/blogs/${ editingPost.id }`,
                                                                 { title, body, author });
                
                // tel the user the post updated
                alert('Post updated successfully');
                
                // clear post
                clearEditingPost(); 
                } 
            
            // other wise create a new post
            else 
                {

                // Create new post
                await axios.post('http://localhost:8000/blogs', { title, body, author });
                alert('Post created successfully');
                }

            setTitle('');
            setBody('');
            setAuthor('');

            // refresh
            onPostSubmit();

        } 
        
        // catch the error
        catch( error ) 
            {

            console.error('Error submitting post', error);
            }
        };
    
    // return the blog post information
    return (
        <form onSubmit={ handleSubmit }>

            <h2>{editingPost ? 'Edit Post' : 'Create a New Post'}</h2>
            
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Body"
                value={body}
                onCh
                ange={(e) => setBody(e.target.value)}
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <button type="submit">{editingPost ? 'Update Post' : 'Create Post'}</button>
            {editingPost && <button type="button" onClick={clearEditingPost}>Cancel Edit</button>}
        </form>
    );
}

export default BlogPostForm;
