var jwt = require('jwt-simple');
var userSession = require('./core/userSession.js');
var fs = require('fs');

module.exports = function (req, res, next) {
    var method = req.method;
    var path = req.path;

    if (path.indexOf('/public') === 0 || path.indexOf('/app') === 0 ||
        path.indexOf('/assets') === 0 || path.indexOf('/dist') === 0 ||
        path.indexOf('/angular') === 0 || path.indexOf('/css') === 0 ||
        path.indexOf('/oclazyload') === 0 || path.indexOf('/font-awesome') === 0 ||
        path.indexOf('/bootstrap') === 0 || path.indexOf('/jquery') === 0 || path.indexOf('/navbar') === 0
        )
    {
        return next();
    }
    if (method === 'GET' || method === 'POST') {
        
        if (path === '/api/users/reportProblem' || path === '/api/users/login' || path === '/api/users/authenticateWl' || path === '/api/users/login/' || path === '/') {
            return next();
        } else {
            var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
            if (token) {
               
                userSession.GetUserSessionByPublicToken(token).then(function (session) {
                    if (session !== null && session !== undefined) {
                        try {
                            var decoded = jwt.decode(session.token, global.jwtToken);
                            var iss = decoded.iss;
                            var exp = new Date(decoded.exp);
                            var cur = new Date();
                            if (session.loggedOutTime !== null || session.status !== 1) {
                                return res.sendStatus(401);
                            }
                            if (exp.getTime() > cur.getTime()) { // if active session
                                userSession.UpdateLastActiveTime(iss);
                                return next();
                            } else {
                                var diff = Math.ceil(Math.abs(cur.getTime() - session.lastActiveTime.getTime()) / (1000 * 60));
                                if (diff < global.sessionTimeout) {
                                    userSession.UpdateToken(iss).then(function (data) {
                                        return next();
                                    });

                                } else { // if session is timed out
                                    return res.sendStatus(401);
                                }
                            }

                        } catch (err) {
                            return res.sendStatus(401);
                        }
                    }
                    else { // If session object from db is null
                        return res.sendStatus(401);
                    }
                });

            } else { // If don't have token
                return res.sendStatus(401);
            }
        }

    } else { // If not GET or POST
        return next();
    }
};
