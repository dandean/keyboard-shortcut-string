var assert = require('assert');
var getShortcutString = require('./index');

describe('shortcut string', function () {
  var keystroke, shortcut;

  it('understands alphanumeric keys', function() {
    keystroke = 'x';
    shortcut = getShortcutString(keystroke);
    assert.equal(keystroke, shortcut);

    keystroke = '5';
    shortcut = getShortcutString(keystroke);
    assert.equal(shortcut, shortcut);
  });

  it('understands named modifier keys', function() {
    keystroke = 'shift';
    shortcut = getShortcutString(keystroke);
    assert.equal('shift', shortcut);

    keystroke = 'ctrl';
    shortcut = getShortcutString(keystroke);
    assert.equal('ctrl', shortcut);

    keystroke = 'alt';
    shortcut = getShortcutString(keystroke);
    assert.equal('alt', shortcut);

    keystroke = 'meta';
    shortcut = getShortcutString(keystroke);
    assert.equal('meta', shortcut);
  });

  it('orders named modifier keys at front of shortcut', function() {
    var canonicalOrder = 'shift+ctrl+alt+meta';
    shortcut = getShortcutString(canonicalOrder);
    assert.equal(canonicalOrder, shortcut);

    keystroke = 'meta+alt+ctrl+shift';
    shortcut = getShortcutString(keystroke);
    assert.equal(canonicalOrder, shortcut);

    keystroke = 'meta+alt+ctrl+shift+s';
    shortcut = getShortcutString(keystroke);
    assert.equal(canonicalOrder + '+s', shortcut);

    keystroke = 'meta+alt+ctrl+shift+esc';
    shortcut = getShortcutString(keystroke);
    assert.equal(canonicalOrder + '+esc', shortcut);
  });

  it('throws if more than one non-modifier key is present in shortcut', function() {
    assert.throws(function() {
      getShortcutString('x+y');
    });
    assert.throws(function() {
      getShortcutString('x+6');
    });

    assert.throws(function() {
      getShortcutString('alt+shift+6+f');
    });
  });

  it('ignores whitespace', function() {
    keystroke = 'shift + ctrl + alt + meta + s';
    shortcut = getShortcutString(keystroke);
    assert.equal('shift+ctrl+alt+meta+s', shortcut);
  });

  it('ignores case', function() {
    keystroke = 'SHIFT+ESC';
    shortcut = getShortcutString(keystroke);
    assert.equal('shift+esc', shortcut);
  })

  it('understands standalone "+" key', function() {
    keystroke = '+';
    shortcut = getShortcutString(keystroke);
    assert.equal('+', shortcut);
  });

  it('throws if "+" is used with any other key', function() {
    assert.throws(function() {
      getShortcutString('alt++');
    })
  })
});
