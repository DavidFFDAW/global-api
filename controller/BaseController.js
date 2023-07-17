class BaseController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    request(callback) {
        try {
            return callback();
        } catch (e) {
            return this.res.status(e.statusCode || 500).json({
                type: 'Error while request',
                message: e.message,
            });
        }
    }
}

module.exports = BaseController;
