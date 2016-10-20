cc.Class({
    extends: cc.Component,
    properties: {
		target: {
			default: null,
            visible:false
		},
		collider : {
			default: null,
			visible:false
		},
		body : {
			default: null,
			visible:false
		},
		rotationFix :{
			default: false,
			visible:true,
			label:"Rotation Fixed ?"
		},
		position : {
			default: null,
			visible:false
		},
		static : {
			default: false,
			visible:true
		},
		mass : {
			default: 1.53,
			visible:true
		},
		restitution :{
			default: 0,
			visible:true
		}
    },

    // Init RigidBody
    onLoad: function ()
	{
		this.collider = this.node.getComponent(cc.Collider);
		var pos = this.getPosFromScreen();

		var options = {
			angle:this.node.rotation /180 * Math.PI,
			isStatic:this.static,
			mass:this.mass,
			restitution:this.restitution
		}

		if (this.rotationFix) options.inertia = Infinity ;
		
		if (this.collider.points)
		{
			this.body = Matter.Bodies.fromVertices(pos.x, pos.y, this.collider.points, options);
		}
		else if (this.collider.radius)
		{
			this.body = Matter.Bodies.circle(pos.x, pos.y, this.collider.radius, options);
		}
		else
		{
			this.body = Matter.Bodies.rectangle(pos.x, pos.y - this.collider.offset.y, this.collider.size.width, this.collider.size.height, options);
		}

		Matter.World.add(Matter.currentEngine.world, this.body);
    },

	getPosFromScreen()
	{
		return {
			x: this.node.x,
			y: (cc.Canvas.instance.designResolution.height -this.node.y) ,
		}
	},

	setPosition: function(x, y){
		this.node.x = x;
		this.node.y = cc.Canvas.instance.designResolution.height - y;
	},

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		this.setPosition(this.body.position.x, this.body.position.y);
		this.node.rotation = this.body.angle * 180/ Math.PI;
    }
});
