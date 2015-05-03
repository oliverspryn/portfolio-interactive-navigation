class NavigationConfig {
	protected Colors: string[];
	protected MaxArc: number = (7.0 / 4.0) * Math.PI;
	protected MaxRadius: number = 70;
	protected MaxRotating: number = 10;
	protected MaxSpeed: number = 10 * (Math.PI / 180.0);
	protected MinArc: number = (2.0 / 4.0) * Math.PI;
	protected MinRadius: number = 30;
	protected MinSpeed: number = 1 * (Math.PI / 180.0);
	protected Thickness: number = 5;

	constructor() {
		this.Colors = new Array<string>();
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
}