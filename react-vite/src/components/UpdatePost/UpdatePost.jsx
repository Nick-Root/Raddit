import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


const UpdatePost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const post = useSelector((state) => state.post)
    const communities = useSelector((state) => state.community)

}
