var FollowAlongHighlight = /** @class */ (function () {
    function FollowAlongHighlight() {
        this.highlightSpan = document.createElement("span");
    }
    FollowAlongHighlight.prototype.moveHighlightLinkToAnchor = function (anchor) {
        var linkCoords = anchor.getBoundingClientRect();
        var coords = {
            top: linkCoords.top + window.scrollY,
            left: linkCoords.left + window.scrollX,
            width: linkCoords.width,
            height: linkCoords.height
        };
        this.highlightSpan.style.width = coords.width + "px";
        this.highlightSpan.style.height = coords.height + "px";
        this.highlightSpan.style.transform = "translate(" + coords.left + "px, " + coords.top + "px)";
    };
    FollowAlongHighlight.prototype.handleEvent = function (ev) {
        var _this = this;
        this.highlightSpan.classList.add("highlight");
        document.body.append(this.highlightSpan);
        var anchors = document.querySelectorAll("a");
        for (var i = 0; i < anchors.length; i++) {
            anchors.item(i).addEventListener("mouseenter", function (ev) {
                _this.moveHighlightLinkToAnchor(ev.target);
            });
        }
    };
    return FollowAlongHighlight;
}());
document.addEventListener("DOMContentLoaded", new FollowAlongHighlight());
//# sourceMappingURL=followAlongHighlights.js.map