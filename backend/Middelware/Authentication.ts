const moment = require('moment')

export const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user.authenticated && req.session.cookie && req.session.cookie.expires && !isCookieExpired(req.session.cookie.expires)) {
        return next()
    }
    res.redirect('/');
};

const isCookieExpired = (cookieExpire) => {
    const now = moment(Date.now());
    const cookie = moment(cookieExpire);
    if(now.isValid() && cookie.isValid() && cookie.isAfter(now)){
        return false;
    }else{
        return true;
    }
};
