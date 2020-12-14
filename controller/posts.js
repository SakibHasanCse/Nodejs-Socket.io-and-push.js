import Post from '../model/post'

export const newPost = async (req, res, next) => {
    try {
        const post = await Post.find()
        return res.render('posts/index', { post  ,pageTitle:'Posts'})
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })

    }
}

