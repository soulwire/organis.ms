
class Bounds

    # Constants
    @WRAP: 'wrap'

    constructor: ( options ) ->

        # Merge options & defaults
        core.extend @, core.defaults options or {},

            # Toggle
            enabled: yes

            # Top left boundary
            min: new Vector 0, 0

            # Bottom right boundary
            max: new Vector 1000, 1000

            # Current angle
            type: Bounds.WRAP

            # Apply probability
            chance: 1.0

    apply: ( agent ) ->

        # Determine whether or not to apply behavior
        return if not @enabled or @chance < 1 and Math.random() > @chance

        if agent.x + agent.radius < @min.x then agent.x = @max.x + agent.radius
        else if agent.x - agent.radius > @max.x then agent.x = @min.x - agent.radius

        if agent.y + agent.radius < @min.y then agent.y = @max.y + agent.radius
        else if agent.y - agent.radius > @max.y then agent.y = @min.y - agent.radius