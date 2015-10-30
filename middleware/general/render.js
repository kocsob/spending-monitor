/**
 * Using the template engine render the values into the template
 */
module.exports = function (objectRepository, viewName) {

    return function (req, res) {
        res.tpl['viewName'] = viewName;
        return res.render(viewName, res.tpl);
    };

};
