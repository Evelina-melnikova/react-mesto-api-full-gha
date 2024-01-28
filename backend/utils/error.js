/* eslint-disable indent */
module.exports = ((e, req, res, next) => {
    const { statusCode = 500 } = e;
    res
        .status(statusCode)
        .send({
            message: statusCode === 500
                ? 'На сервере произошла ошибка'
                : e.message,
        });

    next();
});
