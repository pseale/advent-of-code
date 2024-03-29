﻿using System;
using System.IO;
using System.Linq;

namespace Day05
{
    public static class Program
    {
        private static readonly char[] Vowels = {'a', 'e', 'i', 'o', 'u'};

        private static void Main(string[] args)
        {
            var input = File.ReadAllText("input.txt");
            var partA = SolvePartA(input);
            Console.WriteLine($"Nice strings (legacy model): {partA}");

            var partB = SolvePartB(input);
            Console.WriteLine($"Nice strings (better model): {partB}");
        }

        public static int SolvePartA(string input)
        {
            var lines = Parse(input);

            // ReSharper disable once ReplaceWithSingleCallToCount
            return lines.Where(x => HasThreeVowels(x))
                .Where(x => LetterAppearsTwiceInARow(x))
                .Where(x => !HasForbiddenStrings(x))
                .Count();
        }

        private static bool HasThreeVowels(string @string)
        {
            // ReSharper disable once ReplaceWithSingleCallToCount
            return @string.ToCharArray().Where(c => Vowels.Contains(c)).Count() >= 3;
        }

        private static bool LetterAppearsTwiceInARow(string @string)
        {
            for (var i = 0; i < @string.Length - 1; i++)
                if (@string[i] == @string[i + 1])
                    return true;

            return false;
        }

        private static bool HasForbiddenStrings(string @string)
        {
            if (@string.Contains("ab")) return true;
            if (@string.Contains("cd")) return true;
            if (@string.Contains("pq")) return true;
            if (@string.Contains("xy")) return true;

            return false;
        }

        public static int SolvePartB(string input)
        {
            var lines = Parse(input);

            // ReSharper disable once ReplaceWithSingleCallToCount
            return lines.Where(x => HasPairWithoutOverlapping(x))
                .Where(x => HasLetterSandwich(x))
                .Count();
        }

        // I am aware this is inefficient
        private static bool HasPairWithoutOverlapping(string @string)
        {
            for (var i = 0; i < @string.Length - 1; i++)
            {
                var pair = @string.Substring(i, 2);
                var remaining = @string.Substring(i + 2);
                if (remaining.Contains(pair))
                    return true;
            }

            return false;
        }

        private static bool HasLetterSandwich(string @string)
        {
            for (var i = 0; i < @string.Length - 2; i++)
            {
                var bread1 = @string[i];
                // filling can be any letter
                var bread2 = @string[i + 2];

                if (bread1 == bread2)
                    return true;
            }

            return false;
        }

        private static string[] Parse(string input)
        {
            var lines = input
                .Split("\n")
                .Select(x => x.Trim())
                .Where(x => !string.IsNullOrWhiteSpace(x))
                .ToArray();
            return lines;
        }
    }
}