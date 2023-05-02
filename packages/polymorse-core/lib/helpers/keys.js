'use strict';

const fs = require(`fs`);
const path = require(`path`);

class Keys {
    constructor(p_source, p_defaults = null) {

        this.__keys = {};

        if (p_defaults) {
            // Ensure some default key exists
            for (var key in p_defaults) {
                if (!this.__keys.hasOwnProperty(key)) {
                    this.__keys[key] = p_defaults[key];
                } else {
                    let sourceValue = this.__keys[key],
                        defaultValue = p_defaults[key];
                    if (Array.isArray(sourceValue)) {
                        // Push array values from default to source ? heh. Sounds a bit rash :(
                        for (let i = 0, n = defaultValue.length; i < n; i++) {
                            let arrValue = defaultValue[i];
                            if (!sourceValue.includes(arrValue)) { sourceValue.unshift(arrValue); }
                        }
                    } else if (typeof sourceValue === 'object') {
                        this._EnsureDefaults(sourceValue, defaultValue);
                    }
                }
            }
        }

        this._RecursiveFlatten(p_source);

        for (let i = 0; i < 10; i++) { this._ResolveKeys(); }

        // Flatten config values
        for (let key in data) {
            let value = this.__parse(data[key]);

            if (!value) {
                console.log(`${key} => ${value} / ${data[key]}`);
            }

            this[key] = value;
        }

    }

    get keys() { return this.__keys; }

    _EnsureDefaults(p_defaults) {
        for (var key in p_defaults) {
            if (!this.__keys.hasOwnProperty(key)) {
                this.__keys[key] = p_defaults[key];
            } else {
                let sourceValue = this.__keys[key],
                    defaultValue = p_defaults[key];
                if (Array.isArray(sourceValue)) {
                    // Push array values from default to source ? heh. Sounds a bit rash :(
                    for (let i = 0, n = defaultValue.length; i < n; i++) {
                        let arrValue = defaultValue[i];
                        if (!sourceValue.includes(arrValue)) { sourceValue.unshift(arrValue); }
                    }
                } else if (typeof sourceValue === 'object') {
                    this._EnsureDefaults(sourceValue, defaultValue);
                }
            }
        }
    }

    Push(p_object) {
        this._RecursiveFlatten(p_object);
        this._ResolveSelf();
    }

    /**
     * Recursively flatten all values within an object
     * @param {Object} p_object 
     * @param {String} p_path 
     */
    _RecursiveFlatten(p_object, p_path = null) {
        if (p_path === null) { p_path = ``; }
        else { p_path += `.`; }

        for (var key in p_object) {
            let value = p_object[key];
            if (Array.isArray(value)) {

            } else if (typeof value === 'object') {
                this._RecursiveFlatten(value, `${p_path}${key}`);
            } else {
                this.__keys[`${p_path}${key}`] = value;
            }
        }
    }

    _ResolveSelf() {
        // replace keys content with themselves
        // { "1":"val", "2":"%1%" } -> { "1":"val", "2":"val" }
        for (var key in this.__keys) {
            let value = this.__keys[key];
            if (typeof value !== 'string') { continue; }
            this.__keys[key] = this.Replace(value);
        }
    }

    Replace(p_string) {
        if (!p_string.includes(`%`)) { return p_string; }
        for (var key in this.__keys) { p_string = p_string.replaceAll(`%${key}%`, this.__keys[key]); }
        return p_string;
    }

    _ResolveKeys() {
        // replace keys content with themselves
        // { "1":"val", "2":"%1%" } -> { "1":"val", "2":"val" }
        for (var key in this.__keys) {
            let value = this.__keys[key];
            if (typeof value !== 'string' || !key.includes(`%`)) { continue; }
            for (var oKey in this.__keys) { value = value.split(`%${oKey}%`).join(this.__keys[oKey]); }
            this.__keys[key] = value;
        }
    }

    __parse(p_value) {

        if (Array.isArray(p_value)) {
            for (let i = 0, n = p_value.length; i < n; i++) {
                p_value[i] = this.__parse(p_value[i]);
            }
        } else if (typeof p_value === 'object') {
            for (var key in p_value) {
                p_value[key] = this.__parse(p_value[key]);
            }
        } else if (typeof p_value === 'string') {
            if (p_value.includes(`%`)) {
                for (let k in this.__keys) {
                    p_value = p_value.split(`%${k}%`).join(this.__keys[k]);
                }
            }
        }

        return p_value;

    }

}

module.exports = Keys;