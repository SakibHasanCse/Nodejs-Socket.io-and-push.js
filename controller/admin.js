export const dashboard = (req, res, next)=>{
    try {
        return  res.render('admin/dashboard' ,{ pageTitle :" admin dashboard"})
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}