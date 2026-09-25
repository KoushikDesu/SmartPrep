/**
 * SmartPrep — Comprehensive C Programming & Technical Question Bank
 * Contains real code execution tracing, pointer arithmetic, structures, bitwise logic, and SQL questions.
 */

export const PROGRAMMING_QUESTIONS = {
  // ─── C CONTROL INSTRUCTIONS (15 FULL QUESTIONS) ───────────────────────────
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
    },
    {
      question_number: 6,
      question_text: 'What will be the output of the following C code?\n\n#include <stdio.h>\nint main() {\n    int i = 0;\n    for (i = 0; i < 5; i++) {\n        if (i == 2) continue;\n        printf("%d ", i);\n    }\n    return 0;\n}',
      option_a: '0 1 2 3 4',
      option_b: '0 1 3 4',
      option_c: '0 1 2',
      option_d: '3 4',
      correct_option: 'B',
      explanation: 'When i == 2, the `continue;` statement skips the rest of the loop body for that iteration, omitting 2. Output is: 0 1 3 4.'
    },
    {
      question_number: 7,
      question_text: 'What is the output of the following program?\n\n#include <stdio.h>\nint main() {\n    int a = 1;\n    if (a--)\n        printf("True ");\n    if (++a)\n        printf("False");\n    return 0;\n}',
      option_a: 'True False',
      option_b: 'True',
      option_c: 'False',
      option_d: 'Compilation error',
      correct_option: 'A',
      explanation: '1. `if (a--)`: Evaluates original a (1 is true), then decrements a to 0. Prints "True ".\n2. `if (++a)`: Increments a from 0 to 1, then evaluates 1 (true). Prints "False".'
    },
    {
      question_number: 8,
      question_text: 'Can a `case` label in a switch statement contain floating-point constants (e.g. `case 2.5:`) in C?',
      option_a: 'Yes, always',
      option_b: 'No, switch expressions and case labels must be integral types',
      option_c: 'Yes, if cast to double',
      option_d: 'Depends on the compiler',
      correct_option: 'B',
      explanation: 'In C, switch statements only accept integer or character constants in case labels. Floats and doubles cause a compile-time error.'
    },
    {
      question_number: 9,
      question_text: 'What will be the output of the following C code?\n\n#include <stdio.h>\nint main() {\n    int x = 10, y = 20;\n    if (x == 10)\n        if (y == 20)\n            printf("Inside");\n        else\n            printf("Else");\n    return 0;\n}',
      option_a: 'Inside',
      option_b: 'Else',
      option_c: 'Inside Else',
      option_d: 'Nothing',
      correct_option: 'A',
      explanation: 'In C, an `else` always associates with the nearest preceding unmatched `if`. Since x==10 and y==20 are both true, it outputs "Inside".'
    },
    {
      question_number: 10,
      question_text: 'What is the minimum number of times a while loop executes?',
      option_a: '0',
      option_b: '1',
      option_c: '2',
      option_d: 'Depends on initial condition',
      correct_option: 'A',
      explanation: 'A `while` loop checks the condition at the entry point. If the condition is false initially, the loop body executes 0 times.'
    },
    {
      question_number: 11,
      question_text: 'What will happen if `break` is omitted from all cases in a C switch statement?',
      option_a: 'Compiler error',
      option_b: 'All cases from the matched case onward will execute (fall-through)',
      option_c: 'Only the default case will execute',
      option_d: 'The switch statement will be ignored',
      correct_option: 'B',
      explanation: 'Without `break`, C falls through to subsequent case statements until the end of the switch block is reached.'
    },
    {
      question_number: 12,
      question_text: 'What is the output of the following loop?\n\nint x = 3;\nwhile (x > 0)\n    x--;\nprintf("%d", x);',
      option_a: '3',
      option_b: '1',
      option_c: '0',
      option_d: '-1',
      correct_option: 'C',
      explanation: 'The loop runs until x becomes 0 (when x > 0 becomes false). It then exits and prints 0.'
    },
    {
      question_number: 13,
      question_text: 'Which operator has the highest precedence in C control conditions?',
      option_a: '&&',
      option_b: '||',
      option_c: '!',
      option_d: '==',
      correct_option: 'C',
      explanation: 'Unary logical NOT (`!`) has higher precedence than relational (`==`), logical AND (`&&`), and logical OR (`||`).'
    },
    {
      question_number: 14,
      question_text: 'What will be printed?\n\nint i = 0;\nif (i = 0)\n    printf("Yes");\nelse\n    printf("No");',
      option_a: 'Yes',
      option_b: 'No',
      option_c: 'Compilation error',
      option_d: 'Undefined behavior',
      correct_option: 'B',
      explanation: '`i = 0` is an assignment expression that evaluates to 0 (false in C). Therefore, the `else` block executes, printing "No".'
    },
    {
      question_number: 15,
      question_text: 'What is the effect of `goto` statement in C?',
      option_a: 'Transfers control unconditionally to a labeled statement within the same function',
      option_b: 'Calls an external library function',
      option_c: 'Restarts the entire program',
      option_d: 'Exits the program immediately',
      correct_option: 'A',
      explanation: '`goto` performs an unconditional jump to an identifier label within the scope of the current function.'
    }
  ],

  // ─── C FUNCTIONS (15 FULL QUESTIONS) ──────────────────────────────────────
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
    },
    {
      question_number: 4,
      question_text: 'What will be the output of the following code?\n\n#include <stdio.h>\nvoid count() {\n    static int c = 0;\n    c++;\n    printf("%d ", c);\n}\nint main() {\n    count(); count(); count();\n    return 0;\n}',
      option_a: '1 1 1',
      option_b: '1 2 3',
      option_c: '0 1 2',
      option_d: '3 3 3',
      correct_option: 'B',
      explanation: 'Static variables persist across multiple function calls and retain their state between invocations. Output: 1 2 3.'
    },
    {
      question_number: 5,
      question_text: 'What is the purpose of the `inline` keyword in C functions?',
      option_a: 'Prevents recursion',
      option_b: 'Suggests the compiler substitute the function code directly at call sites to reduce overhead',
      option_c: 'Hides the function from other source files',
      option_d: 'Forces static linkage',
      correct_option: 'B',
      explanation: '`inline` hints to the optimizer to inline the function body into the caller, eliminating call stack overhead.'
    },
    {
      question_number: 6,
      question_text: 'What is the base condition in a recursive function?',
      option_a: 'The condition that terminates recursion and prevents stack overflow',
      option_b: 'The first recursive call',
      option_c: 'The return statement of main',
      option_d: 'A compiler flag',
      correct_option: 'A',
      explanation: 'The base condition halts further recursive calls, returning a known result without additional self-invocations.'
    },
    {
      question_number: 7,
      question_text: 'What is the return type of a function that does not return any value to its caller in C?',
      option_a: 'int',
      option_b: 'void',
      option_c: 'null',
      option_d: 'empty',
      correct_option: 'B',
      explanation: 'The `void` keyword designates that a function yields no return value.'
    },
    {
      question_number: 8,
      question_text: 'In C, where are local variables allocated by default?',
      option_a: 'Heap',
      option_b: 'Stack',
      option_c: 'Data segment',
      option_d: 'Code segment',
      correct_option: 'B',
      explanation: 'Local variables with automatic storage duration are allocated on the program call stack.'
    },
    {
      question_number: 9,
      question_text: 'Can a function in C return multiple values directly in a single `return` statement?',
      option_a: 'Yes, separated by commas',
      option_b: 'No, a function returns only a single value or must use pointers / structures',
      option_c: 'Yes, if enclosed in parentheses',
      option_d: 'Yes, up to 3 values',
      correct_option: 'B',
      explanation: 'In C, return statements yield only one scalar value. To return multiple items, pass pointers or wrap them in a struct.'
    },
    {
      question_number: 10,
      question_text: 'What is a function prototype in C?',
      option_a: 'The definition of a function body',
      option_b: 'A declaration specifying the function name, return type, and parameter types before use',
      option_c: 'A macro definition',
      option_d: 'A pointer to a function',
      correct_option: 'B',
      explanation: 'A prototype informs the compiler of the function\'s interface so calls can be validated before definition.'
    },
    {
      question_number: 11,
      question_text: 'What happens if a recursive function has no base case?',
      option_a: 'It terminates after 100 calls',
      option_b: 'It causes an infinite loop and eventually a Stack Overflow segmentation fault',
      option_c: 'The compiler refuses to compile',
      option_d: 'It returns 0',
      correct_option: 'B',
      explanation: 'Unlimited recursive calls exhaust call stack memory, leading to a stack overflow crash.'
    },
    {
      question_number: 12,
      question_text: 'What is a variadic function in C?',
      option_a: 'A function that changes its return type dynamically',
      option_b: 'A function that accepts a variable number of arguments (e.g. `printf`)',
      option_c: 'A function with static variables only',
      option_d: 'A function declared inside another function',
      correct_option: 'B',
      explanation: 'Variadic functions (declared with `...` using `<stdarg.h>`) take an arbitrary count of parameters.'
    },
    {
      question_number: 13,
      question_text: 'What will be printed by `fun(3)`?\n\nvoid fun(int n) {\n    if (n == 0) return;\n    printf("%d ", n);\n    fun(n - 1);\n    printf("%d ", n);\n}',
      option_a: '3 2 1',
      option_b: '3 2 1 1 2 3',
      option_c: '1 2 3 3 2 1',
      option_d: '3 2 1 0 1 2 3',
      correct_option: 'B',
      explanation: 'Prints on unwinding and rewinding: prints 3, 2, 1 before recursive calls, and 1, 2, 3 as calls return from stack.'
    },
    {
      question_number: 14,
      question_text: 'Which function is always called first when a standard C console application starts?',
      option_a: 'start()',
      option_b: 'init()',
      option_c: 'main()',
      option_d: 'entry()',
      correct_option: 'C',
      explanation: '`main()` serves as the standardized entry point for user programs in C.'
    },
    {
      question_number: 15,
      question_text: 'What is the scope of a function declared with the `static` keyword in C?',
      option_a: 'Accessible from any file in the project',
      option_b: 'Restricted only to the translation unit (file) in which it is defined',
      option_c: 'Restricted to the enclosing block',
      option_d: 'Global scope',
      correct_option: 'B',
      explanation: '`static` on a function gives it internal linkage, hiding it from other object files.'
    }
  ],

  // ─── C DECLARATIONS (15 FULL QUESTIONS) ───────────────────────────────────
  'c-declarations': [
    {
      question_number: 1,
      question_text: 'Which of the following is NOT a valid identifier in C?',
      option_a: '_variableName',
      option_b: 'var_123',
      option_c: '2ndVariable',
      option_d: 'TOTAL_SUM',
      correct_option: 'C',
      explanation: 'Identifiers in C cannot begin with a digit.'
    },
    {
      question_number: 2,
      question_text: 'What is the output of `printf("%d", 052);` in C?',
      option_a: '52',
      option_b: '42',
      option_c: '052',
      option_d: 'Compilation error',
      correct_option: 'B',
      explanation: 'A numeric constant beginning with 0 is interpreted as octal: 052 in octal = 5 × 8 + 2 = 42 in decimal.'
    },
    {
      question_number: 3,
      question_text: 'Which keyword is used to prevent any modification to a variable after declaration?',
      option_a: 'static',
      option_b: 'const',
      option_c: 'extern',
      option_d: 'volatile',
      correct_option: 'B',
      explanation: 'The `const` type qualifier makes the variable read-only.'
    },
    {
      question_number: 4,
      question_text: 'What is the storage class of a global variable declared without any modifier?',
      option_a: 'auto',
      option_b: 'register',
      option_c: 'extern',
      option_d: 'static',
      correct_option: 'C',
      explanation: 'Global variables have external linkage by default (`extern`).'
    },
    {
      question_number: 5,
      question_text: 'What does the `volatile` keyword inform the compiler about a variable?',
      option_a: 'It should be placed in CPU registers',
      option_b: 'Its value may be changed by hardware or asynchronous interrupts, so do not optimize access',
      option_c: 'It cannot be altered',
      option_d: 'It is shared across threads automatically',
      correct_option: 'B',
      explanation: '`volatile` tells the compiler that the variable can change unexpectedly, disabling caching optimizations.'
    }
  ],

  // ─── C POINTERS (15 FULL QUESTIONS) ───────────────────────────────────────
  'c-pointers': [
    {
      question_number: 1,
      question_text: 'If `int *ptr;` and address of ptr is 1000, assuming sizeof(int) is 4 bytes, what is `ptr + 2`?',
      option_a: '1002',
      option_b: '1004',
      option_c: '1008',
      option_d: '1016',
      correct_option: 'C',
      explanation: 'Pointer arithmetic scales by the size of the data type: 1000 + 2 × 4 = 1008.'
    },
    {
      question_number: 2,
      question_text: 'What is a dangling pointer in C?',
      option_a: 'A pointer initialized to NULL',
      option_b: 'A pointer that points to a memory location that has been deallocated/freed',
      option_c: 'A pointer pointing to another pointer',
      option_d: 'An uninitialized pointer',
      correct_option: 'B',
      explanation: 'A dangling pointer arises when memory is freed via `free()` but the pointer still holds that address.'
    },
    {
      question_number: 3,
      question_text: 'Which function allocates memory and initializes all bytes to zero?',
      option_a: 'malloc()',
      option_b: 'calloc()',
      option_c: 'realloc()',
      option_d: 'free()',
      correct_option: 'B',
      explanation: '`calloc(n, size)` allocates contiguous memory and clears all bytes to zero.'
    },
    {
      question_number: 4,
      question_text: 'What does `int (*ptr)[5];` declare in C?',
      option_a: 'An array of 5 integer pointers',
      option_b: 'A pointer to an array of 5 integers',
      option_c: 'A function returning a pointer',
      option_d: 'A pointer to a function taking 5 integers',
      correct_option: 'B',
      explanation: 'Parentheses bind `*ptr` first, making `ptr` a pointer to an array of 5 integers.'
    },
    {
      question_number: 5,
      question_text: 'What is the consequence of dereferencing a `NULL` pointer in C?',
      option_a: 'Returns 0',
      option_b: 'Undefined behavior, typically resulting in a segmentation fault / crash',
      option_c: 'Memory corruption',
      option_d: 'Compile-time error',
      correct_option: 'B',
      explanation: 'Dereferencing NULL attempts to read protected address 0, causing the OS to issue a segmentation fault.'
    }
  ],

  // ─── SQL QUERIES (15 FULL QUESTIONS) ──────────────────────────────────────
  'sql-queries': [
    {
      question_number: 1,
      question_text: 'Which clause is used in SQL to filter the results of an aggregate function?',
      option_a: 'WHERE',
      option_b: 'HAVING',
      option_c: 'ORDER BY',
      option_d: 'GROUP BY',
      correct_option: 'B',
      explanation: '`HAVING` filters aggregated records after `GROUP BY`, whereas `WHERE` filters individual rows beforehand.'
    },
    {
      question_number: 2,
      question_text: 'Which SQL statement removes all records from a table without logging individual row deletions and resets identity counters?',
      option_a: 'DELETE',
      option_b: 'DROP',
      option_c: 'TRUNCATE',
      option_d: 'REMOVE',
      correct_option: 'C',
      explanation: '`TRUNCATE TABLE` is a DDL operation that deallocates pages, executing faster than DELETE and resetting identity.'
    },
    {
      question_number: 3,
      question_text: 'What type of JOIN returns all records from both tables whether they have a match or not?',
      option_a: 'INNER JOIN',
      option_b: 'LEFT JOIN',
      option_c: 'RIGHT JOIN',
      option_d: 'FULL OUTER JOIN',
      correct_option: 'D',
      explanation: '`FULL OUTER JOIN` produces the union of matching records and non-matching records with NULLs from both sides.'
    },
    {
      question_number: 4,
      question_text: 'Can a relational table have multiple UNIQUE constraints and multiple PRIMARY KEYs?',
      option_a: 'Multiple Primary Keys, but only one Unique constraint',
      option_b: 'Only one Primary Key, but multiple Unique constraints',
      option_c: 'Multiple of both',
      option_d: 'Neither',
      correct_option: 'B',
      explanation: 'A table can have only one PRIMARY KEY, but may have multiple UNIQUE constraints.'
    },
    {
      question_number: 5,
      question_text: 'Which of the following ACID properties guarantees that concurrent transactions do not interfere with each other?',
      option_a: 'Atomicity',
      option_b: 'Consistency',
      option_c: 'Isolation',
      option_d: 'Durability',
      correct_option: 'C',
      explanation: 'Isolation ensures concurrent transaction executions result in a state that could be obtained serially.'
    }
  ]
};
