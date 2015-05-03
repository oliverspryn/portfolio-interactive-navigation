/// <reference path="RingPacket.ts" />
var Ring = (function () {
    function Ring(context, packet) {
        this.Config = packet;
        this.Context = context;
    }
    Ring.prototype.draw = function () {
        this.Context.beginPath();
        this.Context.arc(this.Config.Location.X, this.Config.Location.Y, this.Config.Radius, 0, 2.0 * Math.PI, false);
        this.Context.closePath();
        this.Context.lineWidth = this.Config.Radius;
        this.Context.strokeStyle = this.Config.Color;
        this.Context.stroke();
    };
    return Ring;
})();
//# sourceMappingURL=Ring.js.map