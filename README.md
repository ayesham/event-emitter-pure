# event-emitter-pure

Event Emitter pure is a simple event emitter with the functional programming juice.

## Installation

Use the ES6 module import syntax [ES6 Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to import the package.


## Usage

```javascript
import eventEmitter from 'node_modules/event-emitter-pure';

// Create a new emitter
let myEmitter = eventEmitter();

// Attach a callback to an event
myEmitter.on('feed:kids', runFastTowardTheDoor);

// Remove a callback from an event
myEmitter.off('feed:kids', runFastTowardTheDoor);

// Attach a callback to an event to run only once
myEmitter.once('eventName', callback);

// Emit an event with some data or no data to fire all active callbacks
myEmitter.emit('eventName', callback);

// Remove all callbacks from the queue for a single event
myEmitter.clear('eventName');

// Completely clean myEmitter's event queue
myEmitter.destroy();
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
