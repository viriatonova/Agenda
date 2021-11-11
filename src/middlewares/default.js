exports.middlewareGlobal = (req, resp, next) => {
    next();
};

exports.checkCsrfError = (err, req, resp, next) => {
    if(err && err.code === 'EBADCSRFTOKEN') return resp.send('404');
}

exports.csrfMiddleware = (req, resp, next) => {
    resp.locals._csrf = req.csrfToken();
    next();
}