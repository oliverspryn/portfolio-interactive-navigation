/// <reference path="../Structs/Point.ts" />
/// <reference path="../Structs/RingPacket.ts" />

class RingBase {
	protected Alpha: number = 0.0;
	protected AlphaTransitionRate: number = 0.0;
	protected Config: RingPacket;
	protected Context: CanvasRenderingContext2D;
	protected LocationPX: Point;
	protected RadEnd: number = 0;
	protected RadStart: number = 0;

// constructor
	constructor(context: CanvasRenderingContext2D) {
		this.AlphaTransitionRate = 0.005 + (Math.random() * 0.01);
		this.Config = new RingPacket();
		this.Context = context;
		this.RadStart = 0.0;
		this.RadEnd = 2.0 * Math.PI;
	}

// shared setters
	public set Color(c: string) {
		this.Config.Color = c;
	}

	public get Location(): Point {
		return this.Config.Location;
	}

	public set Location(l: Point) {
		this.Config.Location = l;
	}

	public get Radius(): number {
		return this.Config.Radius;
	}

	public set Radius(r: number) {
		this.Config.Radius = r;
	}

	public set Thickness(t: number) {
		this.Config.Thickness = t;
	}

// methods
	protected draw(): void {
		if(this.Alpha < 1) {
			this.Alpha += this.AlphaTransitionRate;
			this.Context.globalAlpha = this.Alpha;
		}

		var loc: Point = new Point(this.Config.Location.X * window.innerWidth, this.Config.Location.Y * window.innerHeight);
		this.Context.beginPath();
		this.Context.arc(loc.X, loc.Y, this.Config.Radius, this.RadStart, this.RadEnd, false);
		this.Context.lineWidth = this.Config.Thickness;
		this.Context.strokeStyle = this.Config.Color;
		this.Context.stroke();

		this.Context.globalAlpha = 1.0;
	}

	public tick(): void {
		throw new Error("tick() not implemented");
	}
}