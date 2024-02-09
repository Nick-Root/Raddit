import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostThunk, thunkGetSinglePost } from '../../redux/post';
import { thunkGetAllCommunities } from '../../redux/community';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdatePost.css'

const UpdatePost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const communities = useSelector((state) => state.community);
    const postInfo = useSelector((state) => state.post);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [communityId, setCommunityId] = useState("");
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(thunkGetAllCommunities());

        dispatch(thunkGetSinglePost(id));
    }, [dispatch, id]);

    useEffect(() => {

        if (postInfo) {
            setTitle(postInfo.title);
            setBody(postInfo.body);
            setCommunityId(postInfo.communityId);

            setImageUrl(postInfo.imageUrl);
        }
    }, [postInfo]);

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
            formData.append("body", body);
            formData.append("communityId", communityId);

            await dispatch(updatePostThunk(id, formData));
            await dispatch(thunkGetSinglePost(id))
            // await dispatch(thunkGetAllPosts());
            navigate(`/posts/${id}`);
        }
    };

    return (
        <div className='updatepage'>

            <div className='formCont'>
                <h1 className='createPost'>Update a Post</h1>
                <form onSubmit={handleSubmit} className='form' encType="multipart/form-data">

                    <select id="upcommunity" name="communityId" onChange={(e) => setCommunityId(e.target.value)} value={communityId}>
                        <option value="">Select a Community</option>
                        {Object.values(communities).map((community) => (
                            <option key={community.id} value={community.id}>
                                {community.name}
                            </option>
                        ))}
                    </select>
                    <p></p>
                    {errors && <p className='commerror'>{errors}</p>}
                    <label className='titleBox'>
                        <input
                            type="text"
                            name="title"
                            placeholder='Update Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                            className='titleInput'
                        />
                    </label>


                    <label className='bodyBox'>
                        <textarea
                            name="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            maxLength={255}
                            placeholder='Update Body'
                            className='bodyInput'
                        />
                    </label>


                    <label className='imageBox'>Image (optional):
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageUrl(e.target.files[0])}
                        />
                    </label>


                    <button type="submit" disabled={title && title.length === 0 || body && body.length === 0}>Update Post</button>
                </form>
            </div>
            <div className='postRulesCont'>

                <h1 className='rules'>Posting Rules</h1>
                <div className='postRules'>
                    <ol>1. Be respectful</ol>
                    <ol>2. Keep posts related to community</ol>
                    <ol>3. Look for the original source of your content</ol>
                    <ol>4. Search for duplicates before posting</ol>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;
