const jwt = require("jsonwebtoken")

module.exports = {

    verifyToken(req, res, next) {

        try {
            let tokenHeader = req.headers['x-access-token']

            if (!tokenHeader) {
                return res.send({
                    success: false,
                    response_message: "Token tidak ditemukan"
                });
            }

            if (tokenHeader.split(' ')[0] !== 'Bearer') {
                return res.status(401).send({
                    response_message: "Format token salah"
                });
            }

            let token = tokenHeader.split(' ')[1];

            if (!token) {
                return res.status(401).send({
                    response_message: "Token tidak tersedia"
                });
            }

            // Verify access token
            jwt.verify(token, "dans_multipro_secret_key", (err, decoded) => {

                // kalau format token salah dan sudah expired masuk err
                if (err) {
                    return res.status(401).send({
                        response_message: "Token yang anda masukan tidak dikenali"
                    });
                }

                // Jika token ada data email
                if (decoded.username) {
                    next()
                } else {
                    return res.status(401).send({
                        response_message: "Token yang anda masukan tidak dikenali"
                    });
                }
            })


        } catch (e) {
            return res.send({
                success: false,
                response_error: e.message
            });
        }
    }

}
