var RingType;
(function (RingType) {
    RingType[RingType["Arc"] = 0] = "Arc";
    RingType[RingType["Ring"] = 1] = "Ring";
    RingType[RingType["VaryingArc"] = 2] = "VaryingArc";
})(RingType || (RingType = {}));
var RotationDirection;
(function (RotationDirection) {
    RotationDirection[RotationDirection["Clockwise"] = 0] = "Clockwise";
    RotationDirection[RotationDirection["CounterClockwise"] = 1] = "CounterClockwise";
})(RotationDirection || (RotationDirection = {}));
var NavigationConfig = (function () {
    function NavigationConfig() {
        this.MaxArc = (7.0 / 4.0) * Math.PI;
        this.MaxRadius = 70;
        this.MaxRotating = 10;
        this.MaxSpeed = 10 * (Math.PI / 180.0);
        this.MinArc = (2.0 / 4.0) * Math.PI;
        this.MinRadius = 30;
        this.MinSpeed = 1 * (Math.PI / 180.0);
        this.Thickness = 5;
        this.Colors = new Array();
        this.Colors.push("#36FFD1");
        this.Colors.push("#58C58E");
        this.Colors.push("#55C8FF");
        this.Colors.push("#00D2FF");
        this.Colors.push("#0CE3F7");
        this.Colors.push("#14B9D6");
        this.Colors.push("#BA9E76");
        this.Colors.push("#48E0A4");
        this.Colors.push("#67A8DA");
        this.Colors.push("#F0712B");
        this.Colors.push("#FFB233");
        this.Colors.push("#9E7FB9");
        this.Colors.push("#F26767");
        this.Colors.push("#ECB71A");
    }
    return NavigationConfig;
})();
var Point = (function () {
    function Point(x, y) {
        this.X = x;
        this.Y = y;
    }
    return Point;
})();
var RingPacket = (function () {
    function RingPacket() {
    }
    return RingPacket;
})();
var RingBase = (function () {
    function RingBase(context) {
        this.Alpha = 0.0;
        this.AlphaTransitionRate = 0.0;
        this.RadEnd = 0;
        this.RadStart = 0;
        this.AlphaTransitionRate = 0.005 + (Math.random() * 0.01);
        this.Config = new RingPacket();
        this.Context = context;
        this.RadStart = 0.0;
        this.RadEnd = 2.0 * Math.PI;
    }
    Object.defineProperty(RingBase.prototype, "Color", {
        set: function (c) {
            this.Config.Color = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RingBase.prototype, "Location", {
        get: function () {
            return this.Config.Location;
        },
        set: function (l) {
            this.Config.Location = l;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RingBase.prototype, "Radius", {
        get: function () {
            return this.Config.Radius;
        },
        set: function (r) {
            this.Config.Radius = r;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RingBase.prototype, "Thickness", {
        set: function (t) {
            this.Config.Thickness = t;
        },
        enumerable: true,
        configurable: true
    });
    RingBase.prototype.draw = function () {
        if (this.Alpha < 1) {
            this.Alpha += this.AlphaTransitionRate;
            this.Context.globalAlpha = this.Alpha;
        }
        var loc = new Point(this.Config.Location.X * window.innerWidth, this.Config.Location.Y * window.innerHeight);
        this.Context.beginPath();
        this.Context.arc(loc.X, loc.Y, this.Config.Radius, this.RadStart, this.RadEnd, false);
        this.Context.lineWidth = this.Config.Thickness;
        this.Context.strokeStyle = this.Config.Color;
        this.Context.stroke();
        this.Context.globalAlpha = 1.0;
    };
    RingBase.prototype.tick = function () {
        throw new Error("tick() not implemented");
    };
    return RingBase;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Ring = (function (_super) {
    __extends(Ring, _super);
    function Ring(context) {
        _super.call(this, context);
        this.Config.Type = 1 /* Ring */;
    }
    Ring.prototype.tick = function () {
        this.draw();
    };
    return Ring;
})(RingBase);
var Size = (function () {
    function Size() {
    }
    return Size;
})();
var Navigation = (function (_super) {
    __extends(Navigation, _super);
    function Navigation(canvasID, count, fps) {
        var _this = this;
        if (count === void 0) { count = 50; }
        if (fps === void 0) { fps = 30; }
        _super.call(this);
        this.Canvas = document.getElementById(canvasID);
        this.Canvas.height = window.innerHeight;
        this.Canvas.width = window.innerWidth;
        if (!this.Canvas.getContext) {
            return;
        }
        this.Context = this.Canvas.getContext("2d");
        this.FrameTime = 1000.0 / fps;
        this.Rings = new Array(count);
        this.Canvas.addEventListener("mousedown", function (e) {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var mouse = new Point(e.pageX, e.pageY - scrollTop);
            var dist = null;
            var selected = -1;
            for (var i = _this.Rings.length - 1; i >= 0; --i) {
                dist = new Point(Math.abs((_this.Rings[i].Location.X * _this.Canvas.width) - mouse.X), Math.abs((_this.Rings[i].Location.Y * _this.Canvas.height) - mouse.Y));
                if ((dist.X * dist.X) + (dist.Y * dist.Y) < (_this.Rings[i].Radius * _this.Rings[i].Radius)) {
                    var diff = new Point((_this.Rings[i].Location.X * _this.Canvas.width) - mouse.X, (_this.Rings[i].Location.Y * _this.Canvas.height) - mouse.Y);
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                    mouse = new Point(e.pageX, e.pageY - scrollTop);
                    selected = i;
                    function moveHandler(ref, sel) {
                        return function (e) {
                            mouse = new Point(e.pageX, e.pageY - scrollTop);
                            ref.Rings[selected].Location.X = ((mouse.X + diff.X) / ref.Canvas.width);
                            ref.Rings[selected].Location.Y = ((mouse.Y + diff.Y) / ref.Canvas.height);
                        };
                    }
                    function upHandler(ref, reg) {
                        return function () {
                            selected = -1;
                            ref.Canvas.removeEventListener("mousemove", reg);
                        };
                    }
                    var mover = moveHandler(_this, selected);
                    _this.Canvas.addEventListener("mousemove", mover);
                    _this.Canvas.addEventListener("mouseup", upHandler(_this, mover));
                    break;
                }
            }
        });
        function resizeHandler(ref) {
            return function (e) {
                var win = e.target;
                ref.Canvas.height = win.innerHeight;
                ref.Canvas.width = win.innerWidth;
            };
        }
        window.addEventListener("resize", resizeHandler(this));
    }
    Navigation.prototype.go = function () {
        var animated = 0;
        var rand = 0;
        var types = new Array();
        types.push(0 /* Arc */);
        types.push(1 /* Ring */);
        types.push(2 /* VaryingArc */);
        for (var i = 0; i < this.Rings.length; ++i) {
            rand = (animated >= this.MaxRotating) ? 1 /* Ring */ : Math.floor(Math.random() * types.length);
            switch (rand) {
                case 0 /* Arc */:
                    var arc = new Arc(this.Context);
                    arc.ArcRadians = this.MinArc + Math.round(Math.random() * (this.MaxArc - this.MinArc));
                    arc.Color = this.Colors[Math.round(Math.random() * this.Colors.length - 1)];
                    arc.Location = new Point(Math.random(), Math.random());
                    arc.Radius = this.MinRadius + Math.round(Math.random() * (this.MaxRadius - this.MinRadius));
                    arc.RotationDirection = (Math.round(Math.random()) === 1) ? 0 /* Clockwise */ : 1 /* CounterClockwise */;
                    arc.RotationRadPerFrame = this.MinSpeed + Math.round(Math.random() * (this.MaxSpeed - this.MinSpeed));
                    arc.Thickness = this.Thickness;
                    this.Rings[i] = arc;
                    ++animated;
                    break;
                case 1 /* Ring */:
                    var ring = new Ring(this.Context);
                    ring.Color = this.Colors[Math.round(Math.random() * this.Colors.length - 1)];
                    ring.Location = new Point(Math.random(), Math.random());
                    ring.Radius = this.MinRadius + Math.round(Math.random() * (this.MaxRadius - this.MinRadius));
                    ring.Thickness = this.Thickness;
                    this.Rings[i] = ring;
                    break;
                case 2 /* VaryingArc */:
                    var varc = new VaryingArc(this.Context);
                    varc.ArcMaxRadians = this.MinArc + (Math.random() * (this.MaxArc - this.MinArc));
                    varc.ArcMinRadians = this.MinArc;
                    varc.Color = this.Colors[Math.round(Math.random() * this.Colors.length - 1)];
                    varc.Location = new Point(Math.random(), Math.random());
                    varc.Radius = this.MinRadius + Math.round(Math.random() * (this.MaxRadius - this.MinRadius));
                    varc.RotationDirection = (Math.round(Math.random()) === 1) ? 0 /* Clockwise */ : 1 /* CounterClockwise */;
                    varc.RotationRadPerFrame = this.MinSpeed + Math.round(Math.random() * (this.MaxSpeed - this.MinSpeed));
                    varc.Thickness = this.Thickness;
                    this.Rings[i] = varc;
                    ++animated;
                    break;
            }
        }
        var handler = function (n) {
            n.Context.clearRect(0, 0, n.Canvas.width, n.Canvas.height);
            for (var i = 0; i < n.Rings.length; ++i) {
                n.Rings[i].tick();
            }
        };
        setInterval(handler, this.FrameTime, this);
    };
    return Navigation;
})(NavigationConfig);
window.onload = function () {
    var pixels = window.innerHeight * window.innerWidth;
    var pixelsPerCircle = 30000;
    var n = new Navigation("navigation", Math.round(pixels / pixelsPerCircle));
    n.go();
};
var VaryingSize;
(function (VaryingSize) {
    VaryingSize[VaryingSize["Expanding"] = 0] = "Expanding";
    VaryingSize[VaryingSize["Shrinking"] = 1] = "Shrinking";
})(VaryingSize || (VaryingSize = {}));
var Arc = (function (_super) {
    __extends(Arc, _super);
    function Arc(context) {
        _super.call(this, context);
        this.Config.Type = 0 /* Arc */;
    }
    Object.defineProperty(Arc.prototype, "ArcRadians", {
        set: function (ar) {
            this.Config.ArcStaticRadians = ar;
            this.RadStart = 0.0;
            this.RadEnd = ar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arc.prototype, "RotationDirection", {
        set: function (rd) {
            this.Config.RotationDirection = rd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arc.prototype, "RotationRadPerFrame", {
        set: function (r) {
            this.Config.RotationRadPerFrame = r;
        },
        enumerable: true,
        configurable: true
    });
    Arc.prototype.tick = function () {
        if (this.Config.RotationDirection === 0 /* Clockwise */) {
            this.RadStart += this.Config.RotationRadPerFrame;
            this.RadEnd += this.Config.RotationRadPerFrame;
        }
        else {
            this.RadStart -= this.Config.RotationRadPerFrame;
            this.RadEnd -= this.Config.RotationRadPerFrame;
        }
        this.RadStart %= (2.0 * Math.PI);
        this.RadEnd %= (2.0 * Math.PI);
        this.draw();
    };
    return Arc;
})(RingBase);
var VaryingArc = (function (_super) {
    __extends(VaryingArc, _super);
    function VaryingArc(context) {
        _super.call(this, context);
        this.Config.ArcVaryingMaxRadians = 0.0;
        this.Config.ArcVaryingMinRadians = 0.0;
        this.Config.Type = 2 /* VaryingArc */;
        this.Radians = 0.0;
        this.Size = (Math.round(Math.random()) === 1) ? 0 /* Expanding */ : 1 /* Shrinking */;
    }
    Object.defineProperty(VaryingArc.prototype, "ArcMaxRadians", {
        set: function (ar) {
            this.Config.ArcVaryingMaxRadians = ar;
            this.RadStart = 0.0;
            this.RadEnd = this.Config.ArcVaryingMinRadians + (Math.abs(this.Config.ArcVaryingMaxRadians - this.Config.ArcVaryingMinRadians) / 2.0);
            this.Radians = this.RadEnd - this.RadStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VaryingArc.prototype, "ArcMinRadians", {
        set: function (ar) {
            this.Config.ArcVaryingMinRadians = ar;
            this.RadStart = 0.0;
            this.RadEnd = this.Config.ArcVaryingMinRadians + (Math.abs(this.Config.ArcVaryingMaxRadians - this.Config.ArcVaryingMinRadians) / 2.0);
            this.Radians = this.RadEnd - this.RadStart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VaryingArc.prototype, "RotationDirection", {
        set: function (rd) {
            this.Config.RotationDirection = rd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VaryingArc.prototype, "RotationRadPerFrame", {
        set: function (r) {
            this.Config.RotationRadPerFrame = r;
        },
        enumerable: true,
        configurable: true
    });
    VaryingArc.prototype.tick = function () {
        if (this.Size === 0 /* Expanding */ && this.Radians > this.Config.ArcVaryingMaxRadians) {
            this.Size = 1 /* Shrinking */;
        }
        else if (this.Size === 1 /* Shrinking */ && this.Radians < this.Config.ArcVaryingMinRadians) {
            this.Size = 0 /* Expanding */;
        }
        if (this.Size === 0 /* Expanding */) {
            if (this.Config.RotationDirection === 0 /* Clockwise */) {
                this.RadEnd += this.Config.RotationRadPerFrame;
            }
            else {
                this.RadStart -= this.Config.RotationRadPerFrame;
            }
            this.Radians += this.Config.RotationRadPerFrame;
        }
        else {
            if (this.Config.RotationDirection === 0 /* Clockwise */) {
                this.RadStart += this.Config.RotationRadPerFrame;
            }
            else {
                this.RadEnd -= this.Config.RotationRadPerFrame;
            }
            this.Radians -= this.Config.RotationRadPerFrame;
        }
        this.draw();
    };
    return VaryingArc;
})(RingBase);
//# sourceMappingURL=app.js.map