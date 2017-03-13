/**
 * Created by phuoclam on 07/01/2017.
 */

var paginator = {};

paginator.index = function (req, select, populate) {
    var query = {};

    if (req.query.search && req.query.search.length > 0) {
        query = {'title': new RegExp(req.query.search, 'i')};
    }

    if (!req.query.limit || isNaN(parseFloat(req.query.limit)) || parseFloat(req.query.limit) < 1){
        req.query.limit = 10;
    }

    if (!req.query.page || isNaN(parseFloat(req.query.page)) || parseFloat(req.query.page) < 1){
        req.query.page = 1;
    }

    var offset = (req.query.page - 1) * req.query.limit;

    var option = {
        select: select,
        sort: { '_id': 'desc' },
        populate: populate,
        offset: offset,
        limit: req.query.limit
    };

    return {
        query: query,
        option: option
    }


};

module.exports = paginator;