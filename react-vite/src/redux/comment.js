const LOAD_USER_COMMENTS = '/comments/loadUserComments'
const POST_COMMENT = '/comments/postComment'
const DELETE_COMMENT = 'comments/deleteComment'
const UPDATE_COMMENT = '/comments/editComment'

const loadUserComments = (userComments) => {
    return {
        type: LOAD_USER_COMMENTS,
        userComments
    }
}

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

export const thunkPostComment = (questionId, commentData) => async (dispatch) => {
    try {
        const res = await fetch(`/api/questions/${questionId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
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
                ...state,
                comments: [...state.comments, action.comment],
            };
        case DELETE_COMMENT: {
            const updatedComments = state.userComments.filter(
                (comment) => comment.id !== action.commentId
            );
            return {
                ...state,
                userComments: updatedComments,
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
