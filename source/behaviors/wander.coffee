
class Wander

    constructor: ( options ) ->

        # Merge options & defaults
        core.extend @, core.defaults options or {},

            # Toggle
            enabled: yes

            # Current angle
            theta: Math.random Math.PI * 2.0

            # Wander circle distance
            distance: 80

            # Wander radius
            radius: 20

            # Randomness
            jitter: 0.5

            # Behavior weighting
            weight: 1.0

            # Apply probability
            chance: 1.0

    apply: ( agent ) ->

        # Determine whether or not to apply behavior
        return if not @enabled or @chance < 1 and Math.random() > @chance

        # Update the wander direction
        @theta += utils.random -@jitter, @jitter

        # Compute the position of the wander circle
        center = agent.vel.clone().norm()
        center.scale @distance
        center.add agent

        # Create a target point on the wander circle
        target = new Vector 1, 1
        target.rotate @theta
        target.scale @radius

        # Make target relative to agent position
        target.add center

        # Compute velocity required to instantly arrive
        steer = Vector.sub target, agent

        # Subtract the current velocity
        steer.sub agent.vel

        # Apply weighting
        steer.scale @weight

        # Apply force
        agent.acc.add steer

        # # Compute steering force
        # steer = do agent.vel.clone
        # do steer.norm

        # steer.scale @radius
        # steer.rotate @theta

        # # steer = new Vector 1.0, 1.0
        # # steer.rotate @theta
        # # steer.scale @radius

        # # Limit force
        # #steer.limit agent.maxForce

        # # Apply weighting
        # steer.scale @weight

        # # Apply force
        # agent.acc.add steer


