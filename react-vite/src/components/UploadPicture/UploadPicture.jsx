import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../redux/post';

const UploadPicture = ({ onImageChange }) => {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);


        setImageLoading(true);
        onImageChange(image);

        setImage(null);
        setImageLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="image">Image Upload:</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />

            <button type="submit">Submit Image</button>

            {imageLoading && <p>Loading...</p>}
        </form>
    );
};

export default UploadPicture;
