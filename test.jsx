import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { useState } from "react";
import { thunkPostReview, thunkLoadProductReviews } from "../../redux/review";
import OpenModalButton from "./react-vite/src/components/OpenModalButton/OpenModalButton";

function ReviewSection() {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product.product)
    const reviews = useSelector((state) => state.reviews.reviews)
    const user = useSelector((state) => state.session.user)
    const { closeModal, setModalContent } = useModal();
    const [enableSubmit, setEnableSubmit] = useState(false);
    const { id } = useParams()

    const cancel = () => {
        closeModal();
    };
    useEffect(() => {
        dispatch(thunkGetProductDetails(id))
        dispatch(thunkLoadProductReviews(id));
    }, [dispatch]);

    if (!product || !reviews) return null

    return (
        <div className='reviewBox'>
            {user && <OpenModalButton
                buttonText={"Create a Review"}
                className="createreviewmodalbutton"
                modalComponent={<CreateReviewModal />}
            />}
            <div className="review-container">
                {reviews && reviews.map((review) => (
                    <div className='reviewHeader'>
                        <p>{review.starRating}</p>
                        <p>{review.reviewText}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ReviewModal;


const CreateReviewModal = () => {
    const dispatch = useDispatch()
    const [starRating, setStarRating] = useState(0)
    const [review, setReview] = useState("")
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const intRating = parseFloat(starRating)

        await dispatch(thunkPostReview(id, review, intRating))
        await dispatch(thunkLoadProductReviews(id))
        closeModal()
    }

    return (
        <div className='createrevmodal'>
            <h1 className='car'>Create a Review</h1>
            <form onSubmit={handleSubmit} className="reviewform">
                <input
                    type="text"
                    value={review}
                    onChange={(e) => setStarRating(e.target.value)}
                    required
                    placeholder="Star Rating 1-5"
                    className="starinput"
                    min={1}
                    max={5}
                />
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your thoughts on this product"
                    className='reviewpost'
                    maxLength={255}
                />
                <button type='submit' disabled={1 < starRating > 5 || review.length === 0} className='reviewsubmit'>Post Review</button>
            </form>
        </div>
    )
}

// export default CreateReviewModal
