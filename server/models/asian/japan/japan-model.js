/**
 * Created by phuoclam on 02/05/2017.
 */
var JapanStudyAboardPost = require(__base + 'datasets/japanStudyAboardPost');

module.exports = function() {

	fetchByPaginator: function(paging) {
        return new Promise(function(resolve, reject) {
        	JapanStudyAboardPost.paginate(paging.query, paging.option, function (err, result) {
	            if (err) reject(err);
	            resolve(result);
	        });
        });
	}
};
