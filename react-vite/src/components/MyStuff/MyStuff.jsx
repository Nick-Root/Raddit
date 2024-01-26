import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { thunkGetCurrentUserPosts } from "../../redux/post";
import { thunkGetCurrentUserCommunities } from "../../redux/community";

import './MyStuff.css'


const MyStuff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currUserPosts = useSelector((state) => Object.values(state.post));
  const currUserCommunities = useSelector((state) => Object.values(state.community));
  const [isLoading, setIsLoading] = useState(true);
  const ulRef = useRef();
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    dispatch(thunkGetCurrentUserPosts());
    dispatch(thunkGetCurrentUserCommunities());
    setIsLoading(false);
  }, [dispatch]);

  const user = useSelector((state) => state.session.user);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!currUserPosts) return null
  if (!currUserCommunities) return null

  console.log(currUserCommunities[0])

  return (
    <div className="mystuffpage">
      <div className="tabs">
        <div>
          <button onClick={() => handleTabChange('posts')} className="postsTab">Posts</button>
        </div>
        <div className='bbuts'>
          <button onClick={() => handleTabChange('communities')} className='communititesTab'>Communities</button>
        </div>
      </div>

      {activeTab === 'posts' && (
        <div>
          {isLoading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            currUserPosts.length > 0 ? (
              currUserPosts.map((statePost) => (
                <div className='singlePost' key={statePost.id}>
                  <div className='commPoster'>
                    <NavLink to={`/communities/${statePost?.communityId}`} className='postComm'>
                      <p>c/{statePost.community && statePost.community?.community}</p>
                    </NavLink>
                    <p className="postedBy">Posted by {statePost && statePost.poster}</p>
                  </div>
                  <NavLink to={`/posts/${statePost.id}`}>
                    <h1 className='postTitle'>{statePost.title}</h1>
                    <h3 className='postBody'>{statePost.body}</h3>
                    {statePost.imageUrl && <img src={statePost.imageUrl} className="awsImg" alt="Post"></img>}
                  </NavLink>
                </div>
              )).reverse()
            ) : (
              <p className="noneYet">No posts yet</p>
            )
          )}
        </div>
      )}
      {activeTab === 'communities' && (
        <div className='msCommBox'>
          {currUserCommunities.length > 0 ? (
            currUserCommunities.map((community) => (
              <div className="singleCommunity" key={community.id}>
                {console.log("community", community)}
                <NavLink to={`/communities/${community.id}`} className='communityLink'>
                  <h1 className='communityName1'>{community.community}</h1>
                </NavLink>
                <p className='communityDesc'>{community.description}</p>

              </div>
            ))
          ) : (
            <p className="noneYet">No communities yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyStuff;
