# Weirdness

These are things I haven't really figured out yet, but would like to look into at some point:

## useState not storing the expected value

For some reason, when you use a `useState` hook, the setter portion doesn't work
if you use the destructured value, but does work if you use the closure syntax.

So this works:

```
const [clicked, setClicked] = useState(false);
const handleClick = () => {
  setClicked((previous) => !previous)
}
```

...but this doesn't

```
const [clicked, setClicked] = useState(false);
const handleClick = () => {
  setClicked(!clicked)
}
```

In the latter example, `clicked` will always be `false`.
