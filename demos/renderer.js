
function Renderer( options ) {

    this.options = options;

    // @private

    function line( x1, y1, x2, y2, ctx ) {

        ctx.beginPath();
        ctx.moveTo( x1, y1 );
        ctx.lineTo( x2, y2 );
        ctx.closePath();
    }

    function arrow( size, ctx ) {

        ctx.beginPath();
        ctx.moveTo( -size, -size );
        ctx.lineTo( size, 0 );
        ctx.lineTo( -size, size );
        ctx.closePath();
    }

    // @public

    this.renderAgent = function( agent, ctx ) {

        var mag = agent.vel.mag() * 6;
        var rad = agent.vel.angle();

        // Draw body

        ctx.save();

            ctx.globalAlpha = 0.8;

            ctx.beginPath();
            ctx.arc( agent.x, agent.y, agent.radius, 0, Math.PI * 2 );
            ctx.closePath();

            ctx.fillStyle = agent.color || '#00FFFF';
            ctx.fill();

        ctx.restore();

        // Draw velocity

        ctx.save();

            ctx.globalAlpha = 0.6;

            ctx.translate( agent.x, agent.y );
            ctx.rotate( rad );

            line( 0, 0, mag, 0, ctx );

            ctx.strokeStyle = agent.color || '#00FFFF';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.stroke();

            ctx.translate( mag, 0 );
            arrow( Math.max( 4, agent.radius * 0.25 ), ctx );

            ctx.fillStyle = agent.color || '#00FFFF';
            ctx.fill();

        ctx.restore();
    };

    this.renderObstacle = function( obstacle, ctx ) {

        ctx.save();

            ctx.globalAlpha = 0.8;

            ctx.beginPath();
            ctx.arc( obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2 );
            ctx.closePath();

            ctx.fillStyle = obstacle.color || '#000000';
            ctx.fill();

        ctx.restore();
    };

    this.renderMouse = function( mouse, ctx ) {

        ctx.save();

            ctx.globalAlpha = 0.8;

            ctx.beginPath();
            ctx.arc( mouse.x, mouse.y, 50, 0, Math.PI * 2 );
            ctx.closePath();

            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fill();

        ctx.restore();
    };

    this.renderWander = function( agent, ctx ) {

        var behavior;

        for ( var i = 0, n = agent.behaviors.length; i < n; i++ ) {

            behavior = agent.behaviors[i];

            if ( behavior instanceof Wander ) {

                ctx.save();

                    // Draw wander circle

                    var offset = agent.vel.clone();
                    offset.norm();
                    offset.scale( behavior.distance );
                    offset.add( agent );

                    ctx.translate( offset.x, offset.y );

                    ctx.beginPath();
                    ctx.arc( 0, 0, behavior.radius, 0, Math.PI * 2 );
                    ctx.closePath();

                    ctx.globalAlpha = 0.28;
                    ctx.fillStyle = agent.color;
                    ctx.fill();

                    ctx.save();

                        ctx.globalAlpha = 0.85;
                        ctx.strokeStyle = agent.color;

                        ctx.rotate( behavior.theta );

                        line( 0, 0, 0, behavior.radius - 8, ctx );
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.arc( 0, behavior.radius, 8, 0, Math.PI * 2 );
                        ctx.closePath();
                        ctx.stroke();

                    ctx.restore();

                ctx.restore();
            }
        }
    };

    this.renderAvoid = function( agent, ctx ) {

        var behavior;

        for ( var i = 0, n = agent.behaviors.length; i < n; i++ ) {

            behavior = agent.behaviors[i];

            if ( behavior instanceof Avoid ) {

                ctx.save();

                    ctx.translate( agent.x, agent.y );

                    var forward = agent.vel.clone().norm().scale( behavior.radius + agent.radius );
                    line( 0, 0, forward.x, forward.y, ctx );
                    ctx.strokeStyle = agent.color;
                    ctx.stroke();

                ctx.restore();
            }
        }
    };
}