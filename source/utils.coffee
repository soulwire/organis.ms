
utils =

    # Returns a random number within a range
    random: ( min, max ) ->

        if not max?
            max = min
            min = 0

        min + Math.random() * ( max - min )

    # Maps a number from one range to another
    map: ( num, minA, maxA, minB, maxB ) ->

        # Compute deltas
        dA = maxA - minA
        dB = maxB - minB

        # Scale to initial range
        f = ( num - minA ) / dA

        # Map to new range
        minB + f * dB

    # Finds the closest vector in a list to a given vector
    closest: ( target, others ) ->

        distSq = Number.MAX_VALUE

        for other in others

            if ( d = target.distSq other ) < distSq

                closest = other
                distSq = d

        closest