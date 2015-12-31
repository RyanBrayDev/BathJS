/**
 * Created by RMBray on 12/31/2015.
 */

$(document).ready(function () {

    var content = $('#bath-content');
    var homePath = content.data('bath-path');

    var registerAnchorClickEvents = function() {
        $("a[href^='#']").click(function (e) {
            // prevent default anchor click behavior
            e.preventDefault();
            // store hash
            var hash = this.hash;
            // animate
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 300);
        });
    }

    var loadContent = function (contentPath) {
        if (contentPath) {
            content.load(contentPath, function(){
                registerAnchorClickEvents();
            })
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
            content.load(homePath, function(){
                registerAnchorClickEvents();
            })
            window.history.pushState({"url": contentPath}, "", "");
        }

        $(window).scrollTop(0);
    };

    var contentPath = window.location.hash.substr(1);
    loadContent(contentPath);

    $('.bath-nav').click(function () {
        contentPath = $(this).attr("data-bath-path");
        loadContent(contentPath);
    });

    window.onpopstate = function (e) {
        if (e.state) {
            content.load(e.state.url)
        }
    };
});
