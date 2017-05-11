/**
 * Created by phuoclam on 02/05/2017.
 */
var KoreanStudyAboardPost = require(__base + 'datasets/koreanStudyAboardPost');

module.exports = {

	fetch: function(paging) {
        return new Promise(function(resolve, reject) {
        	KoreanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
	            if (err) reject(err);
	            resolve(result);
	        });
        });
	},

	fetchRandom: function(condition) {
		return new Promise(function(resolve, reject) {
            KoreanStudyAboardPost.count(condition, function (err, count) {
                if (err) reject(err);
                var skip = 4;
                skip = count > skip ? count - skip : 0;
                KoreanStudyAboardPost
                    .find(condition, {title: 1, image: 1, _id: 1, created_date: 1})
                    .limit(4)
                    .skip(skip)
                    .exec(function(err, result) {
                        if (err) reject(err);
                        resolve(result);
                    });
            });
        });
	},

	fetchById: function(id) {
		return new Promise(function(resolve, reject) {
	        KoreanStudyAboardPost.findById(id, function(err, result) {
	        	if (err) reject(err);
	            resolve(result);
	        })
        });
	},

	fetchMostView: function() {
		return new Promise(function(resolve, reject) {
	        var query = KoreanStudyAboardPost.find({}, {title: 1, image: 1, _id: 1, created_date: 1}).sort({"view": -1}).limit(4);
	        query.exec(function(err, result) {
	            if (err) reject(err);
	            resolve(result);
	        });
        });
	},

};
