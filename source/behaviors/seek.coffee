
class Seek

    constructor: ( options ) ->

        # Merge options & defaults
        core.extend @, core.defaults options or {},

            # Toggle
            enabled: yes

            # Seek target
            target: new Vector()

            # Apply braking force within this radius
            braking: 100

            # Radius to seek within
            radius: 999999

            # Behavior weighting
            weight: 1.0

            # Apply probability
            chance: 1.0

    apply: ( agent ) ->

        # Determine whether or not to apply behavior
        return if not @enabled or @chance < 1 and Math.random() > @chance

        # Velocity required to reach target instantly
        desired = Vector.sub @target, agent

        # Compute squared distance
        distanceSq = do desired.magSq

        # Optimise by using squared radius
        radiusSq = @radius * @radius

        if distanceSq > 0.000001 and distanceSq < radiusSq

            # Compute directional unit vector
            desired.norm()

            # Optimise by using squared braking radius
            brakingSq = @braking * @braking

            # If within the braking zone
            if distanceSq < brakingSq

                # Scale force proportionally to distance & braking radius
                desired.scale utils.map distanceSq, 0, brakingSq, 0, agent.maxSpeed

            else

                # Scale to max speed
                desired.scale agent.maxSpeed

            # Compute velocity delta
            steer = Vector.sub desired, agent.vel

            # Limit force
            #steer.limit agent.maxForce

            # Apply weighting
            steer.scale @weight

            # Apply force
            agent.acc.add steer
