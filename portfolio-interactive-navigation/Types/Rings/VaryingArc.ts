/// <reference path="../Enums/RingType.ts" />
/// <reference path="../Enums/VaryingSize.ts" />
/// <reference path="../Enums/RotationDirection.ts" />
/// <reference path="RingBase.ts" />
/// <reference path="../Structs/Point.ts" />
/// <reference path="../Structs/RingPacket.ts" />

class VaryingArc extends RingBase {
	private Radians: number;
	private Size: VaryingSize;

// constructor
	constructor(context: CanvasRenderingContext2D) {
		super(context);
		this.Config.ArcVaryingMaxRadians = 0.0;
		this.Config.ArcVaryingMinRadians = 0.0;
		this.Config.Type = RingType.VaryingArc;
		this.Radians = 0.0;
		this.Size = (Math.round(Math.random()) === 1) ? VaryingSize.Expanding : VaryingSize.Shrinking;
	}

// setters
	public set ArcMaxRadians(ar: number) {
		this.Config.ArcVaryingMaxRadians = ar;
		this.RadStart = 0.0;
		this.RadEnd = this.Config.ArcVaryingMinRadians + (Math.abs(this.Config.ArcVaryingMaxRadians - this.Config.ArcVaryingMinRadians) / 2.0);
		this.Radians = this.RadEnd - this.RadStart;
	}

	public set ArcMinRadians(ar: number) {
		this.Config.ArcVaryingMinRadians = ar;
		this.RadStart = 0.0;
		this.RadEnd = this.Config.ArcVaryingMinRadians + (Math.abs(this.Config.ArcVaryingMaxRadians - this.Config.ArcVaryingMinRadians) / 2.0);
		this.Radians = this.RadEnd - this.RadStart;
	}

	public set RotationDirection(rd: RotationDirection) {
		this.Config.RotationDirection = rd;
	}

	public set RotationRadPerFrame(r: number) {
		this.Config.RotationRadPerFrame = r;
	}

// methods
	public tick(): void {
		if (this.Size === VaryingSize.Expanding && this.Radians > this.Config.ArcVaryingMaxRadians) {
			this.Size = VaryingSize.Shrinking;
		} else if (this.Size === VaryingSize.Shrinking && this.Radians < this.Config.ArcVaryingMinRadians) {
			this.Size = VaryingSize.Expanding;
		}

		if (this.Size === VaryingSize.Expanding) {
			if (this.Config.RotationDirection === RotationDirection.Clockwise) {
				this.RadEnd += this.Config.RotationRadPerFrame;
			} else {
				this.RadStart -= this.Config.RotationRadPerFrame;
			}

			this.Radians += this.Config.RotationRadPerFrame;
		} else {
			if (this.Config.RotationDirection === RotationDirection.Clockwise) {
				this.RadStart += this.Config.RotationRadPerFrame;
			} else {
				this.RadEnd -= this.Config.RotationRadPerFrame;
			}

			this.Radians -= this.Config.RotationRadPerFrame;
		}

		this.draw();
	}
} 