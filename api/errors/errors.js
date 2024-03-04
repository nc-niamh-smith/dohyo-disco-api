exports.customErrorHandler = (err, req, res, next) => {
    if(err.msg && err.status) {
        return res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
}

exports.PSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02' || err.code === '23502') {
        return res.status(400).send({msg: "Invalid input"})
    }
    else {
        next(err)
    }
};

exports.serverError = (err, req, res, next) => {
    if (err) console.log(err)
    return res.status(500).send({msg: "Internal Server Error"})
}