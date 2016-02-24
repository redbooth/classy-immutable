'use strict';

function deepFreeze(obj) {
    for (let key in obj) {
        let prop = obj[key];
        if (typeof prop === 'object' && prop !== null && !Object.isFrozen(prop)) {
            obj[key] = deepFreeze(prop);
        }
    }
    return Object.freeze(obj);
}

function deepUnfreeze(obj) {
    let clone = new obj.constructor();
    for (let key in obj) {
        let prop = obj[key];
        if (typeof prop === 'object' && prop !== null) {
            clone[key] = deepUnfreeze(prop);
        } else {
            clone[key] = prop;
        }
    }
    return clone;
}

function setIn(obj = {}, keys = [], val) {
    let clone = Object.assign(new obj.constructor(), obj);
    switch (keys.length) {
        case 0:
            break;
        case 1:
            clone[keys[0]] = val;
            break;
        default:
            clone[keys[0]] = setIn(obj[keys[0]], keys.slice(1), val);
            break;
    }
    return clone;
}

class Immutable {
    static create(...args) {
        return deepFreeze(new this(...args));
    }

    static object(obj = {}) {
        let clone = Object.assign(new Immutable(), obj);
        return deepFreeze(clone);
    }

    set(key, val) {
        let obj = {};
        obj[key] = val;
        return this.merge(obj);
    }

    setIn(keys = [], val) {
        let clone = setIn(this, keys, val);
        return deepFreeze(clone);
    }

    merge(that = {}) {
        let clone = Object.assign(new this.constructor(), this, that);
        return deepFreeze(clone);
    }

    without(keys = []) {
        let clone = Object.assign(new this.constructor(), this);
        keys.forEach(key => delete clone[key]);
        return deepFreeze(clone);
    }

    asMutable() {
        return deepUnfreeze(this);
    }
}

export default Immutable;
