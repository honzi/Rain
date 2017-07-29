'use strict';

function draw_logic(){
    // Draw drops.
    canvas_buffer.fillStyle = '#aaf';
    core_group_modify({
      'groups': [
        'drop',
      ],
      'todo': function(entity){
          canvas_buffer.fillRect(
            core_entities[entity]['x'],
            core_entities[entity]['y'],
            2,
            7
          );
      },
    });

    // Draw objects.
    canvas_buffer.fillStyle = '#777';
    core_group_modify({
      'groups': [
        '_object',
      ],
      'todo': function(entity){
          canvas_buffer.fillRect(
            core_entities[entity]['x'],
            core_entities[entity]['y'],
            core_entities[entity]['width'],
            core_entities[entity]['height']
          );
      },
    });
}

function logic(){
    // Add some randomly placed drops.
    var loop_counter = drop_counter;
    do{
        core_entity_create({
          'properties': {
            'x': core_random_integer({
              'max': canvas_width,
            }),
            'y': -99,
          },
          'types': [
            'drop',
          ],
        });
    }while(loop_counter--);

    // Update drop positions.
    core_group_modify({
      'groups': [
        'drop',
      ],
      'todo': function(entity){
          core_entities[entity]['y'] += core_random_integer({
            'max': 9,
          }) + 9;

          var remove = false;

          if(core_entities[entity]['y'] > canvas_height){
              remove = true;
          }

          /*for(var object_entity in core_groups['_object']){
              if(!(core_entities[entity]['x'] <= core_entities[object_entity]['x']
                || core_entities[entity]['y'] - core_entities[object_entity]['height'] <= core_entities[object_entity]['y']
                || core_entities[entity]['x'] - core_entities[object_entity]['width'] >= core_entities[object_entity]['x']
                || core_entities[entity]['y'] >= core_entities[object_entity]['y']
              )){
                  remove = true;
                  break;
              }
          };*/

          if(remove){
              core_entity_remove({
                'entities': [
                  entity,
                ],
              });
          }
      },
    });
}

function repo_init(){
    core_repo_init({
      'entities': {
        'drop': {},
        'object': {
          'properties': {
            'height': 40,
            'width': 200,
          },
        },
      },
      'keybinds': {
        83: {
          'todo': function(){
              drop_counter = Math.max(
                drop_counter - 1,
                0
              );
          },
        },
        87: {
          'todo': function(){
              drop_counter++;
          },
        },
      },
      'title': 'Rain-2D.htm',
    });
    canvas_init();

    /*core_entity_create({
      'properties': {
        'x': canvas_x,
        'y': canvas_y,
      },
      'types': [
        'object',
      ],
    });*/
}

var drop_counter = 0;
