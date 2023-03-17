const { doHttpCallByName } = require("../service/gateway");

module.exports = {

    async findAll(req, res) {

        // Create a Models
        const modelsFindAll = {
            id: req.body.id,
            description: req.body.description,
            location: req.body.location,
            full_time: req.body.full_time,
            page: req.body.page
        };

        try {
            const response = await doHttpCallByName(modelsFindAll);
            if (typeof(response) === 'object') {
                return res.json({
                    success: true,
                    data: response
                });
            } else {
                return res.json({
                    success: false,
                    data: response
                });
            }

        } catch (error) {
            console.error(error);
            return res.json({
                success: false,
                response_message: error.toString()
            });
        }
    }

}