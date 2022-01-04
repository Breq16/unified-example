---
title: My Awesome Markdown
---

# Hello, World!

This is a Markdown document. It's a good test for our pipeline. I hope I
~~spellled~~ everything right. If someone finds a spelling **error**, she
should let me [know](mailto:breq@breq.dev).

- This is a list item
- This is another list item

1. This is a numbered list item
1. This is another numbered list item

## Tables

| $x$ | $x^2$ |
| --- | ----- |
| 1   | 1     |
| 2   | 4     |
| 3   | 9     |

## Formulas

$$
x! = \begin{cases}
  x = 0: & 1 \\
  x > 0: & x (x - 1)! \\
\end{cases}
$$

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

## Code

```python
def bisect(f, a, b):
  c = (a + b) / 2
  if f(c) == 0:
    return c
  elif f(a) * f(c) < 0:
    return bisect(f, a, c)
  else:
    return bisect(f, c, b)
```

```jsx
export default function Home() {
  return <span>Hello, world!</span>;
}
```

## Music

```abc
X: 1
T: Nokia Tune
M: 3/4
L: 1/8
K: Amaj
| e'd' f2 g2 | c'b d2 e2 | ba c2 e2 | a6 |
```
