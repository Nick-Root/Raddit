const LOAD_ALL_COMMUNITIES = "communities/loadAllCommunities"
const LOAD_SINGLE_COMMUNITY = "communities/loadSingleCommunity"
const CREATE_COMMUNITY = "communities/createCommunity"
const UPDATE_COMMUNITY = "communities/updateCommunity"
const DELETE_COMMUNITY = "communities/deleteCommunity"

const createCommunity = (community) => ({
    type: CREATE_COMMUNITY,
    community: community,
});

const updateCommunity = (community) => ({
    type: UPDATE_COMMUNITY,
    community: community,
});

const loadAllCommunities = (communities) => ({
    type: LOAD_ALL_COMMUNITIES,
    communities,
});

const loadSingleCommunity = (community) => ({
    type: LOAD_SINGLE_COMMUNITY,
    community,
});

const deleteCommunity = (communityId) => ({
    type: DELETE_COMMUNITY,
    communityId,
});

export const thunkGetAllCommunities = () => async (dispatch) => {
    const res = await fetch("/api/communities");
    if (res.ok) {
        const allCommunities = await res.json();
        dispatch(loadAllCommunities(allCommunities));
        return allCommunities;
    } else {
        console.error('/api/communities error output');
    }
};

export const updateCommunityThunk = (communityId, updatedCommunity) => async (dispatch) => {
    const res = await fetch(`/api/communities/${communityId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ community: updatedCommunity }),
    });

    if (res.ok) {
        const updatedCommunityData = await res.json();
        dispatch(updateCommunity(updatedCommunityData));
        return updatedCommunityData;
    }
};

export const thunkGetSingleCommunity = (communityId) => async (dispatch) => {
    const res = await fetch(`/api/communities/${communityId}`);
    if (res.ok) {
        const community = await res.json();
        dispatch(loadSingleCommunity(community));
        return community;
    } else {
        console.error(`/api/communities/${communityId} error output`);
    }
};

export const createCommunityThunk = (community) => async (dispatch) => {
    const res = await fetch("/api/communities/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(community),
    });

    if (res.ok) {
        const newCommunity = await res.json();
        dispatch(createCommunity(newCommunity));
        return newCommunity;
    } else {
        const errorData = await res.json().catch(() => null);
        console.error('Error creating community:', res.status, errorData);
    }
};

export const deleteCommunityThunk = (communityId) => async (dispatch) => {
    const res = await fetch(`/api/communities/${communityId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        dispatch(deleteCommunity(communityId));
    } else {
        const errorData = await res.json().catch(() => null);
        console.error('Error deleting community:', res.status, errorData);
    }
};


const initialState = {};

const communityReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_COMMUNITIES:
            return { ...state, ...action.communities };
        case LOAD_SINGLE_COMMUNITY:
            return { ...state, ...action.community };
        case CREATE_COMMUNITY:
            return { ...state, communities: [...(state.communities || []), action.community] };
        case UPDATE_COMMUNITY:
            return {
                ...state,
                communities: (state.communities || []).map((community) =>
                    community.id === action.community.id ? action.community : community
                ),
            };
        case DELETE_COMMUNITY:
            return {
                ...state,
                communities: (state.communities || []).filter((community) => community.id !== action.communityId),
            };
        default:
            return state;
    }
};

export default communityReducer;
