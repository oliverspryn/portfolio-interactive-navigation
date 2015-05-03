/// <reference path="Ring.ts" />
/// <reference path="RingPacket.ts" />
/// <reference path="RingType.ts" />
var Navigation = (function () {
    function Navigation(canvasID) {
        this.Canvas = document.getElementById(canvasID);
        if (!this.Canvas.getContext) {
            return;
        }
        this.Context = this.Canvas.getContext("2d");
    }
    Navigation.prototype.go = function () {
        var packet = new RingPacket();
        packet.ArcStaticRadians = 2.0 * Math.PI;
        packet.ArcVaryingMaxRadians = 2.0 * Math.PI;
        packet.ArcVaryingMinRadians = 2.0 * Math.PI;
        packet.Color = "#FF0000";
        packet.Location.X = 100;
        packet.Location.Y = 100;
        packet.Radius = 20;
        packet.RotationRadPerSec = 1;
        packet.Thickness = 3;
        packet.Type = 1 /* Ring */;
        var ring = new Ring(this.Context, packet);
        ring.draw();
    };
    return Navigation;
})();
//# sourceMappingURL=Navigation.js.map