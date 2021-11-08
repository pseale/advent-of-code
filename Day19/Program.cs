﻿using System;
using System.IO;

namespace Day19
{
    public static class Program
    {
        static void Main(string[] args)
        {
            var input = File.ReadAllText("input.txt");

            var partA = SolvePartA(input);
            Console.WriteLine($"Distinct molecules: {partA}");
        }

        public static int SolvePartA(string input)
        {
            return -1;
        }
    }
}