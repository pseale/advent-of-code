﻿namespace Day10;

public static class Program
{
    private static void Main()
    {
        var input = File.ReadAllText("input.txt");

        var partA = SolvePartA(input);
        Console.WriteLine($"Total syntax error score: {partA}");
    }

    public static int SolvePartA(string input)
    {
        return -1;
    }
}