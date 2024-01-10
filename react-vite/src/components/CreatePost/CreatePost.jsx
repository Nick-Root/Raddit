import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostThunk, thunkGetAllPosts } from '../../redux/post';
import { thunkGetAllCommunities } from '../../redux/community';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const communities = useSelector((state) => state.community);
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [imageUrl, setImageUrl] = useState(null)
    const [communityId, setCommunityId] = useState("")

    useEffect(() => {
        dispatch(thunkGetAllCommunities());
    }, [dispatch]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if ((communityId && title && body) || imageUrl) {
            const formData = new FormData();
            if (imageUrl) {
                formData.append("imageUrl", imageUrl);
            }

            formData.append("title", title);
            formData.append("body", body)
            formData.append("communityId", communityId)

            console.log(formData)
            await dispatch(createPostThunk(formData));
            await dispatch(thunkGetAllPosts())
            navigate('/home')
            // const post = { "title": title, "body": body, "communityId": communityId }
            // if (imageUrl) {
            // post.imageUrl = imageUrl
            // }
            // console.log(post);
            // dispatch(createPostThunk(post));
        }
    };


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <select id="community" name="communityId" onChange={e => setCommunityId(e.target.value)} value={communityId}>
                    <option value="">Select a Community</option>
                    {Object.values(communities).map((community) => (
                        <option key={community.id} value={community.id}>
                            {community.name}
                        </option>
                    ))}
                </select>
                <label>Title:
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </label>

                <label>Body:
                    <textarea
                        name="body"
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                </label>

                <label>Image URL:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageUrl(e.target.files[0])}
                    />
                </label>

                <button type="submit">Submit Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
