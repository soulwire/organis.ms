
function ChaseDemo() {

    var cat;
    var dog;
    var rat;
    var mouse = new Vector();
    var center = new Vector();
    var renderer;

    return Sketch.create({

        container: document.getElementById( 'container' ),
        retina: 'auto',

        setup: function() {

            center.set( this.width / 2, this.height / 2 );
            mouse.set( this.width / 2, this.height / 2 );

            // Create agents

            dog = new Agent({
                maxForce: 0.1,
                maxSpeed: 2.0,
                radius: 25
            });

            cat = new Agent({
                maxForce: 0.2,
                maxSpeed: 3.0,
                radius: 15
            });

            rat = new Agent({
                maxForce: 1.2,
                maxSpeed: 4.0,
                radius: 8
            });

            // Define bounds

            var min = new Vector();
            var max = new Vector( this.width, this.height );

            // Define behaviors

            var bounds = new Bounds({ min: min, max: max, bounce: false });
            var wander = new Wander({ radius: 120, jitter: 0.5, weight: 0.8 });

            var seekCenter = new Seek({ target: center });
            var seekMouse  = new Seek({ target: mouse });

            var fleeDog    = new Flee({ target: dog, weight: 0.6 });
            var fleeCat    = new Flee({ target: cat, weight: 1.0 });
            var huntCat    = new Seek({ target: cat, weight: 0.8 });

            // Apply behaviors

            cat.behaviors.push( bounds, seekMouse, fleeDog );
            dog.behaviors.push( bounds, wander, huntCat );
            rat.behaviors.push( bounds, seekCenter, fleeCat );

            dog.set( 300, 300 );
            cat.set( 600, 300 );
            rat.set( this.width / 2, this.height / 2 );

            // Create a renderer

            renderer = new Renderer();
        },

        update: function() {

            cat.update();
            dog.update();
            rat.update();
        },

        draw: function() {

            renderer.render( cat, this );
            renderer.render( dog, this );
            renderer.render( rat, this );
        },

        resize: function() {

            center.set( this.width / 2, this.height / 2 );
        },

        mousemove: function() {

            mouse.set( this.mouse.x, this.mouse.y );
        }
    });
}
