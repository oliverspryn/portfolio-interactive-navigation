/// <reference path="../Enums/RingType.ts" />
/// <reference path="../Enums/RotationDirection.ts" />
/// <reference path="RingBase.ts" />
/// <reference path="../Structs/Point.ts" />
/// <reference path="../Structs/RingPacket.ts" />

class Arc extends RingBase {
	constructor(context: CanvasRenderingContext2D) {
		super(context);
		this.Config.Type = RingType.Arc;
	}

// setters
	public set ArcRadians(ar: number) {
		this.Config.ArcStaticRadians = ar;
		this.RadStart = 0.0;
		this.RadEnd = ar;
	}

	public set RotationDirection(rd: RotationDirection) {
		this.Config.RotationDirection = rd;
	}

	public set RotationRadPerFrame(r: number) {
		this.Config.RotationRadPerFrame = r;
	}

// methods
	public tick(): void {
		if(this.Config.RotationDirection === RotationDirection.Clockwise) {
			this.RadStart += this.Config.RotationRadPerFrame;
			this.RadEnd += this.Config.RotationRadPerFrame;
		} else {
			this.RadStart -= this.Config.RotationRadPerFrame;
			this.RadEnd -= this.Config.RotationRadPerFrame;
		}

		this.RadStart %= (2.0 * Math.PI);
		this.RadEnd %= (2.0 * Math.PI);

		this.draw();
	}
}