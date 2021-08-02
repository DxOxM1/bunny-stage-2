class Link{
    constructor(bodyA,bodyB)
    {
      //collecting the last rectangle
      var lastlink = bodyA.body.bodies.length-2;
     this.link = Constraint.create(
        {
          bodyA:bodyA.body.bodies[lastlink],
          pointA:{x:0,y:0},
          bodyB:bodyB,
          pointB:{x:0,y:0},
          length:-20,
          stiffness:0.02
        });
        World.add(engine.world,this.link);
    } 
    breakFruit(){
      World.remove(engine.world,this.link);

    }
    

}