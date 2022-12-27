import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const BlogSchema = new mongoose.Schema(
  {
    creatorId: {
      type: ObjectId,
      ref: "user",
      required: true
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    blog: {
      type: Object,
      required: true
    },
    tags: {
      type: Array,
    },
    comment: {
      type: Array
    },
    likes: {
      type: Number
    },
    categoryId: [{
      type: ObjectId,
      ref: "user"
    }]
  },
  { timestamps: true }
);

let Blog = mongoose.model('Blog', BlogSchema);
export default Blog