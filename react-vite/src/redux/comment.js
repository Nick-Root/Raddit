const LOAD_USER_COMMENTS = '/comments/loadUserComments'
const POST_COMMENT = '/comments/postComment'
const DELETE_COMMENT = 'comments/deleteComment'
const UPDATE_COMMENT = '/comments/editComment'
const LOAD_POST_COMMENTS = '/comments/loadPostComments';

const loadPostComments = (postComments) => ({
    type: LOAD_POST_COMMENTS,
    postComments,
});

const loadUserComments = (userComments) => ({
    type: LOAD_USER_COMMENTS,
    userComments
})

const postComment = (comment) => ({
    type: POST_COMMENT,
    comment,
});

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

export const thunkUpdateComment = (commentId, newCommentText) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: newCommentText }),
        });

        if (res.ok) {
            const updatedComment = await res.json();
            dispatch(updateComment(updatedComment));
            return updatedComment;
        } else {
            console.error('Error updating comment');
        }
    } catch (error) {
        console.error('Errors:', error);
    }
}

export const thunkDeleteComment = (commentId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/${commentId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (res.ok) {
            dispatch(deleteComment(commentId));
        } else {
            console.error('Error deleting comment');
        }
    } catch (error) {
        console.error('Errors:', error)
    }
}

export const getCurrentComments = () => async (dispatch) => {
    const res = await fetch('/api/comments/current')

    if (res.ok) {
        const comments = await res.json()
        dispatch(loadUserComments(comments))
        return comments
    }
}

export const thunkPostComment = (questionId, commentInfo) => async (dispatch) => {
    try {
        const res = await fetch(`/api/posts/${questionId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentInfo),
        });

        if (res.ok) {
            const comment = await res.json();
            dispatch(postComment(comment));
            return comment;
        } else {
            console.log('Error posting comment:', res.status);
        }
    } catch (error) {
        console.error('Error posting comment:', error);
    }
};
// Inside thunkLoadPostComments
export const thunkLoadPostComments = (postId) => async (dispatch) => {
    try {
        const res = await fetch(`/api/comments/${postId}`);
        console.log("TTTTTTTTTTTTT")
        if (res.ok) {
            const postComments = await res.json();
            console.log('Post Comments from API:', postComments);
            dispatch(loadPostComments(postComments));
            return postComments;
        } else {
            console.error('Error loading post comments:', res.status);
        }
    } catch (error) {
        console.error('Error loading post comments:', error);
    }
};


const initialState = {

}


const commentsReducer = (state = initialState, action) => {
    console.log("%c   LOOK HERE", "color: purple; font-size: 18px", action)

    switch (action.type) {
        case LOAD_USER_COMMENTS: {
            const newState = { ...state };
            newState.user = action.userComments.user;
            newState.userComments = action.userComments.comments.map((comment) => ({
                comment: comment.comment,
                createdAt: comment.createdAt,
                commentId: comment.id,
                questionId: comment.questionId
            }))
            return newState;
        }
        case POST_COMMENT:
            return {
                comments: [action.comment],
            };
        case DELETE_COMMENT: {
            const updatedComments = state.userComments.filter(
                (comment) => comment.id !== action.commentId
            );
            return {
                userComments: updatedComments,
            };
        }
        case LOAD_POST_COMMENTS: {
            return {
                ...action.postComments
            };
        }
        case UPDATE_COMMENT: {
            const updatedComment = {
                comment: action.comment.comment,
                createdAt: action.comment.createdAt,
                commentId: action.comment.id
            };

            return {
                ...state,
                comment: updatedComment,
            };
        }
        default:
            return state;
    }
}


export default commentsReducer
