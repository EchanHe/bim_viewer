
THREE.RaycastHelper = function(rays , scene){
	this.rays = rays
	this.scene  = scene
	var material
	for (i in this.rays){
		switch(i){
			case "0":
				material = new THREE.LineBasicMaterial({color: 0xff0000});
				break
			case "1":
				material = new THREE.LineBasicMaterial({color: 0x00ff00});
				break
			case "2":
				material = new THREE.LineBasicMaterial({color: 0x0000ff});
				break
			default:
				material = new THREE.LineBasicMaterial({color: 0xff00ff});
		}
		origin = rays[i].ray.origin
		direct = rays[i].ray.direction
		length = rays[i].far - rays[i].near
		thetaX = Math.acos(direct.x/1)
		thetaY = Math.acos(direct.y/1)
		thetaZ = Math.acos(direct.z/1)
		end = new THREE.Vector3(origin.x+length*(direct.x/1) 
			,origin.y+length*(direct.y/1)
			, origin.z+length*(direct.z/1) )
		var geometry = new THREE.Geometry();
		geometry.vertices.push(origin , end);
		var line = new THREE.Line( geometry, material );
		this.scene.add( line );
	}

}

THREE.RaycastHelper.update =function(){

}
