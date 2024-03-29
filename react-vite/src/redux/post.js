const LOAD_ALL_POSTS = "posts/loadAllPosts";
const LOAD_SINGLE_POST = "posts/loadSinglePost";
const LOAD_CURRENT_USER_POSTS = "posts/loadCurrentUserPosts";
const CREATE_POST = "posts/createPost";
const UPDATE_POST = "posts/updatePost";
const DELETE_POST = "posts/deletePost";

const createPost = (post) => ({
    type: CREATE_POST,
    post: post,
});

const updatePost = (post) => ({
    type: UPDATE_POST,
    post: post,
});

const loadAllPosts = (posts) => ({
    type: LOAD_ALL_POSTS,
    posts,
});

const loadCurrentUserPosts = (posts) => ({
    type: LOAD_CURRENT_USER_POSTS,
    posts,
});

const loadSinglePost = (post) => ({
    type: LOAD_SINGLE_POST,
    post,
});

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId,
});

export const thunkGetAllPosts = () => async (dispatch) => {
    try {
        const res = await fetch("/api/posts");
        if (res.ok) {
            const allPosts = await res.json();
            dispatch(loadAllPosts(allPosts));
            return allPosts;
        } else {
            console.error('/api/posts error output', await res.text());
        }
    } catch (error) {
        console.error('Error in thunkGetAllPosts:', error);
    }
};

export const updatePostThunk = (postId, updatedPost) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: updatedPost,
    });

    if (res.ok) {
        const updatedPostData = await res.json();
        dispatch(updatePost(updatedPostData));
        return updatedPostData;
    }
};

export const thunkGetSinglePost = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`);
    if (res.ok) {
        const post = await res.json();
        dispatch(loadSinglePost(post));
        return post;
    } else {
        console.error(`/api/posts/${postId} error output`);
    }
};

export const createPostThunk = (formData) => async (dispatch) => {
    const res = await fetch("/api/posts/new", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
    });

    if (res.ok) {
        const newPost = await res.json();
        dispatch(createPost(newPost));
        return newPost;
    } else {
        throw new Error("Error creating post")
    }
};

export const deletePostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(deletePost({ postId }));
    } else {
        const errorData = await res.json().catch(() => null);
        console.error('Error deleting post:', res.status, errorData);
    }
};

export const thunkGetCurrentUserPosts = () => async (dispatch) => {
    const res = await fetch("/api/posts/current");
    if (res.ok) {
        const currentUserPosts = await res.json();
        dispatch(loadCurrentUserPosts(currentUserPosts.posts));
        return currentUserPosts;
    } else {
        console.error('/api/posts/current error output', await res.text());
    }
};

const initialState = {};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_POSTS:
            return { ...action.posts };
        case LOAD_SINGLE_POST:
            return { ...action.post };
        case CREATE_POST:
            return { ...state, posts: [...(state.posts || []), action.post] };
        case UPDATE_POST:
            return {
                ...state,
                posts: (state.posts || []).map((post) =>
                    post.id === action.post.id ? action.post : post
                ),
            };
        case LOAD_CURRENT_USER_POSTS:
            return { ...action.posts }
        case DELETE_POST:
            return {
                ...state,
                posts: (state.posts || []).filter((post) => post.id !== action.postId),
            };
        default:
            return state
    }
};

export default postReducer;
