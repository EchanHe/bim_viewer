/**
 *	@author Echan
 	use to move around the world as FPS game 


    
 *
 */

THREE.RoamControls = function ( object  ) {

	// physic switchs variables
	this.physic = false
	this.gravity = true
	this.FBLR = true
	this.tcl = false

	//var HEIGHT=16
	var WIDTH=10
	var LENGTH=10

	var rayDown , rayDown1

	// raycaster for: front back right left
	var rayUpperF , rayUpperF2 , rayLowerF
	var rayLowerB , rayUpperB , rayUpperB2
	var rayLeft 
	var rayRight , rayRight2
	var fall
	var fowardCD, backwardCD , rightCD, leftCD




    this.movementSpeed = 1.0;
    this.autoSpeedFactor = 0.0;



	var scope = this;
	var PI_2 = Math.PI / 2;
	var d15 = Math.PI /12
	var d5 = Math.PI /36
	var mouseQuat = {
		x: new THREE.Quaternion(),
		y: new THREE.Quaternion()
	};
	var object = object;
	// var role = role
	var xVector = new THREE.Vector3( 1, 0, 0 );
	var yVector = new THREE.Vector3( 0, 1, 0 );


	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
    var run = false
    var lookAround=false

	this.enabled = true;

	this.orientation = {
		x: 0,
		y: 0,
	};

    //remember the quaterion after changing camera

    this.orientation.x = new THREE.Euler().setFromQuaternion(object.quaternion,"YXZ").x
    this.orientation.y = new THREE.Euler().setFromQuaternion(object.quaternion , "YXZ").y

    this.setOrientation = function (){



    	// this.orientation.x =object.rotation.x// new THREE.Euler().setFromQuaternion(object.quaternion).x
    	// this.orientation.y =object.rotation.y // new THREE.Euler().setFromQu

    	// if (this.orientation.x < -Math.PI/4)
    	// 	this.orientation.x += Math.PI

    	this.orientation.x = new THREE.Euler().setFromQuaternion(object.quaternion,"YXZ").x
    	this.orientation.y = new THREE.Euler().setFromQuaternion(object.quaternion , "YXZ").y
    }

    var onMouseDown = function ( event ) {

        event.preventDefault();
        event.stopPropagation();


        switch ( event.button ) {

            // case 0: this.moveForward = true; break;
             case 1: lookAround= true; break;

        }
    };

    var onMouseUp = function ( event ) {

        event.preventDefault();
        event.stopPropagation();
        

        
        switch ( event.button ) {
        
         // case 0: this.moveForward = false; break;
          case 1: lookAround = false; break;
        
        }
        

        

    };

	var onMouseMove = function ( event ) {

		if ( scope.enabled === false || lookAround ===false ) return;

		var orientation = scope.orientation;

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		orientation.y -= movementX * 0.0025;
		orientation.x -= movementY * 0.0025;

		orientation.x = Math.max( - PI_2, Math.min( PI_2, orientation.x ) );

	};



	var onKeyDown = function ( event ) {

		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ moveForward = true; break;

			case 37: /*left*/
			case 65: /*A*/ moveLeft = true; break;

			case 40: /*down*/
			case 83: /*S*/ moveBackward = true; break;

			case 39: /*right*/
			case 68: /*D*/ moveRight = true; break;

			case 82: /*R*/ moveUp = true; break;
			case 70: /*F*/ moveDown = true; break;

            case 16: /*Shift*/  run = true ; break;



		}

	};

	var onKeyUp = function ( event ) {

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ moveForward = false; break;

			case 37: /*left*/
			case 65: /*A*/ moveLeft = false; break;

			case 40: /*down*/
			case 83: /*S*/ moveBackward = false; break;

			case 39: /*right*/
			case 68: /*D*/ moveRight = false; break;

			case 82: /*R*/ moveUp = false; break;
			case 70: /*F*/ moveDown = false; break;
            case 16: /*Shift*/  run = false ; break;

		}

	};


	this.update = function() {

		if ( this.enabled === false ) return;

        this.updateMove()
        if (lookAround ===true)
            this.updateLookAround()
    


		// object.rotation.x-=this.orientation.x*0.001
		// object.rotation.y-=this.orientation.y*0.001
		return;

	};

	this.dispose = function() {

		document.removeEventListener( 'mousemove', onMouseMove, false );
	    document.removeEventListener( 'keydown', onKeyDown, false );
	    document.removeEventListener( 'keyup', onKeyUp, false );
        document.removeEventListener( 'mousedown', onMouseDown, false );
        document.removeEventListener( 'mouseup', onMouseUp, false );

	}

	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	document.addEventListener( 'mousedown', onMouseDown, false );
	document.addEventListener( 'mouseup', onMouseUp, false );

	this.updateMove = function (){
        if (run ===true)
            delta = 3
        else
            delta = 1

        var actualMoveSpeed = delta * this.movementSpeed;
		var displacement = new THREE.Vector3(0,0,0);
		var eulerY = new THREE.Euler().setFromQuaternion(object.quaternion,'YXZ').y
		dY = 0

        //****************collision and physics calculation***************
		if (this.physic ==true){
			// checking physics and movement
			
			// Creating the rays for collision detection.


			//facing direction
			var direction = new THREE.Vector3().copy(camera.getWorldDirection()).normalize();
			var righDir = new THREE.Vector3(-direction.z , direction.y , direction.x)

			rayDown = new THREE.Raycaster(camera.position , new THREE.Vector3(0,-1,0),0,HEIGHT)


			//front
			var frontOrigin= new THREE.Vector3(camera.position.x+(LENGTH/2)*(direction.x/1) 
				,camera.position.y -HEIGHT/2
				, camera.position.z+(LENGTH/2)*(direction.z/1) )
			var frontUpperOrigin= new THREE.Vector3(camera.position.x+(LENGTH/2)*(direction.x/1) 
				,camera.position.y -HEIGHT/2
				, camera.position.z+(LENGTH/2)*(direction.z/1) )

			rayLowerF = new THREE.Raycaster(frontOrigin , new THREE.Vector3(0,-1,0), 0, HEIGHT/2-2)
			rayUpperF = new THREE.Raycaster(frontOrigin , new THREE.Vector3((direction.x/1)*Math.sin(d15),Math.cos(d15),(direction.z/1)*Math.sin(d15)), 0, HEIGHT/2)
			rayUpperF2 = new THREE.Raycaster(frontOrigin , new THREE.Vector3(0,1,0), 0, HEIGHT/2)


			//upper
			var backOrigin= new THREE.Vector3(camera.position.x-(LENGTH/2)*(direction.x/1) 
				,camera.position.y -HEIGHT/2
				, camera.position.z-(LENGTH/2)*(direction.z/1) )
			rayLowerB = new THREE.Raycaster(backOrigin , new THREE.Vector3(0,-1,0), 0, HEIGHT/2-2)
			rayUpperB = new THREE.Raycaster(backOrigin , new THREE.Vector3((-direction.x/1)*Math.sin(d15),Math.cos(d15),(-direction.z/1)*Math.sin(d15)), 0, HEIGHT/2)
			rayUpperB2 = new THREE.Raycaster(backOrigin , new THREE.Vector3(0,1,0), 0, HEIGHT/2)


			//Right
			

			var rightOrigin= new THREE.Vector3(camera.position.x + (LENGTH/2)*(righDir.x/1) 
				,camera.position.y - HEIGHT/2
				, camera.position.z + (LENGTH/2)*(righDir.z/1) )
			rayRight = new THREE.Raycaster(rightOrigin , new THREE.Vector3(0,1,0), 0, HEIGHT/2-2)
			rayRight2 = new THREE.Raycaster(rightOrigin , new THREE.Vector3((righDir.x/1)*Math.sin(d15),Math.cos(d15),(righDir.z/1)*Math.sin(d15)), 0, HEIGHT/2)
			
			//Left
			var leftOrigin= new THREE.Vector3(camera.position.x - (LENGTH/2)*(righDir.x/1) 
				,camera.position.y - HEIGHT/2
				, camera.position.z - (LENGTH/2)*(righDir.z/1) )
			rayLeft = new THREE.Raycaster(leftOrigin , new THREE.Vector3(0,1,0), 0, HEIGHT/2-2)
			rayLeft2 = new THREE.Raycaster(leftOrigin , new THREE.Vector3((-righDir.x/1)*Math.sin(d5),Math.cos(d5),(-righDir.z/1)*Math.sin(d15)), 0, HEIGHT/2)	

			


			var interLF = rayLowerF.intersectObjects( rootNode.children , true );
			var interUF = rayUpperF.intersectObjects( rootNode.children , true );
			var interUF2 = rayUpperF2.intersectObjects( rootNode.children , true );

			var interLB = rayLowerB.intersectObjects( rootNode.children , true );
			var interUB = rayUpperB.intersectObjects( rootNode.children , true );
			var interUB2 = rayUpperB2.intersectObjects( rootNode.children , true );

			var interR = rayRight.intersectObjects( rootNode.children , true );
			var interR2 = rayRight2.intersectObjects( rootNode.children , true );

			var interL = rayLeft.intersectObjects( rootNode.children , true );
		 	var interL2 = rayLeft2.intersectObjects( rootNode.children , true );

			var interGround = rayDown.intersectObjects( rootNode.children , true );


			// if(interF.length>0){
			// 	var height = camera.position.y - interF[0].point.y
			// 	if (height>2)
			// 		fowardCD=false
			// 	else{
			// 		dY+=5
			// 		fowardCD=true
			// 	}
			// }


			if (this.gravity ==true){
				if(interGround.length>0){
					// if (object.position.y - interGround[0].point.y>5)
					// 	object.translateY( - ( actualMoveSpeed ) );
					console.log(camera.position.y - interGround[0].point.y)
					console.log("down is detect")
				}
				if(interGround.length<=0)
					object.translateY( - ( actualMoveSpeed ) );
			}



			if (this.FBLR ==true){
				//*****check the collision on Front(upper body and lower body)

				if(interLF.length>0){
					diff = interLF[0].point.y - (camera.position.y -HEIGHT)
					if(diff>0){
						dY += diff
						console.log(diff)
					}
				}
				if(interUF.length>0 || interUF2.length>0){
					// rayhelper = new THREE.RaycastHelper([rayUpperF2,rayUpperF],scene)
					fowardCD=true
				}else{
					fowardCD=false
				}	

				//*****check the collision on Back(upper body and lower body)
				if(interLB.length>0){
					diff = interLB[0].point.y - (camera.position.y -HEIGHT)
					if(diff>0){
						dY += diff
						console.log(diff)
					}
				}
				if(interUB.length>0 || interUB2.length>0){
					// rayhelper = new THREE.RaycastHelper([rayUpperB , rayUpperB2],scene)
					backwardCD=true
				}else{
					backwardCD=false
				}	

				//******check the collision on Right
				if(interR.length>0 || interR2.length>0){
					// rayhelper = new THREE.RaycastHelper([rayRight , rayRight2],scene)
					rightCD=true
				}else{
					rightCD=false
				}				

				//******check the collision on Left
				if(interL.length>0 || interL2.length>0){
					// rayhelper = new THREE.RaycastHelper([rayLeft , rayLeft2],scene)
					leftCD=true
				}else{
					leftCD=false
				}		

			}

		}
		else{
			fowardCD=false
			backwardCD=false
			rightCD=false
			leftCD=false
		}

		
		if (this.physic ===false){
			if ( moveForward  ) object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
        	if ( moveBackward ) object.translateZ( actualMoveSpeed );

        	if ( moveLeft ) object.translateX( - actualMoveSpeed );
        	if ( moveRight ) object.translateX( actualMoveSpeed );
		}
		else{
	        if ( moveForward && !fowardCD  )
	        	displacement.set(-actualMoveSpeed*Math.sin( eulerY ),dY,-  actualMoveSpeed*Math.cos( eulerY ))   
			if ( moveBackward && !backwardCD) 
				displacement.set(actualMoveSpeed*Math.sin( eulerY ),dY,actualMoveSpeed*Math.cos( eulerY ))
	        if ( moveLeft && !leftCD )
	        	displacement.set(-  actualMoveSpeed*Math.cos( eulerY ) , dY ,actualMoveSpeed*Math.sin( eulerY ))
	        if ( moveRight && !rightCD )
	        	displacement.set(  actualMoveSpeed*Math.cos( eulerY ) , dY ,-actualMoveSpeed*Math.sin( eulerY ))
    	}
		
        object.position.add(displacement)

        //****************End collision and physics calculation***************

	}


	this.updateLookAround = function(){
		//this.setOrientation()

		var x = Math.max( - PI_2, Math.min( PI_2, this.orientation.x ) );
		var y = Math.max( - PI_2, Math.min( PI_2, this.orientation.y ) );

		var euler = new THREE.Euler( 0, 0, 0, 'YXZ' );
		euler.x = this.orientation.x 
		euler.y = this.orientation.y 
		mouseQuat.x.setFromAxisAngle( xVector, this.orientation.x );
		mouseQuat.y.setFromAxisAngle( yVector, this.orientation.y );
		// object.rotation.x+=this.orientation.x*0.05
		// object.rotation.y+=this.orientation.y*0.05


		// cobj= object.clone()
		camera.quaternion.setFromEuler( euler );
		// object.quaternion.copy( mouseQuat.y ).multiply( mouseQuat.x );

// object.quaternion.copy( mouseQuat.x ).multiply( mouseQuat.y );
		// mouseQuat.x.setFromAxisAngle( xVector, x );
		// mouseQuat.y.setFromAxisAngle( yVector, y );
		// cobj.quaternion.copy( mouseQuat.y ).multiply( mouseQuat.x );



		// if (cobj.rotation.x!=object.rotation.x || cobj.rotation.y!=object.rotation.y)
		// console.log(cobj.rotation)
		// console.log(object.rotation)

		// object.quaternion.copy( mouseQuat.y ).multiply( mouseQuat.x );
		// console.log(object.rotation)
	}





};


THREE.RoamControls.setPhysic  = function (flag){
	this.physic = flag
}

THREE.RoamControls.getPhysic  = function (){
	return this.physic
}