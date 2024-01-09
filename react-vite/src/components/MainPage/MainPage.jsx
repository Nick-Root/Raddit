import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { thunkGetAllPosts } from "../../redux/post"
import { thunkGetAllCommunities } from "../../redux/community"
import { NavLink } from "react-router-dom"
import './MainPage.css'
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"
import CreateCommunityModal from "../CreateCommunity/CreateCommunity"
const MainPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let user = useSelector((state) => state.session.user)
    let posts = useSelector((state) => state.post)
    let communities = useSelector((state) => state.community)

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef()

    useEffect(() => {
        dispatch(thunkGetAllPosts())
        dispatch(thunkGetAllCommunities())
    }, [dispatch])

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    if (!posts, !communities) return null

    const closeMenu = () => setShowMenu(false);

    let postArr = Object.values(posts)
    let communityArr = Object.values(communities)

    const navToCreatePost = () => {
        navigate(`/posts/new`)
    }

    const openCreateCommunityModal = () => {
        setShowMenu(false);
    }

    let usercheck = false
    if (user) usercheck = true

    return (
        <>
            <div className="mainpage">
                <div className='posts'>
                    <div className='createPostText'>
                        <i className="fas fa-user-circle" />
                        <input
                            type='text'
                        />
                    </div>
                    {postArr.map((post) => {
                        return (
                            <div className='singlePost'>
                                <NavLink to={`/communities/${post.communityId}`}> c/{post.community.community} </NavLink>
                                <NavLink to={`/posts/${post.id}`} key={post.id}>
                                    <p>{post.title}</p>
                                    <p>{post.imageUrl}</p>
                                    <p>{post.body}</p>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
                <div className='sideMain'>
                    <h2>Home</h2>
                    <button onClick={navToCreatePost}>
                        Create Post
                    </button>

                    <OpenModalMenuItem
                        itemText='Create Community'
                        onItemClick={openCreateCommunityModal}
                        className='communityModal'
                        modalComponent={<CreateCommunityModal closeModal={closeMenu} />}
                    />
                </div>
            </div>
        </>
    )
}

export default MainPage
