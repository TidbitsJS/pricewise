#

**Cannot find module 'next/image'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?ts(2792)**

If you see this error after the installation, go to the tsconfig.json and change the setting:

```javascript
// From
"moduleResolution": "bundler",

// To
"moduleResolution": "Node",
```

#
