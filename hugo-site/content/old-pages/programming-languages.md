---
title: Programming Languages I've Made
url: "/programming-languages"
summary: A tour of the coolest things I've ever done
weight: 3
---

# C Major

This ambitious project is forever a work-in-progress; I work on it in bits and pieces every now and then.

When complete, the goal of this language is to be a "layer" on top of C, as transparent as possible (C Major code should compile to very similar C code), while still providing lots of extra power in the forms of a stronger type system, access to discriminated unions, etc. This description is not accurate as to its current state, however, as it's still in early prototyping.

The compiler itself is being written in Haskell, and makes generous use of the Megaparsec parser combinator library.

Here's some code that doesn't yet fully compile, but demonstrates the short-term goals of the language quite well:

```
@entry(main)

func fibonacci(n: int) -> int
do {
  var iter := func(a: int, b: int, n: int) -> int
              do if n == 0
                 then a
                 else iter(b, a, n - 1);
  iter(0, 1, n)
}

func main() -> nothing
do {
  print fibonacci(10);
}
```
