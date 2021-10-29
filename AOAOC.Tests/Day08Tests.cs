﻿using Day08;
using NUnit.Framework;

namespace AOAOC.Tests
{
    [TestFixture]
    public class Day08Tests
    {
        [Test]
        public void PartA()
        {
            Assert.AreEqual(2 - 0, Program.SolvePartA(Quote("")));
            Assert.AreEqual(5 - 3, Program.SolvePartA(Quote("abc")));
            Assert.AreEqual(10 - 7, Program.SolvePartA(Quote("aaa\\\"aaa"))); // aaa\"aaa
            Assert.AreEqual(6 - 1, Program.SolvePartA(Quote("\\x27"))); // \x27
        }

        [Test]
        public void PartB()
        {
            Assert.AreEqual(6 - 2, Program.SolvePartB(Quote("")));
            Assert.AreEqual(9 - 5, Program.SolvePartB(Quote("abc")));
            Assert.AreEqual(16 - 10, Program.SolvePartB(Quote("aaa\\\"aaa"))); // aaa\"aaa
            Assert.AreEqual(11 - 6, Program.SolvePartB(Quote("\\x27"))); // \x27
        }

        private string Quote(string s)
        {
            return '"' + s + '"';
        }
    }
}