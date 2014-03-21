
class Obstacle extends Vector

	constructor: ( options ) ->

		# Default to zero vector
		super 0.0, 0.0

		# Merge options & defaults
		core.extend @, core.defaults options or {},

		    # Bounding radius
		    radius: 10