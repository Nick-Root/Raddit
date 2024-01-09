import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostThunk } from '../../redux/post';
import UploadPicture from '../UploadPicture/UploadPicture';
import { thunkGetAllCommunities } from '../../redux/community';
import { useSelector } from 'react-redux';

const CreatePost = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('post');
    const [post, setPost] = useState({ title: '', body: '', imageUrl: null, communityId: null });
    const communities = useSelector((state) => state.community);

    useEffect(() => {
        dispatch(thunkGetAllCommunities());
    }, [dispatch]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handlePostChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleImageChange = (image) => {
        setPost({ ...post, imageUrl: image });
    };

    const handleCommunityChange = (e) => {
        setPost({ ...post, communityId: parseInt(e.target.value, 10) });
    };

    const renderCommunityDropdown = () => {
        if (!communities) {
            return <p>Loading communities...</p>;
        }

        return (
            <select id="community" onChange={handleCommunityChange}>
                <option value="">Select a Community</option>
                {Object.values(communities).map((community) => (

                    <option key={community.id} value={community.id}>
                        {/* {console.log("Community:", community)} */}
                        {community.name}
                    </option>
                ))}
            </select>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Post", post)
        if (activeTab === 'post') {
            await dispatch(createPostThunk(post));
        }
    };

    return (
        <div>
            {renderCommunityDropdown()}
            <div>
                <button onClick={() => handleTabChange('post')}>Post</button>
                <button onClick={() => handleTabChange('image')}>Image Upload</button>
            </div>

            {activeTab === 'post' && (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handlePostChange}
                    />

                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        name="body"
                        value={post.body}
                        onChange={handlePostChange}
                    />

                    <button type="submit">Submit Post</button>
                </form>
            )}

            {activeTab === 'image' && (
                <UploadPicture onImageChange={handleImageChange} />
            )}
        </div>
    );
};

export default CreatePost;
