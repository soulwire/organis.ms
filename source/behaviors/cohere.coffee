
class Cohere

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

        count = 0

        # Average position of all targets
        average = new Vector()

        # Optimise by using squared radius
        radiusSq = @radius * @radius

        # Assess all other agents
        for other in @agents when other isnt agent

            #continue if Math.random < 0.3

            # Check whether other agent is in proximity
            distSq = Vector.distSq agent, other

            if distSq > 0 and distSq < radiusSq

                # Append agent's velocity
                average.add other

                # Sum influence
                ++count

        # If there are agents to align with
        if count > 0

            # Average position
            average.scale 1 / count

            # Steer towards average position
            steer = Vector.sub average, agent

            # Limit force
            #steer.limit agent.maxForce

            # Apply weighting
            steer.scale @weight

            # Apply force
            agent.acc.add steer


