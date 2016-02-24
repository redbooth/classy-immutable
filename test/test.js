'use strict';

import Immutable from '../index';
import { assert } from 'chai';

// setup
class Sub extends Immutable {
    constructor(a) {
        super();
        this.a = a;
    }
}

// tests
describe('Instantiation', function() {
    describe('Immutable.create', function() {
        it('should create an Immutable instance', function() {
            let a = Immutable.create();
            assert.instanceOf(a, Immutable);
        });
        it('should create a Sub instance', function() {
            let a = Sub.create(10);
            assert.instanceOf(a, Immutable);
            assert.instanceOf(a, Sub);
        });
    });
    describe('Immutable.object', function() {
        it('should create an Immutable instance from an object', function() {
            let a = Immutable.object({ x: 1, y: 'string', z: [2, 4, 6, 8, 10] });
            assert.instanceOf(a, Immutable);
        });
        it('should create a Sub instance from an object', function() {
            let a = Sub.object({ x: 1, y: 'string', z: [2, 4, 6, 8, 10] });
            assert.instanceOf(a, Immutable);
            assert.notInstanceOf(a, Sub);
        });
    });
});

describe('Modification', function() {
    describe('#set', function() {
        it('should set values on a cloned instance', function() {
            let a = Immutable.object({ x: 1, y: 'string', z: [2, 4, 6, 8, 10] });
            assert.instanceOf(a, Immutable);

            let b = a.set('a', 4);
            assert.instanceOf(b, Immutable);
            assert.notStrictEqual(a, b);
            assert.isUndefined(a.a);
            assert.strictEqual(b.a, 4);

            let c = a.set('x', 10);
            assert.notStrictEqual(a, c);
            assert.strictEqual(a.x, 1);
            assert.strictEqual(c.x, 10);

            let d = a.set('x', 1);
            assert.notStrictEqual(a, d);
            assert.strictEqual(a.x, 1);
            assert.strictEqual(d.x, 1);
        });
    });
    describe('#setIn', function() {
        it('should set deep values on a cloned instance', function() {
            assert(true);
        });
    });
    describe('#merge', function() {
        it('should merge values into a cloned instance', function() {
            assert(true);
        });
    });
    describe('#without', function() {
        it('should remove values from a cloned instance', function() {
            assert(true);
        });
    });
    describe('#asMutable', function() {
        it('should return a mutable instance', function() {
            assert(true);
        });
    });
});

describe('Immutability', function() {
    describe('#set', function() {
        it('should return an instance with deeply frozen members', function() {
            assert(true);
        });
    });
    describe('#setIn', function() {
        it('should return an instance with deeply frozen members', function() {
            assert(true);
        });
    });
    describe('#merge', function() {
        it('should return an instance with deeply frozen members', function() {
            assert(true);
        });
    });
    describe('#without', function() {
        it('should return an instance with deeply frozen members', function() {
            assert(true);
        });
    });
    describe('#asMutable', function() {
        it('should return an instance with deeply frozen members', function() {
            assert(true);
        });
    });
});

describe('Performance', function() {
    const N = 25000,
        times = N.toLocaleString();
    let start;

    beforeEach(function() {
        start = Date.now();
    });

    afterEach(function() {
        let totalMS = Date.now() - start,
            eachMS = totalMS / N,
            eachNS = (eachMS * 1000).toFixed(2);
        console.log(`      ${ totalMS }ms (${ eachNS }ns per call)`);
    });

    it(`should run Immutable.create ${ times } times`, function() {
        for (let i = 0; i < N; i++) {
            Immutable.create();
        }
    });
    it(`should run Immutable.object ${ times } times`, function() {
        for (let i = 0; i < N; i++) {
            Immutable.object({ x: 1, y: 'string', z: [2, 4, 6, 8, 10] });
        }
    });
    it(`should run #set ${ times } times`, function() {
        let a = Immutable.object({ x: 1, y: 'string', z: [2, 4, 6, 8, 10] });
        for (let i = 0; i < N; i++) {
            a.set('x', i);
        }
    });
    it(`should run #setIn ${ times } times`, function() {
        let a = Immutable.object({ x: 1, y: 'string', z: [2, 4, 6, 8, 10] });
        for (let i = 0; i < N; i++) {
            a.setIn(['z', '3'], i);
        }
    });
    it(`should run #merge ${ times } times`, function() {
        let a = Immutable.object({ x: 1, y: 'string', z: [2, 4, 6, 8, 10] });
        for (let i = 0; i < N; i++) {
            a.merge({ x: 10, y: 'another string', z: [3, 6, 9, 12, 15] });
        }
    });
    it(`should run #without ${ times } times`, function() {
        let a = Immutable.object({ x: 1, y: 'string', z: [2, 4, 6, 8, 10] });
        for (let i = 0; i < N; i++) {
            a.without(['x', 'y']);
        }
    });
    it(`should run #asMutable ${ times } times`, function() {
        let a = Immutable.object({ x: 1, y: 'string', z: [2, 4, 6, 8, 10] });
        for (let i = 0; i < N; i++) {
            a.asMutable();
        }
    });
});