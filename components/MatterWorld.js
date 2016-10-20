cc.Class({
	extends: cc.Component,

	properties: {
	},

	// use this for initialization
	onLoad: function ()
	{
		// module aliases
		var Engine = Matter.Engine,
			Render = Matter.Render,
			World = Matter.World,
			Bodies = Matter.Bodies;

		// create an engine
		var engine = Engine.create();

		// run the engine
		Engine.run(engine);

		var mouse = Matter.Mouse.create(document.getElementById("GameCanvas"));

		Matter.Mouse.setOffset(mouse, { x: 45, y: 50 });
		var mouseConstraint = Matter.MouseConstraint.create(engine, {
			mouse: mouse
		});

		Matter.World.add(engine.world, mouseConstraint);

		// module aliases
		Matter.currentEngine = engine;
	}	
});
