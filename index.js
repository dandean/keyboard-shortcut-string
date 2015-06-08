var canonicalMap = {
  // Pre-declare standalone "+" key removes a bunch of logic:
  '+': '+'
};
var modifiers = ['shift', 'ctrl', 'alt', 'meta'];

/**
 * Converts a shortcut string into a canonical version
 *
 * @param  {String} shortcut The input shortcut
 * @return {String}          The canonical version
 */
function getCanonicalShortcut(shortcut) {
  // Remove all whitespace from the shortcut:
  shortcut = shortcut.replace(/\s+/g, '').toLowerCase();

  if (/\+\+/.test(shortcut)) {
    throw new Error('Shortcut may not use "+" with any other keys');
  }

  if (!canonicalMap[shortcut]) {
    var key;
    var mods = {};

    // Separate modifiers from keys:
    shortcut.split('+').forEach(function(part){
      if (modifiers.indexOf(part) > -1) {
        mods[part] = true;

      } else {
        if (key) {
          throw new Error('Shortcut may contain only one non-modifier key.');
        }

        key = part;
      }
    });

    // Place modifiers in expected order up front:
    var keys = [];
    modifiers.forEach(function(mod){
      if (mods[mod]) {
        keys.push(mod);
      }
    });

    // Add keys after modifier if present:
    if (key) {
      keys.push(key);
    }

    // Join all keys into canonical format and cache:
    canonicalMap[shortcut] = keys.join('+');
  }

  return canonicalMap[shortcut];
};

module.exports = getCanonicalShortcut;
