
import ReviewsDAO from "../../dao/reviewsDAO.js"

//En este caso metemos losd datos desde post , por lo tanto desde el body de la request
export default class ReviewsController{
    static async apiPostReview(req,res,next){
        try{
            //{
              //  "movie_id":"573a1390f29313caabcd4135",
                //"review":"Gran pelicula",
                //"user_id":"I123",
                //"name":"Ismae"
            //}
            const movieID = req.body.movie_id
            const review = req.body.review
            const userInfo = {
                name:req.body.name,
                _id:req.body.user_id
            }
            const date = new Date()
            const ReviewResponse = await ReviewsDAO.addReview(
                movieID,
                userInfo,
                review,
                date
            )

            res.json({status:"Sucess"})
        }catch(e){
            res.status(500).json({'error':e.message})
        }
    }

    static async apiUpdateReview(req,res,next){
        try{
            const reviewId = req.body.review_id
            const review = req.body.review

            const date = new Date()

            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date
            )

            let { error } = ReviewResponse 
            if(error){
                res.status(500).json({error:`Error msg ${error}`})
            } 

            if(ReviewResponse.modifiedCount === 0 ){
                throw new Error("Unable to update the review.Verify your are the owner")
            }

            res.json({sucess:"Sucess"})
        }catch(e){

            res.status(500).json({error: e.message})

        }
    }

    static async apiDeleteReview(req,res,next){
        try{
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            )
            res.json({status:"Sucess"})

        }catch(e){
            res.status(500).json({error:`Some error happend while deleting the review ${e}`})
        }
    }
}