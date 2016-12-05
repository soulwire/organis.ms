
function FlockDemo() {

    var NUM_AGENTS = 200;
    var COLOURS = [
        '#FE4365', '#FC9D9A', '#F9CDAD', '#C8C8A9',
        '#83AF9B', '#FF4E50', '#FC913A', '#F9D423',
        '#EDE574', '#E1F5C4', '#B3CC57', '#ECF081',
        '#FFBE40', '#EF746F', '#D0ECEA', '#9FD6D2'
        ];

    var renderer = new Renderer();
    var agents = [];
    var mouse = new Vector();
    var bounds = new Bounds();
    var flee, align, cohere, separate;

    return Sketch.create({

        container: document.getElementById( 'container' ),
        retina: 'auto',

        setup: function() {

            // Set initial mouse position to stage center

            mouse.set( this.width * 0.5, this.height * 0.5 );

            // Define behaviors

            flee = new Flee({
                target: mouse,
                radius: 0,
                weight: 2.0
            });

            align = new Align({
                radius: 100,
                agents: agents,
                weight: 0.5,
                chance: 0.8
            });

            cohere = new Cohere({
                radius: 100,
                agents: agents,
                weight: 0.01,
                chance: 0.5
            });

            separate = new Separate({
                radius: 10,
                agents: agents,
                weight: 2.0,
                chance: 1.0
            });

            // Create agents
            for ( var i = 0; i < NUM_AGENTS; i++ ) {

                wander = new Wander({
                    theta: random( -PI, PI ),
                    jitter: random( 0.05, 0.5 ),
                    radius: random( 10, 60 ),
                    weight: 0.0001//random( 0.3, 0.6 )
                });

                agents.push( new Agent({
                    behaviors: [ bounds, flee, /*wander,*/ align, cohere, separate ],
                    maxForce: random( 0.2, 0.7 ),
                    maxSpeed: random( 2.0, 25.0 ),
                    radius: random( 8, 32 ),
                    color: random( COLOURS ),
                    vel: new Vector( random(), random() ),
                    x: this.width * random( 0.4, 0.6 ),
                    y: this.height * random( 0.49, 0.51 )
                }));
            }

            if ( gui ) {

                gui.add( align, 'radius' ).min( 50 ).max( 1000 ).name( 'Align Radius' );
                gui.add( align, 'weight' ).min( 0.0 ).max( 1.0 ).name( 'Align Weight' );

                gui.add( cohere, 'radius' ).min( 50 ).max( 1000 ).name( 'Cohere Radius' );
                gui.add( cohere, 'weight' ).min( 0.0 ).max( 1.0 ).name( 'Cohere Weight' );

                gui.add( separate, 'radius' ).min( 0 ).max( 100 ).name( 'Avoid Radius' );
                gui.add( separate, 'weight' ).min( 0.0 ).max( 10.0 ).name( 'Avoid Weight' );
            }

        },

        update: function() {

            flee.radius *= 0.99;
            flee.weight *= 0.99;

            // Update agents
            for ( var i = 0; i < NUM_AGENTS; i++ ) {
                agents[i].update();
            }
        },

        draw: function() {

            var t = this.millis;

            align.radius = map( sin( t * 0.00142 ), -1, 1, 50, 200 );
            align.weight = map( cos( t * 0.00038 ), -1, 1, 0.1, 0.8 );
            cohere.radius = map( sin( t * 0.00048 ), -1, 1, 50, 200 );
            cohere.weight = map( sin( t * 0.00009 ), -1, 1, 0.005, 0.02 );
            separate.radius = map( sin( t * 0.0012 ), -1, 1, 8, 25 );
            separate.weight = map( cos( t * 0.0011 ), -1, 1, 1.0, 3.0 );

            // Render agents
            for ( var i = 0; i < NUM_AGENTS; i++ ) {
                renderer.renderAgent( agents[i], this );
            }

            // Render mouse
            // renderer.renderMouse( mouse, this );
        },

        resize: function() {

            // Update bounds
            bounds.max.set( this.width, this.height );
        },

        mousemove: function() {

            // Update mouse
            mouse.set( this.mouse.x, this.mouse.y );
            flee.radius = 400;
            flee.weight = 10;
        }
    });
}
