﻿using System;
using System.Collections.Generic;

namespace Day10
{
    public static class Program
    {
        static void Main(string[] args)
        {
            var input = "1113222113";

            var partA = SolvePartA(input, 40);
            Console.WriteLine($"Length of the (very long) look-and-say result: {partA.Length}");
        }

        public static string SolvePartA(string input, int iterations)
        {
            string digits = input;

            for (int i = 0; i < iterations; i++)
                digits = LookAndSay(digits);

            return digits;
        }

        private static string LookAndSay(string input)
        {
            var digits = input.ToCharArray();
            var lookAndSay = new List<char>();

            int index = 0;
            while (index < digits.Length)
            {
                var runOfDigits = GetRunOfDigits(digits, index);

                lookAndSay.Add(ConvertDigitToChar(runOfDigits));
                lookAndSay.Add(digits[index]);

                index += runOfDigits;
            }

            return new string(lookAndSay.ToArray());
        }

        private static int GetRunOfDigits(char[] digits, int startingIndex)
        {
            int index = startingIndex + 1;
            int run = 1;

            while (index < digits.Length)
            {
                if (digits[index] == digits[startingIndex])
                {
                    run++;
                    index++;
                }
                else
                {
                    return run;
                }
            }

            return run;
        }

        private static char ConvertDigitToChar(int digit)
        {
            if (digit <= 0) throw new Exception($"Invalid digit: {digit}");
            if (digit > 9) throw new Exception($"Didn't expect digit this large: {digit}");

            return (char) (digit + (int) '0');

        }
    }
}