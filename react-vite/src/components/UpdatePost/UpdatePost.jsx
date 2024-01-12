import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostThunk, thunkGetSinglePost } from '../../redux/post';
import { thunkGetAllCommunities } from '../../redux/community';
import { useNavigate, useParams } from 'react-router-dom';

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
        <div>
            <form onSubmit={handleSubmit} encType="multipart/form-data">

                <select id="community" name="communityId" onChange={(e) => setCommunityId(e.target.value)} value={communityId}>
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
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={100}
                    />
                </label>


                <label>Body:
                    <textarea
                        name="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        maxLength={255}
                    />
                </label>


                <label>Image URL:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageUrl(e.target.files[0])}
                    />
                </label>


                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default UpdatePost;
