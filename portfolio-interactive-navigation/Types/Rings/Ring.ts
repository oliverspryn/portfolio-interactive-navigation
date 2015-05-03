/// <reference path="../Enums/RingType.ts" />
/// <reference path="RingBase.ts" />
/// <reference path="../Structs/Point.ts" />
/// <reference path="../Structs/RingPacket.ts" />

class Ring extends RingBase {
	constructor(context: CanvasRenderingContext2D) {
		super(context);
		this.Config.Type = RingType.Ring;
	}

	public tick(): void {
		this.draw();
	}
}