
class Separate

    constructor: ( options ) ->

        # Merge options & defaults
        core.extend @, core.defaults options or {},

            # Toggle
            enabled: yes

            # Agents
            agents: []

            # Radius to align within
            radius: 200

            # Behavior weighting
            weight: 1.0

            # Apply probability
            chance: 1.0

    apply: ( agent ) ->

        # Determine whether or not to apply behavior
        return if not @enabled or @chance < 1 and Math.random() > @chance

        # Average position of all targets
        steer = new Vector()

        # Assess all other agents
        for other in @agents when other isnt agent

            #continue if Math.random < 0.3

            # Include the agent radii assessment
            radii = @radius + agent.radius + other.radius

            # Optimise by using squared radius
            radiiSq = radii * radii

            # Check whether other agent is in proximity
            distSq = Vector.distSq agent, other

            if distSq > 0 and distSq < radiiSq

                # Velocity required to flee target instantly
                desired = Vector.sub agent, other

                # Compute directional unit vector
                desired.norm()

                # Scale force proportionally to distance & radius
                desired.scale utils.map distSq, radiiSq, 0, 0, agent.maxSpeed

                # Accumulate force
                steer.add desired

        # Limit force
        #steer.limit agent.maxForce

        # Apply weighting
        steer.scale @weight

        # Apply force
        agent.acc.add steer


