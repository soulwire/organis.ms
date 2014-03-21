
class Vector

    # --------------------------------------------------
    # Class methods
    # --------------------------------------------------

    @add: ( v1, v2 ) ->

        new Vector v1.x + v2.x, v1.y + v2.y

    @sub: ( v1, v2 ) ->

        new Vector v1.x - v2.x, v1.y - v2.y

    @dist: ( v1, v2 ) ->

        dx = v2.x - v1.x
        dy = v2.y - v1.y

        Math.sqrt dx * dx + dy * dy

    @distSq: ( v1, v2 ) ->

        dx = v2.x - v1.x
        dy = v2.y - v1.y

        dx * dx + dy * dy

    @project: ( v1, v2 ) ->

        dot = v1.x * v2.x + v1.y * v2.y
        mag = v2.x * v2.x + v2.y * v2.y

        val = dot / mag

        new Vector v2.x * val, v2.y * val

    # --------------------------------------------------
    # Instance methods
    # --------------------------------------------------

    constructor: ( @x = 0.0, @y = 0.0 ) ->

    set: ( @x, @y ) ->

        @

    add: ( v ) ->

        @x += v.x
        @y += v.y

        @

    sub: ( v ) ->

        @x -= v.x
        @y -= v.y

        @

    mult: ( v ) ->

        @x *= v.x
        @y *= v.y

        @

    scale: ( f ) ->

        @x *= f
        @y *= f

        @

    dot: ( v ) ->

        @x * v.x + @y * v.y

    cross: ( v ) ->

        ( @x * v.y ) - ( @y * v.x )

    perp: ->

        new Vector -@y, @x

    sign: ( v ) ->

        ( @perp().dot v ) < 0 ? -1 : 1

    mag: ->

        Math.sqrt @x * @x + @y * @y

    magSq: ->

        @x * @x + @y * @y

    dist: ( v ) ->

        dx = v.x - @x
        dy = v.y - @y

        Math.sqrt dx * dx + dy * dy

    distSq: ( v ) ->

        dx = v.x - @x
        dy = v.y - @y

        dx * dx + dy * dy

    angle: ->

        Math.atan2 @y, @x

    norm: ->

        m = Math.sqrt @x * @x + @y * @y

        @x /= m
        @y /= m

        @

    limit: ( l ) ->

        mSq = @x * @x + @y * @y

        if mSq > l * l

            m = Math.sqrt mSq

            @x /= m
            @y /= m

            @x *= l
            @y *= l

        @

    rotate: ( theta ) ->

        s = Math.sin theta
        c = Math.cos theta

        @x = @x * c - @y * s
        @y = @x * s + @y * c

        @

    copy: ( v ) ->

        @x = v.x
        @y = v.y

        @

    clone: ->

        new Vector @x, @y

    clear: ->

        @x = 0.0
        @y = 0.0

        @
