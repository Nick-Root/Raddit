import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPostThunk, thunkGetAllPosts } from '../../redux/post';
import { thunkGetAllCommunities } from '../../redux/community';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css'

const CreatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const communities = useSelector((state) => state.community);
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [imageUrl, setImageUrl] = useState(null)
    const [communityId, setCommunityId] = useState("")
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(thunkGetAllCommunities());
    }, [dispatch]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!communityId || communityId === "") {
            setErrors(["Please Select a Community"]);
            return;
        }

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
        <div className='createpage'>
            <div className='formCont'>

                <form onSubmit={handleSubmit} className='form'>
                    <select id="community" name="communityId" onChange={e => setCommunityId(e.target.value)} value={communityId}>
                        <option value="">Select a Community</option>
                        {Object.values(communities).map((community) => (
                            <option key={community.id} value={community.id}>
                                {community.name}
                            </option>
                        ))}
                    </select>
                    {errors && <p className='errors'>{errors}</p>}
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

                    <button type="submit" disabled={title.length === 0 || body.length === 0}>Submit Post</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
