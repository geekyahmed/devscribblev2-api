const Ad = require('../models/ad')

module.exports = {
    getAdsPage: async (res, res) => {
        Ad.findOne().then(ad => {
            res.render('admin/ad/index', {
                ad: ad
            })
        })
    },
    submitAdsPage: (req, res) => {

    }
}