// Import Lib
import mongoose from 'mongoose';

// Import function
import Blogs from '../models/blogs-model.js';


// Create Blog Function
const createBlog = async (req, res, next) => {
    try {
        const blogs = req.body

        blogs.comment.userId = mongoose.Types.ObjectId(blogs.comment.userId);

        const blogsData = await Blogs.create(blogs)

        return res.send(blogsData);
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

// Get Blog Function
const getBlog = async (req, res, next) => {
    try {
        const blogsData = await Blogs.find({})


        return res.send(blogsData);
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

// Update Blog Function
const updateBlog = async (req, res, next) => {
    try {
        const blogs = req.body

        const blogsData = await Blogs.findByIdAndUpdate(blogs.id, blogs)

        return res.send(blogsData);
    } catch (error) {
        return res.json({
            message: error,
        });
    }
};

// Delete Blog Function
const deleteBlog = async (req, res, next) => {
    try {
        const Id = req.params.id
        
        const blogsData = await Blogs.findByIdAndDelete(Id)

        return res.send(blogsData);

    } catch (error) {
        // error handlig
        res.status(400).json({
            status: "fail",
            error: error.message,
        });
    }
};

export { createBlog, getBlog, updateBlog, deleteBlog }