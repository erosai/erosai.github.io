class Branch{
	constructor(start,v1,v2,v3,parent){
		this.start = start
		this.vectorArr = [
			v1,
			v2,
			v3
		]
		this.end = this.start.copy().add(this.vectorArr[0]).add(this.vectorArr[1]).add(this.vectorArr[2])
		this.parent = parent || null
		this.updateBezierCoor()
	}
	
	updateBezierCoor(){
		this.bezierCoor = [
			this.start.x, this.start.y, this.start.z,
			this.start.x+this.vectorArr[0].x, this.start.y+this.vectorArr[0].y, this.start.z+this.vectorArr[0].z,
			this.start.x+this.vectorArr[0].x+this.vectorArr[1].x, this.start.y+this.vectorArr[0].y+this.vectorArr[1].y, this.start.z+this.vectorArr[0].z+this.vectorArr[1].z,
			this.start.x+this.vectorArr[0].x+this.vectorArr[1].x+this.vectorArr[2].x, this.start.y+this.vectorArr[0].y+this.vectorArr[1].y+this.vectorArr[2].y, this.start.z+this.vectorArr[0].z+this.vectorArr[1].z+this.vectorArr[2].z
		]
	}
	
	draw(){
		// this.vectorArr[2].mult(0.99)
		// this.updateBezierCoor()
		bezier(...this.bezierCoor)
	}
}