# classy-immutable
Immutable instances of ES6 classes.

## Examples
### Setup

```
let Immutable = require('classy-immutable');

class MyImmutableClass extends Immutable {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    get sum() {
        return this.x + this.y;
    }
}
```

### Acts like a standard ES6 class.
```
let mic = MyImmutableClass.create(5, 10);
mic.x === 5; // true
mic.y === 10; // true
mic.sum === 15; // true
```

### except that setters are no-ops
```
mic.x = 100;
mic.x === 5; // true
```

### use the 'set', 'setIn', or 'merge' methods instead
```
let mic2 = mic.set('x', 100);
mic2.x === 100; // true
mic2.y === 10; // true
mic2.sum === 110; // true
```

### new immutable instances are created with each set operation
```
mic === mic2;  // false
```

### inheritance works as expected
```
mic instanceof MyImmutableClass; // true
mic2 instanceof MyImmutableClass; // true
mic instanceof Immutable; // true
mic2 instanceof Immutable; // true
```

## Methods
static create
static object
set
setIn
merge
without
asMutable
