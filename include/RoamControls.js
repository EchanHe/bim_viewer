/**
 *	@author Echan
 	use to move around the world as FPS game 


    
 *
 */

THREE.RoamControls = function ( object ) {

    this.movementSpeed = 1.0;
    this.autoSpeedFactor = 0.0;

	var scope = this;
	var PI_2 = Math.PI / 2;
	var d15 = Math.PI /12
	var mouseQuat = {
		x: new THREE.Quaternion(),
		y: new THREE.Quaternion()
	};
	var object = object;
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

           //J,L,I,K 

			case 73:
				orientation.y += d15;
				break;
			case 75: 
				orientation.y -= d15;
				break;
			case 74: 
				orientation.x += d15;								
				break;
			case 76:  
				orientation.x -= d15;
				break;			

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
        if ( moveForward  ) object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
        if ( moveBackward ) object.translateZ( actualMoveSpeed );

        if ( moveLeft ) object.translateX( - actualMoveSpeed );
        if ( moveRight ) object.translateX( actualMoveSpeed );
	}


	this.updateLookAround = function(){
		mouseQuat.x.setFromAxisAngle( xVector, this.orientation.x );
		mouseQuat.y.setFromAxisAngle( yVector, this.orientation.y );
		object.quaternion.copy( mouseQuat.y ).multiply( mouseQuat.x );
	}

};
