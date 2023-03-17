const Models = require("../../models/login_user");
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {

    // Create a Models
    const models = new Models({
        username: req.body.username,
        password: req.body.password
    });

    Models.find(new Models(models), (err, result) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while find data"
            });
        else {

            // Create token
            let accessToken = ""
            if (result?.length > 0) {
                const expired = "60"
                accessToken = 'Bearer ' + jwt.sign({
                    username: result[0].username
                }, 'dans_multipro_secret_key', {
                    expiresIn: `${expired}m`.toString()
                });
            }

            res.status(200).send({
                success: result?.length > 0 ? true : false,
                data: result?.length > 0 ?
                    {
                        ...result[0],
                        "token": accessToken
                    } : "",
                message: result?.length > 0 ? `Login Successfuly` : "Username or Password Not Correct"
            })

        };
    });

};