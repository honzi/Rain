'use strict';

function draw_logic(){
    // Draw drops.
    canvas_buffer.fillStyle = '#aaf';
    for(var drop in drops){
        canvas_buffer.fillRect(
          drops[drop]['x'],
          drops[drop]['y'],
          2,
          7
        );
    }

    // Draw object.
    canvas_buffer.fillStyle = '#777';
    canvas_buffer.fillRect(
      object['x'],
      object['y'],
      200,
      -40
    );

    // Draw number of particles.
    canvas_buffer.fillStyle = '#fff';
    canvas_buffer.fillText(
      drops.length,
      object['x'],
      object['y']
    );
}

function logic(){
    // Add some randomly placed drops.
    var loop_counter = drop_counter;
    do{
        drops.push({
          'x': random_integer(canvas_width),
          'y': -99,
        });
    }while(loop_counter--);

    // Update drop positions.
    for(var drop in drops){
        drops[drop]['y'] += Math.random() * 9 + 9;

        // Delete drops below bottom of screen
        //   or that collided with the object.
        if(drops[drop]['y'] > canvas_height
          || !(
            drops[drop]['x'] <= object['x']
            || drops[drop]['y'] + 40 <= object['y']
            || drops[drop]['x'] - 200 >= object['x']
            || drops[drop]['y'] >= object['y']
          )){
            drops.splice(
              drop,
              1
            );
        }
    }
}

function reset(){
    drops.length = 0;
    drop_counter = 0;
    object = {
      'x': canvas_width / 2 - 100,
      'y': canvas_height / 2,
    };
}

var drop_counter = 0;
var drops = [];
var object = {};

window.onload = function(e){
    canvas_init();
    input_init(
      {
        27: {
          'todo': reset,
        },
        187: {
          'todo': function(){
              drop_counter++;
          },
        },
        189: {
          'todo': function(){
              drop_counter = drop_counter > 0
                ? drop_counter - 1
                : 0;
          },
        },
      },
      {
        'mousedown': {
          'todo': function(){
              object['x'] = input_mouse['x'] - 100;
              object['y'] = input_mouse['y'];
          },
        },
        'mousemove': {
          'todo': function(){
              if(!input_mouse['down']){
                  return;
              }

              object['x'] = input_mouse['x'] - 100;
              object['y'] = input_mouse['y'];
          },
        },
      }
    );

    reset();
};
