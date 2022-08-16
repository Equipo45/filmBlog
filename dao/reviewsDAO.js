import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews){
            return 
        }
        try{
            reviews = await conn.db(process.env.MOVIE_DB_NAME).collection('reviews')
        }catch(e){
            console.error(`Error establising connection withthe DBs ${e}`)
        }
    }

    static async addReview(movieId, user,review,date){
        try{    
            const reviewDoc = {
                name: user.name,
                user_id:user._id,
                date:date,
                review:review,
                movie_id:ObjectId(movieId)
            }

            return await reviews.insertOne(reviewDoc)
        }catch(e){
            console.error(`Unable to add the review ${e}`)
            return {error:e}
        }
    }

    static async updateReview(reviewId,userId,review,date){
        try{
            const updateResponse = await reviews.updateOne(
                {user_id:userId,_id:ObjectId(reviewId)},
                {$set:{review:review,date:date}}
            )
            return updateResponse
        }catch(e){
            console.error(`Unable to update the reviews: ${e}`)
            return {error:e}
        }
    }

    static async deleteReview(reviewId,userId){
        try{
            //Eliminamos esta review con este id en concreto
            const deleteResponse = await reviews.deleteOne({
                _id:ObjectId(reviewId),
                user_id:userId,
            })
        }catch(e){
            console.error(`We can't delete the review:${e}`)
            return {error:e}
        }
    }
}