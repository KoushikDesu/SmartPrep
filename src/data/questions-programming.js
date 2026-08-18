/**
 * SmartPrep — Comprehensive C Programming & Technical Question Bank
 * Contains real code execution tracing, pointer arithmetic, structures, bitwise logic, and SQL questions.
 */

export const PROGRAMMING_QUESTIONS = {
  'c-control-instructions': [
    {
      question_number: 1,
      question_text: 'What is the output of the following C program?\n\n#include <stdio.h>\nint main() {\n    int i = 1;\n    while (i <= 5) {\n        printf("%d ", i);\n        if (i == 3) break;\n        i++;\n    }\n    return 0;\n}',
      option_a: '1 2 3 4 5',
      option_b: '1 2 3',
      option_c: '1 2',
      option_d: 'Infinite loop',
      correct_option: 'B',
      explanation: 'When i = 1, prints 1 and i becomes 2.\nWhen i = 2, prints 2 and i becomes 3.\nWhen i = 3, prints 3 and hits `break;` exiting the loop.\nOutput: 1 2 3'
    },
    {
      question_number: 2,
      question_text: 'What will be the output of the following code snippet?\n\nint a = 5, b = 10;\nif (a > 0 && b++ > 10)\n    printf("%d %d", a, b);\nelse\n    printf("%d %d", a, b);',
      option_a: '5 10',
      option_b: '5 11',
      option_c: 'Compilation Error',
      option_d: '6 11',
      correct_option: 'B',
      explanation: 'In `a > 0 && b++ > 10`:\n`a > 0` is true (5 > 0).\nSo `b++ > 10` is evaluated. Post-increment compares original b (10 > 10 is false), then increments b to 11.\nThe condition is false, so else block executes and prints `5 11`.'
    },
    {
      question_number: 3,
      question_text: 'Which of the following is true about a `do-while` loop in C?',
      option_a: 'The condition is tested before entering the loop body',
      option_b: 'The body of the loop is executed at least once regardless of the condition',
      option_c: 'It cannot contain a break statement',
      option_d: 'It is an entry-controlled loop',
      correct_option: 'B',
      explanation: '`do-while` is an exit-controlled loop. The statements inside the do block execute first before the while condition is checked, guaranteeing at least one execution.'
    },
    {
      question_number: 4,
      question_text: 'What is the output of the switch statement below?\n\nint x = 2;\nswitch(x) {\n    case 1: printf("One ");\n    case 2: printf("Two ");\n    case 3: printf("Three ");\n    default: printf("Default");\n}',
      option_a: 'Two',
      option_b: 'Two Three Default',
      option_c: 'Two Three',
      option_d: 'Default',
      correct_option: 'B',
      explanation: 'Since there are no `break;` statements, execution "falls through" from case 2 all the way to default: "Two Three Default".'
    },
    {
      question_number: 5,
      question_text: 'In C, what is the value of `for ( ; ; )` loop?',
      option_a: 'Syntax error',
      option_b: 'An infinite loop',
      option_c: 'Executes zero times',
      option_d: 'Executes once',
      correct_option: 'B',
      explanation: 'Omitting all three expressions in `for(;;)` creates a standard infinite loop in C.'
    }
  ],

  'c-functions': [
    {
      question_number: 1,
      question_text: 'What will be the output of the following recursive function for `func(4)`?\n\nint func(int n) {\n    if (n <= 1) return 1;\n    return n * func(n - 1);\n}',
      option_a: '10',
      option_b: '24',
      option_c: '12',
      option_d: '4',
      correct_option: 'B',
      explanation: 'This is the factorial function: 4 × 3 × 2 × 1 = 24.'
    },
    {
      question_number: 2,
      question_text: 'What is the default return type of a C function if none is explicitly specified (in older C89/C90 standard)?',
      option_a: 'void',
      option_b: 'int',
      option_c: 'char',
      option_d: 'float',
      correct_option: 'B',
      explanation: 'In C89/C90, functions with no return type defaulted to `int`.'
    },
    {
      question_number: 3,
      question_text: 'What happens when arguments are passed to a function by value in C?',
      option_a: 'Modifications inside the function alter the caller’s original variables',
      option_b: 'A copy of the argument is passed; the original variable in the caller remains unchanged',
      option_c: 'The variable’s memory address is overwritten',
      option_d: 'A pointer is automatically created',
      correct_option: 'B',
      explanation: 'In pass-by-value, the function receives a private copy of the argument values on its stack frame, leaving caller variables unaltered.'
    }
  ]
};
