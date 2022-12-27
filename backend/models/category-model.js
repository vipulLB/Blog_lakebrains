import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true
        },
        categoryDes: {
            type: Object,
            required: true
        },
        categorySlug: {
            type: String,
            unique: true,
            index: true
        },
        blogsId: {
            type: Array,
        }
    },
    { timestamps: true }
);

let Category = mongoose.model('Category', CategorySchema);
export default Category