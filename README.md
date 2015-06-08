# Keyboard Shortcut String

Creates a canonical keyboard shortcut string from the given shortcut string input.

**Examples:**

```js
console.log(getCanonicalShortcut('ctrl s'));
// 'ctrl s'

console.log(getCanonicalShortcut('s ctrl'));
// 'ctrl s'

console.log(getCanonicalShortcut('s   ctrl'));
// 'ctrl s'

console.log(getCanonicalShortcut('shift ctrl s'));
// 'shift ctrl s'

console.log(getCanonicalShortcut('ctrl shift s'));
// 'shift ctrl s'

console.log(getCanonicalShortcut('S   CTRL   SHIFT'));
// 'shift ctrl s'
```

## Modifier Keys

1. shift
2. ctrl
3. alt
4. meta

Modifier keys are extracted from the input and placed in a predictable order at
the front of the result.

## Non-modifier Keys

Only one non-modifier key component is allowed: `"alt s"` works, but `"alt s h"`
will throw.

Non-modifier keys can be almost anything: "s", "S", "space", "ESC", and lowercase
is always returned.

## Thanks!

This source is ***heavily*** sourced from MooTools [Keyboard.parse](https://github.com/mootools/mootools-more/blob/ba6e35a49ecfcb3e39e95ca862594decbe607181/Source/Interface/Keyboard.js#L169-L204).


## License

MIT