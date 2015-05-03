/// <reference path="../Enums/RingType.ts" />
/// <reference path="../Enums/RotationDirection.ts" />
/// <reference path="../Structs/Point.ts" />

class RingPacket {
	ArcStaticRadians: number;
	ArcVaryingMaxRadians: number;
	ArcVaryingMinRadians: number;
	Color: string;
	Location: Point;
	Radius: number;
	RotationDirection: RotationDirection;
	RotationRadPerFrame: number;
	Thickness: number;
	Type: RingType;
}