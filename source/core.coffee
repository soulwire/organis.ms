
core =

    # Applies default properties to an object
    defaults: ( target, source ) ->

        target[ key ] ?= val for key, val of source
        target

    # Overwrites properties in target from source
    extend: ( target, source ) ->

        target[ key ] = val for key, val of source
        target