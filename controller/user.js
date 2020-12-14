import User from '../model/user'

export const newUser = async (req, res, next) => {
    try {
        return res.render('auth/ragister', { pageTitle: "Create New account" })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })

    }
}
export const postnewUser = async (req, res) => {
    try {
        const { name, email, password, } = req.body
        if (!name || !email || !password) {
            return res.redirect('/ragister')
        }

        const user = new User({
            name, email, password
        });

        try {
            await user.save();
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }

    }
    catch (error) {
        console.log(error)
        return res.status(400).send({
            upload_error: 'Registaion not succesfully ,Try agin'
        });
    }
}
export const loginUser = async (req, res, next) => {
    try {
        return res.render('auth/login', { pageTitle: "Login Your account" })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })

    }
}
export const postLoginUser = async (req, res) => {
    try {
        const { email, password, } = req.body
        if (!email || !password) {
            return res.redirect('/login')
        }


        const user = await User.findOne({ email: email, password: password })
        if (!user) {
            return res.redirect('/login')
        }
        return res.redirect('/');

    }
    catch (error) {
        console.log(error)
        return res.status(400).send({
            upload_error: 'Login not succesfully ,Try agin'
        });
    }
}
export const profile = async (req, res, next) => {
    try {
        return res.render('root/profile')
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })

    }
}
export const updateuser = async (req, res) => {
    try {


        const { name, email, password, profileimage } = req.body

        const user = new User({
            name, email, password
        });

        saveImage(user, profileimage);
        try {
            await user.save();
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }

    }
    catch (error) {
        console.log(error)
        return res.status(400).send({
            upload_error: 'Profile Update failed  try agin'
        });
    }
}


