
function SeekDemo() {

    var NUM_AGENTS = 60;
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

    return Sketch.create({

        container: document.getElementById( 'container' ),
        retina: 'auto',

        setup: function() {

            // Set initial mouse position to stage center

            mouse.set( this.width * 0.5, this.height * 0.5 );

            // Define behaviors

            var seek = new Seek({
                braking: 100,
                radius: 500,
                target: mouse
            });

            // Create agents
            for ( var i = 0; i < NUM_AGENTS; i++ ) {

                agents.push( new Agent({
                    behaviors: [ bounds, seek ],
                    maxForce: random( 0.02, 0.5 ),
                    maxSpeed: random( 1.0, 25.0 ),
                    radius: random( 8, 32 ),
                    color: random( COLOURS ),
                    x: random( this.width ),
                    y: random( this.height )
                }));
            }

            gui.add( seek, 'radius' ).min( 50 ).max( 1000 ).name( 'Seek Radius' );
            gui.add( seek, 'braking' ).min( 10 ).max( 400 ).name( 'Braking Radius' );
        },

        update: function() {

            // Update agents
            for ( var i = 0; i < NUM_AGENTS; i++ ) {
                agents[i].update();
            }
        },

        draw: function() {

            // Render agents
            for ( var i = 0; i < NUM_AGENTS; i++ ) {
                renderer.renderAgent( agents[i], this );
            }

            // Render mouse
            renderer.renderMouse( mouse, this );
        },

        resize: function() {

            // Update bounds
            bounds.max.set( this.width, this.height );
        },

        mousemove: function() {

            // Update mouse
            mouse.set( this.mouse.x, this.mouse.y );
        }
    });
}
