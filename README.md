﻿# Advent of Code, 2015

Welcome! These are my solutions in C#, constructed in JetBrains Rider.

### Goals

- Become comfortable with JetBrains Rider, and harvest keybinds and settings once I'm comfortable
- Familiarize myself with C# 9.0 (.NET Core 5.0) - in practical terms, this means using records. I'm dubious on the value of the pattern matching syntactic sugar in C#, but in theory all that's on the table too.
- Familiarize myself with Advent of Code problems and get enough experience to be able to metaphorically 'hum along to the tune' - in practical terms, this means
  - Project structure
    - Favor 25 console apps, one per day.
    - Use one big test project with end-to-end tests that are (if feasible) direct copies of the example problems. Discussion about testing is discussed in "Thoughts" below.
  - Solve PartA and PartB--both at once--without necessarily trying to modify the existing PartA code. This approach allows for code reuse, but doesn't force it.

### Apologies

This is not an exhaustive list. I have many things of which to be sorrowful.

- Usually I'll make an inline apology comment, especially if I'm making a particularly intense (intensely unnecessary, and possibly harmful) abstraction. The best example so far is `Day06`'s `Do<T>(Func<T,T>)`. Just know that I won't subject a team to this kind of madness (unless instructed).
- I am not trying for efficiency. E.g. `Day05`'s `HasPairWithoutOverlapping()` - I'm aware that my implementation is VERY inefficient. If it works and is not slow enough to be noticeable by humans, I'll leave it alone.
- I'm enjoying writing unnecessary LINQ pipelines. I am neither extremely in favor of, nor extremely opposed to using LINQ over foreach/if. I can write the code either way--whichever you prefer. I'm not crazy! I can be precisely as crazy as desired. If you're crazy about LINQ--I can pretend to be as crazy as you! If you hate LINQ--I can also pretend to be that specific kind of crazy!

### Interesting, Sometimes Surprising, Thoughts

- I've been pleasantly surprised by how many times I actually (truly!) solved the problem on the first try, after compiling and passing the basic end-to-end tests.
- With that said, I have made many, many, many mistakes, and most of those mistakes were due to me misunderstanding the problem.
- I am exercising my 'problem solving with code' muscle, and it hurts.
- Up through day 07, I solved the problems without breaking down my end-to-end tests into smaller unit tests. In Kent Beck TDD terminology, I am going straight to Obvious Implementation, and I don't need any kind of Triangulation to break down the problems. As I encounter more difficult problems, as I did in Day 08, I assume I will need to rely more on unit tests (and Triangulation) to survive. I will admit that, for these simpler problems, in leiu of writing unit tests, I dig into what is happening via the debugger. And I have done this a few times. Purists will try to shame you for using a debugger, and I think they have good reasons, but in broad strokes they're wrong and I'm right and no one should be discouraged from debugging. A good debugging session is an okay approach to troubleshooting code, and yes unit tests are another approach to troubleshooting code, superior in many ways. I have and regularly do the unit test thing. But take it easy, unit testing crazies. Take it easy. Here's my take: for code that is not expected to change much in the future--just knock it out. Write your end-to-end tests as possible to cover the behavior (i.e. to be confident your code works, and to avoid regressions). But go ahead and skip _all_ the unit tests.
- I think I'm settling on the idea of substituting a REPL or a debugger (or a REPL in the Immediate Window, while the debugger is running) instead of writing microtests. I probably need to look into what's available nowadays REPL-wise.
- I have, at least temporarily, given up on writing my own algorithm implementations. E.g. for day 13, I needed a simple permutation implementation. First I wrote my own, then when it was buggy and also ugly to the eye, I went googling and popped in the `Permutate()` method from StackOverflow. I don't learn as much doing this, but that's okay--for now.
- Angry at math - Day 19 and Day 20

### Complaints about Rider

These are mostly small nitpicks:

- Window management is awkward. I've bound a keystroke to `Hide All Tool Windows`, but I think it should be easier? Update: I've set every window to `Dock Unpinned`, and this fixed some of my issues. Bigger problem discussed below.
- Ok: so if I use the `Run` dialog, and also when I run tests, I can't use `Esc` to **consistently** close the window. Looks like someone has reported the same basic problem: https://www.jetbrains.com/help/rider/Run_Tool_Window.html#context-menu-commands
- Rider fighting Rider in `.CSPROJ` files - create a New Project using Rider's wizard, which uses 4 space indentation, then run Cleanup, which changes the 4 to 2. Or is it the spacing of XML nodes? Whatever it is, it is tool-on-tool violence, and I'm just an innocent bystander.
- `CTRL-T, D` hotkey only works some of the time?
- I assume we're stuck with Rider's known (expected) behavior, but it sure seems that C# formatting is waging a war against itself. Most notable: Rider adds braces to an if statement, and then on cleanup, removes them. Yes, I guess I can customize Rider's braces behavior. Honestly this feels like an example of a larger issue--the default autocompletion via snippets seem inflexible. This is ... okay? ... but these are little cuts, and every little cut that makes Snippets a little bit painful makes me not want to use them. And again, I'd like to restate that if Rider gets autoformatting-on-save, I won't want or need snippets anymore.
- I know I'm in the Complaints section, but I must give Rider kudos for being fast. Kudos JetBrains, kudos.
