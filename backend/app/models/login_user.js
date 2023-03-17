const sql = require("./index.js")
const crypto = require("crypto")

// constructor
const Models = function (models) {
    this.username = models.username,
        this.password = models.password
}

Models.find = (models, result) => {

    const passwordHashPlaintext = crypto.createHash('md5').update(models.password).digest('hex')

    let query = `select id, username from \`user\` where username = '${models.username}' and password = '${passwordHashPlaintext}'`

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

module.exports = Models;