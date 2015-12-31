/**
 * Created by RMBray on 12/31/2015.
 */

$(document).ready(function () {

    var content = $('#bath-content');
    var homePath = content.data('bath-path');

    var loadContent = function (contentPath) {
        if (contentPath) {
            content.load(contentPath)
            var urlFragment = "";
            if (contentPath.indexOf(homePath) == -1) {
                urlFragment = '#' + contentPath;
            }
            else {
                window.location.replace("#");
                if (typeof window.history.replaceState == 'function') {
                    history.replaceState({}, '', window.location.href.slice(0, -1));
                }
            }
            window.history.pushState({"url": homePath}, "", urlFragment);
        }
        else {
            content.load(homePath)
            window.history.pushState({"url": contentPath}, "", "");
        }
        $(window).scrollTop(0);
    };

    var contentPath = window.location.hash.substr(1);
    loadContent(contentPath);


    $('.bath-path').click(function () {
        contentPath = $(this).attr("data-bath-path");
        loadContent(contentPath);
    });

    window.onpopstate = function (e) {
        if (e.state) {
            content.load(e.state.url)
        }
    };
});