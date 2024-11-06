
// Define constants
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// used defined constants
app.use( cors() );
app.use( bodyParser.json() );

// Path to write blog information
const BLOGS_PATH = './data/blogs.json';
const USERS_PATH = './users.json';

// Helper functions to read and write JSON files
const readData = ( path ) => JSON.parse( fs.readFileSync( path, 'utf-8' ) );
const writeData = ( path, data ) => fs.writeFileSync( path, JSON.stringify( data, null, 2 ) );

// Signup endpoint
app.post('/signup', (req, res) => 
    {

    const { userId, password, name } = req.body;
    const users = readData(USERS_PATH);

    if( users.find( user => user.userId === userId ) ) 
        {

        return res.status(400).json({ message: 'User already exists' });
        }

    users.push( { userId, password, name } );

    writeData(USERS_PATH, users);

    res.json({ message: 'Signup successful' });
    });

// sign in end point
app.post( '/signin', ( req, res ) => 
    {
    
    // constants
    const { userId, password } = req.body;

    const users = readData(USERS_PATH);

    const user = users.find(user => user.userId === userId && user.password === password);
    
    // check if there is a user
    if( user )
        {
        
        // report sign in successful
        res.json( { message: 'Signin successful' } );
        } 
    
    // otherwise, invalid credentials
    else{

        res.status(400).json({ message: 'Invalid credentials' });
        }
    });

// get every available blog post
app.get( '/blogs', (req, res) => 
    {
    
    // read blog data
    const blogs = readData(BLOGS_PATH);

    res.json(blogs);
    } );

// Create a new blog post
app.post( '/blogs', (req, res) => 
    {
    
    // define constants
    const { title, body, author } = req.body;

    const blogs = readData(BLOGS_PATH);

    const newBlog = { id: uuidv4(), title, body, author };

    // push the new blog
    blogs.push( newBlog );
    
    // write the blog to the jsson path
    writeData(BLOGS_PATH, blogs);

    res.json( newBlog);
    });

// Edit a blog post
app.put( '/blogs/:id', ( req, res ) => 
    {
    
    // define constast
    const { id } = req.params;
    const { title, body } = req.body;

    let blogs = readData(BLOGS_PATH);

    const blogIndex = blogs.findIndex(blog => blog.id === id);
    
    // check if post not found, report
    if( blogIndex === -1 )
         return res.status(404).json( { message: 'Post not found' } );

    // find the blog
    blogs[ blogIndex ] = { ...blogs[ blogIndex ], title, body };

    // write data to the blog
    writeData(BLOGS_PATH, blogs);

    res.json( blogs[ blogIndex ] );
    });

// Delete a blog post
app.delete( '/blogs/:id', ( req, res ) => 
    {
    
    // define constants
    const { id } = req.params;
    
    // read blog data at the path
    let blogs = readData( BLOGS_PATH );

    const initialLength = blogs.length;

    blogs = blogs.filter(blog => blog.id !== id);
    
    // check if page not found
    if( blogs.length === initialLength ) 
        {
        
        // report
        return res.status(404).json({ message: 'Post not found' });
        }
    
    // write data to blogs path
    writeData(BLOGS_PATH, blogs);

    res.json({ message: 'Blog deleted' });
    });

// Start the server on port 8000
app.listen(8000, () => console.log( 'Server running on http://localhost:8000' ));
