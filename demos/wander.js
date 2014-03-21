
function WanderDemo() {

    var NUM_AGENTS = 10;
    var COLOURS = [
        '#FE4365', '#FC9D9A', '#F9CDAD', '#C8C8A9',
        '#83AF9B', '#FF4E50', '#FC913A', '#F9D423',
        '#EDE574', '#E1F5C4', '#B3CC57', '#ECF081',
        '#FFBE40', '#EF746F', '#D0ECEA', '#9FD6D2'
        ];

    var renderer = new Renderer();
    var options = { swarm: true };
    var agents = [];
    var bounds = new Bounds();

    return Sketch.create({

        container: document.getElementById( 'container' ),

        setup: function() {

            // Create agents

            var agent, wander, seek;

            for ( var i = 0; i < NUM_AGENTS; i++ ) {

                // You should define wander per agent
                wander = new Wander({
                    distance: 100/*random( 20, 80 )*/,
                    jitter: random( 0.05, 0.25 ),
                    radius: 50/*random( 10, 40 )*/,
                    weight: random( 0.5, 2.0 ),
                    theta: random( -PI, PI )
                });

                agent = new Agent({
                    behaviors: [ bounds, wander ],
                    maxForce: 1.0/*random( 0.1, 0.8 )*/,
                    maxSpeed: random( 1.0, 6.0 ),
                    radius: random( 8, 32 ),
                    color: random( COLOURS ),
                    vel: new Vector( 2, 2 ),
                    x: random( this.width ),
                    y: random( this.height )
                });

                // Seek the previous agent
                if ( i > 0 ) {

                    seek = new Seek({
                        enabled: false,
                        target: agents[ i - 1 ],
                        weight: random( 0.5, 2.5 )
                    });

                    agent.behaviors.push( seek );
                    agent.seek = seek;
                }

                agents.push( agent );
            }

            // Allow toggling of swarmin behavior
            gui.add( options, 'swarm' ).onChange(function() {

                for ( var i = 0; i < NUM_AGENTS; i++ ) {
                    agent = agents[i];
                    if ( agent.seek ) agent.seek.enabled = options.swarm;
                }

            }).name( 'Swarm' );
        },

        update: function() {

            // Update agents
            for ( var i = 0; i < NUM_AGENTS; i++ ) {
                agents[i].update();
            }
        },

        draw: function() {

            // Render agents

            var agent;

            for ( var i = 0; i < NUM_AGENTS; i++ ) {

                agent = agents[i];

                renderer.renderAgent( agent, this );
                renderer.renderWander( agent, this );
            }
        },

        resize: function() {

            // Update bounds
            bounds.max.set( this.width, this.height );
        }
    });
}
