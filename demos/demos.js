
// Global GUI
var gui;// = new dat.GUI();

(function() {

    // Hash of demos
    var demos = {
        Seek: SeekDemo,
        Flee: FleeDemo,
        Flock: FlockDemo,
        Wander: WanderDemo
    };

    // Handles switching between demos
    function changeDemo() {

        var i, n;

        // Remove demo controls
        for ( i = gui.__controllers.length - 1; i >= 0; i-- ) {
            try { gui.remove( gui.__controllers[i] ); }
            catch ( error ) {}
        }

        // Destroy running demos (Sketch instances)
        for ( i = 0, n = Sketch.instances.length; i < n; i++ ) {
            Sketch.instances[i].destroy();
        }
    }

    // Create a GUI for switching
    // var select = gui.addFolder( 'Select Demo' );
    // select.open();

    // Add demos
    // for ( var demo in demos ) {
    //     select.add( demos, demo ).onChange( changeDemo );
    // }

    // gui = gui.addFolder( 'Demo Options' );
    // gui.close();

    // Start up first demo
    demos.Flock();

    var faded = document.querySelector( '.faded' );
    setTimeout( function() {
        faded.classList.remove( 'faded' );
    }, 0);

})();