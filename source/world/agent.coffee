
class Agent extends Vector

    constructor: ( options ) ->

        # Default to zero vector
        super 0.0, 0.0

        # Merge options & defaults
        core.extend @, core.defaults options or {},

            # Bounding radius
            radius: 10

            # Velocity damping
            damping: 0.995

            # Active behaviors
            behaviors: []

            # Maximum effective velocity
            maxSpeed: 1.0

            # Maximum effective force
            maxForce: 1.0

            # Current velocity vector
            vel: new Vector()

            # Current force vector
            acc: new Vector()

    update: ->

        # Apply behaviors
        behavior.apply @ for behavior in @behaviors

        # Apply limited force
        @vel.add @acc.limit @maxForce

        # Apply limited velocity
        @.add @vel.limit @maxSpeed

        # Apply damping
        @vel.scale @damping

        # Reset force
        do @acc.clear
