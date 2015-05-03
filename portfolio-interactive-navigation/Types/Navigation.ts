/// <reference path="Enums/RingType.ts" />
/// <reference path="Enums/RotationDirection.ts" />
/// <reference path="NavigationConfig.ts" />
/// <reference path="Rings/Ring.ts" />
/// <reference path="Structs/Point.ts" />
/// <reference path="Structs/RingPacket.ts" />
/// <reference path="Structs/Size.ts" />

class Navigation extends NavigationConfig {
	private Canvas: HTMLCanvasElement;
	private Context: CanvasRenderingContext2D;
	private FrameTime: number;
	private Rings: Ring[];

	constructor(canvasID: string, count: number = 50, fps: number = 30) {
		super();
		this.Canvas = <HTMLCanvasElement>document.getElementById(canvasID);
		this.Canvas.height = window.innerHeight;
		this.Canvas.width = window.innerWidth;

		if(!this.Canvas.getContext) {
			return;
		}

		this.Context = this.Canvas.getContext("2d");
		this.FrameTime = 1000.0 / fps;
		this.Rings = new Array<Ring>(count);

		this.Canvas.addEventListener("mousedown", (e: MouseEvent) => {
			var target: HTMLCanvasElement = <HTMLCanvasElement>e.target;
			var mouse: Point = new Point(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
			var dist: Point = null;
			var selected: number = -1;

			for (var i: number = this.Rings.length - 1; i >= 0; --i) {
				dist = new Point(
					Math.abs((this.Rings[i].Location.X * this.Canvas.width) - mouse.X),
					Math.abs((this.Rings[i].Location.Y * this.Canvas.height) - mouse.Y)
				);

				if ((dist.X * dist.X) + (dist.Y * dist.Y) < (this.Rings[i].Radius * this.Rings[i].Radius)) {
					var diff: Point = new Point(
						(this.Rings[i].Location.X * this.Canvas.width) - mouse.X,
						(this.Rings[i].Location.Y * this.Canvas.height) - mouse.Y
					);
					mouse = new Point(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);
					selected = i;

					function moveHandler(ref: Navigation, sel: number) {
						return function(e: MouseEvent) {
							mouse = new Point(e.pageX - target.offsetLeft, e.pageY - target.offsetTop);

							ref.Rings[selected].Location.X = ((mouse.X + diff.X) / ref.Canvas.width);
							ref.Rings[selected].Location.Y = ((mouse.Y + diff.Y) / ref.Canvas.height);
						};
					}

					function upHandler(ref: Navigation, reg: EventListener) {
						return function() {
							selected = -1;
							ref.Canvas.removeEventListener("mousemove", reg);
						};
					}

					var mover = moveHandler(this, selected);
					this.Canvas.addEventListener("mousemove", mover);
					this.Canvas.addEventListener("mouseup", upHandler(this, mover));

					break;
				}
			}
		});

		function resizeHandler(ref: Navigation) {
			return function(e: UIEvent) {
				var win:Window = <Window>e.target;

				ref.Canvas.height = win.innerHeight;
				ref.Canvas.width = win.innerWidth;
			};
		}

		window.addEventListener("resize", resizeHandler(this));
	}

	public go(): void {
	// generate the rings
		var animated: number = 0;
		var rand: number = 0;
		var types: RingType[] = new Array<RingType>();
		types.push(RingType.Arc);
		types.push(RingType.Ring);
		types.push(RingType.VaryingArc);

		for(var i: number = 0; i < this.Rings.length; ++i) {
			rand = (animated >= this.MaxRotating) ? RingType.Ring : Math.floor(Math.random() * types.length);

			switch(rand) {
				case RingType.Arc:
					var arc: Arc = new Arc(this.Context);
					arc.ArcRadians = this.MinArc + Math.round(Math.random() * (this.MaxArc - this.MinArc));
					arc.Color = this.Colors[Math.round(Math.random() * this.Colors.length - 1)];
					arc.Location = new Point(Math.random(), Math.random());
					arc.Radius = this.MinRadius + Math.round(Math.random() * (this.MaxRadius - this.MinRadius));
					arc.RotationDirection = (Math.round(Math.random()) === 1) ? RotationDirection.Clockwise : RotationDirection.CounterClockwise;
					arc.RotationRadPerFrame = this.MinSpeed + Math.round(Math.random() * (this.MaxSpeed - this.MinSpeed));
					arc.Thickness = this.Thickness;

					this.Rings[i] = arc;
					++animated;
					break;

				case RingType.Ring:
					var ring: Ring = new Ring(this.Context);
					ring.Color = this.Colors[Math.round(Math.random() * this.Colors.length - 1)];
					ring.Location = new Point(Math.random(), Math.random());
					ring.Radius = this.MinRadius + Math.round(Math.random() * (this.MaxRadius - this.MinRadius));
					ring.Thickness = this.Thickness;

					this.Rings[i] = ring;
					break;

				case RingType.VaryingArc:
					var varc: VaryingArc = new VaryingArc(this.Context);
					varc.ArcMaxRadians = this.MinArc + (Math.random() * (this.MaxArc - this.MinArc));
					varc.ArcMinRadians = this.MinArc;
					varc.Color = this.Colors[Math.round(Math.random() * this.Colors.length - 1)];
					varc.Location = new Point(Math.random(), Math.random());
					varc.Radius = this.MinRadius + Math.round(Math.random() * (this.MaxRadius - this.MinRadius));
					varc.RotationDirection = (Math.round(Math.random()) === 1) ? RotationDirection.Clockwise : RotationDirection.CounterClockwise;
					varc.RotationRadPerFrame = this.MinSpeed + Math.round(Math.random() * (this.MaxSpeed - this.MinSpeed));
					varc.Thickness = this.Thickness;

					this.Rings[i] = varc;
					++animated;
					break;
			}
		}

	// pump the frames
		var handler = function(n: Navigation) {
			n.Context.clearRect(0, 0, n.Canvas.width, n.Canvas.height);

			for (var i: number = 0; i < n.Rings.length; ++i) {
				n.Rings[i].tick();
			}
		};

		setInterval(handler, this.FrameTime, this);
	}
}