
class Flee

    constructor: ( options ) ->

        # Merge options & defaults
        core.extend @, core.defaults options or {},

            # Toggle
            enabled: yes

            # Seek target
            target: new Vector()

            # Radius to flee within
            radius: 100

            # Behavior weighting
            weight: 1.0

            # Apply probability
            chance: 1.0

    apply: ( agent ) ->

        # Determine whether or not to apply behavior
        return if not @enabled or @chance < 1 and Math.random() > @chance

        # Velocity required to reach target instantly
        desired = Vector.sub agent, @target

        # Compute squared distance
        distanceSq = do desired.magSq

        # Optimise by using squared radius
        radiusSq = @radius * @radius

        if distanceSq < radiusSq

            # Compute directional unit vector
            desired.norm()

            # Scale force proportionally to distance & braking radius
            desired.scale utils.map distanceSq, radiusSq, 0, 0, agent.maxSpeed

            # Compute velocity delta
            steer = Vector.sub desired, agent.vel

            # Limit force
            #steer.limit agent.maxForce

            # Apply weighting
            steer.scale @weight

            # Apply force
            agent.acc.add steer
