# classy-immutable
Immutable instances of ES6 classes.

## Examples
### Setup

```
import Immutable from 'classy-immutable';

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

### Acts like a standard ES6 class...
```
let mic = MyImmutableClass.create(5, 10);
(mic.x === 5) === true;
(mic.y === 10) === true;
(mic.sum === 15) === true;
```

### ...except that setters are no-ops.
```
mic.x = 100;
(mic.x === 5) === true;
```

### Use the 'set', 'setIn', 'merge', or 'without' methods instead.
```
let mic2 = mic.set('x', 100);
(mic2.x === 100) === true;
(mic2.y === 10) === true;
(mic2.sum === 110) === true;
```

### A fresh immutable instance is created with each modification.
```
(mic === mic2) === false;
```

### Inheritance works as expected.
```
(mic instanceof MyImmutableClass) === true;
(mic2 instanceof MyImmutableClass) === true;
(mic instanceof Immutable) === true;
(mic2 instanceof Immutable) === true;
```

## Methods
### static create
```
let mic = MyImmutableClass.create(5, 10);
(mic instanceof MyImmutableClass) === true;
```

### static object
```
let i = Immutable.object({ x: 1, y: 'so easy', z: [2, 4, 6, 8] });
(i instanceof Immutable) === true;
```

### set
```
let mic = MyImmutableClass.create(5, 10),
    mic2 = mic.set('x', 50);
(mic.x === 5) === true;
(mic.y === 10) === true;
(mic2.x === 50) === true;
(mic2.y === 10) === true;
(mic === mic2) === false;
```

### setIn
```
```

### merge
```
```

### without
```
```

### asMutable
```
```
