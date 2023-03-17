const Axios = require('axios');

const doHttpCallByName = async (models) => {

    // id: req.body.id,
    //         description: req.body.description,
    //         location: req.body.location,
    //         type: req.body.type,
    //         page: req.body.page

    let url = ""

    if (models.id) {
        url += `http://dev3.dansmultipro.co.id/api/recruitment/positions/${models.id}`;
    }

    else {
        url += "http://dev3.dansmultipro.co.id/api/recruitment/positions.json"

        if (models.description || models.location || models.full_time || models.page) {
            url += "?"
            if (models.description) {
                url += `description=${models.description}`
            }
            if (models.location) {
                if (models.description) {
                    url += `&location=${models.location}`
                } else {
                    url += `location=${models.location}`
                }
            }
            if (models.full_time) {
                if (models.description || models.location) {
                    url += `&full_time=${models.full_time}`
                } else {
                    url += `full_time=${models.full_time}`
                }
            }
            if (models.page) {
                if (models.description || models.location || models.full_time) {
                    url += `&page=${models.page}`
                } else {
                    url += `page=${models.page}`
                }
            }
        }
    }

    console.log(url)

    const config = {
        url: url,
        method: "GET"
    }

    try {
        const { data } = await Axios(config)
        return data

    } catch (e) {
        if (e.isAxiosError) {
            return e.message
        } else {
            return null
        }
    }

}

module.exports = {
    doHttpCallByName
}