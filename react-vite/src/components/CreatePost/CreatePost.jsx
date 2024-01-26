import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostThunk, thunkGetAllPosts } from '../../redux/post';
import { thunkGetAllCommunities } from '../../redux/community';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const communities = useSelector((state) => state.community);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [communityId, setCommunityId] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(thunkGetAllCommunities());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!communityId || communityId === '') {
            setErrors(['Please Select a Community']);
            return;
        }

        setIsLoading(true);

        if ((communityId && title && body) || imageUrl) {
            const formData = new FormData();

            if (imageUrl) {
                formData.append('imageUrl', imageUrl);
            }

            formData.append('title', title);
            formData.append('body', body);
            formData.append('communityId', communityId);

            try {
                await dispatch(createPostThunk(formData));
                await dispatch(thunkGetAllPosts());
                navigate('/home');
            } catch (error) {
                console.error('Error creating post:', error);
                setErrors(['Error creating post. Please try again.']);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <div className='createpage'>
                <div className='formCont'>

                    <h1 className='createPost'>Create a Post</h1>



                    <form onSubmit={handleSubmit} className='form'>
                        <select
                            id='community'
                            name='communityId'
                            className='commselect'
                            onChange={(e) => setCommunityId(e.target.value)}
                            value={communityId}
                        >
                            <option value=''>Select a Community</option>
                            {Object.values(communities).map((community) => (
                                <option key={community.id} value={community.id}>
                                    {community.name}
                                </option>
                            ))}
                        </select>
                        {errors.length > 0 && <p className='errors1'>{errors}</p>}
                        <label className='titleBox'>
                            <input
                                type='text'
                                name='title'
                                placeholder='Post Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                maxLength={100}
                                className='titleInput'
                            />
                        </label>

                        <label className='bodyBox'>
                            <textarea
                                name='body'
                                value={body}
                                placeholder='Post Body'
                                onChange={(e) => setBody(e.target.value)}
                                maxLength={255}
                                className='bodyInput'
                            />
                        </label>

                        <label className='imageBox'>
                            Image Url (optional):
                            <input type='file' accept='image/*' onChange={(e) => setImageUrl(e.target.files[0])} className='fileup' />
                        </label>

                        <button type='submit' disabled={title.length === 0 || body.length === 0 || isLoading}>
                            Submit Post
                        </button>
                    </form>
                </div>
                <div className='postRules'>
                    <h2 className='rules'>Posting Rules</h2>
                    <ol>1. Be respectful</ol>
                    <ol>2. Keep posts related to community</ol>
                    <ol>3. Look for the original source of your content</ol>
                    <ol>4. Search for duplicates before posting</ol>
                </div>
            </div>
            <div className='spinnercont'>
                {isLoading && <div className='spinner1'></div>}

            </div>
        </>
    );
};

export default CreatePost;
