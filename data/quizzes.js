export const quizzes = {
  'oop-fundamentals': [
    {
      q: 'Which of the following best describes a Java class?',
      options: ['A running instance in memory', 'A blueprint that defines state and behaviour', 'A primitive data type', 'A method that returns an object'],
      answer: 1,
      explanation: 'A class is a blueprint. Objects are the running instances created from that blueprint.',
    },
    {
      q: 'What is the result of calling `new` on a class?',
      options: ['A static reference', 'A copy of the class file', 'A new object instance on the heap', 'A method invocation'],
      answer: 2,
      explanation: '`new` allocates memory on the heap and returns a reference to the new object instance.',
    },
    {
      q: 'Which OOP principle hides internal state and exposes only necessary behaviour?',
      options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
      answer: 2,
      explanation: 'Encapsulation hides internal fields and exposes controlled access via methods.',
    },
    {
      q: 'What does `this` refer to inside an instance method?',
      options: ['The class itself', 'The current object instance', 'The superclass', 'The return type'],
      answer: 1,
      explanation: '`this` is a reference to the current object on which the method was called.',
    },
    {
      q: 'Which statement about objects and references is correct?',
      options: ['A reference holds the object data directly', 'Multiple references can point to the same object', 'Each reference creates a new object copy', 'References are stored on the heap'],
      answer: 1,
      explanation: 'References are pointers. Assigning one reference to another makes both point to the same object — no copy is made.',
    },
  ],

  'data-types': [
    {
      q: 'What is the default value of an `int` field in a Java class?',
      options: ['null', '-1', '0', 'undefined'],
      answer: 2,
      explanation: 'Numeric fields default to 0. boolean defaults to false. Object references default to null.',
    },
    {
      q: 'Which primitive type stores a single Unicode character?',
      options: ['byte', 'short', 'char', 'String'],
      answer: 2,
      explanation: '`char` is a 16-bit unsigned type that stores a single Unicode character.',
    },
    {
      q: 'What happens during autoboxing?',
      options: ['A primitive is cast to a larger type', 'A primitive is automatically wrapped in its wrapper class', 'A wrapper object is unpacked to a primitive', 'An int is converted to a String'],
      answer: 1,
      explanation: 'Autoboxing converts e.g. `int` → `Integer` automatically when the context requires an object.',
    },
    {
      q: 'Which of the following is a reference type, not a primitive?',
      options: ['int', 'double', 'boolean', 'Integer'],
      answer: 3,
      explanation: '`Integer` is the wrapper class. The other three are primitive types.',
    },
    {
      q: 'What is the size of a `long` in Java?',
      options: ['16 bits', '32 bits', '64 bits', '128 bits'],
      answer: 2,
      explanation: '`long` is a 64-bit signed integer. `int` is 32-bit.',
    },
  ],

  'strings': [
    {
      q: 'Why is String immutable in Java?',
      options: ['JVM requires it for serialisation', 'To allow safe sharing, caching, and thread safety', 'To save heap memory', 'Because String extends Object'],
      answer: 1,
      explanation: 'Immutability allows Strings to be safely shared across threads, cached in the String pool, and used as reliable HashMap keys.',
    },
    {
      q: 'What does the String Constant Pool do?',
      options: ['Allocates every String on the stack', 'Stores all char arrays', 'Reuses identical string literals to save memory', 'Prevents garbage collection of strings'],
      answer: 2,
      explanation: 'The pool caches string literals so that identical values share the same object rather than creating duplicates.',
    },
    {
      q: 'Which class should you use for frequent string concatenation in a single thread?',
      options: ['String', 'StringBuffer', 'StringBuilder', 'CharSequence'],
      answer: 2,
      explanation: 'StringBuilder is not thread-safe but is faster than StringBuffer for single-threaded concatenation.',
    },
    {
      q: 'What does `str.intern()` do?',
      options: ['Converts str to a char array', 'Returns the pool reference for the string value', 'Makes the string immutable', 'Clears the string pool'],
      answer: 1,
      explanation: '`intern()` adds the string to the pool (if absent) and returns the canonical pool reference.',
    },
    {
      q: 'Which comparison is correct to check String content equality?',
      options: ['str1 == str2', 'str1.equals(str2)', 'str1.hashCode() == str2.hashCode()', 'str1.compareTo(str2) == true'],
      answer: 1,
      explanation: '`==` compares references. `equals()` compares character-by-character content — always use it for value comparison.',
    },
  ],

  'keywords-immutability': [
    {
      q: 'What does the `final` keyword do when applied to a variable?',
      options: ['Makes the object immutable', 'Prevents the variable from being reassigned', 'Makes the method unoverridable', 'Marks the class as abstract'],
      answer: 1,
      explanation: '`final` on a variable prevents reassignment of the reference. The object itself can still be mutated unless it is also designed to be immutable.',
    },
    {
      q: 'What does `static` mean on a field?',
      options: ['The field belongs to each instance', 'The field cannot be changed', 'The field is shared across all instances of the class', 'The field is private'],
      answer: 2,
      explanation: 'A `static` field belongs to the class, not to any individual instance — all instances share the same value.',
    },
    {
      q: 'What does `volatile` guarantee?',
      options: ['Mutual exclusion on a block of code', 'That writes to the variable are immediately visible to all threads', 'That the variable is thread-local', 'That the variable is never cached'],
      answer: 1,
      explanation: '`volatile` guarantees visibility across threads and prevents instruction reordering for that variable, but does not guarantee atomicity.',
    },
    {
      q: 'To create a truly immutable class, which conditions must hold?',
      options: ['Mark all methods final', 'Mark the class final, all fields private final, and return copies of mutable objects', 'Use static fields only', 'Implement Serializable'],
      answer: 1,
      explanation: 'True immutability requires: final class (no subclassing), private final fields, no setters, and defensive copies for mutable field types.',
    },
    {
      q: 'What does `transient` do?',
      options: ['Prevents a field from being serialised', 'Makes a field thread-safe', 'Marks a field as nullable', 'Initialises a field to null'],
      answer: 0,
      explanation: '`transient` tells Java serialisation to skip the field — useful for passwords, caches, or non-serialisable objects.',
    },
  ],

  'access-modifiers': [
    {
      q: 'Which access modifier makes a member visible only within its own class?',
      options: ['public', 'protected', 'package-private (default)', 'private'],
      answer: 3,
      explanation: '`private` restricts access to the declaring class only.',
    },
    {
      q: 'Which modifier allows access from subclasses in a different package?',
      options: ['private', 'public', 'protected', 'package-private'],
      answer: 2,
      explanation: '`protected` is accessible within the same package AND by subclasses, even in different packages.',
    },
    {
      q: 'What is "package-private" visibility in Java?',
      options: ['Explicitly written with the keyword `package`', 'The default when no modifier is specified', 'Same as protected', 'Accessible across all packages'],
      answer: 1,
      explanation: 'No modifier = package-private. Only classes in the same package can access the member.',
    },
    {
      q: 'Why is encapsulation important for fields?',
      options: ['It makes fields faster', 'It forces all fields to be public', 'It lets the class control and validate changes to its state', 'It prevents the field from being garbage collected'],
      answer: 2,
      explanation: 'Private fields with public getters/setters let you validate input, enforce invariants, and change the internal implementation without breaking callers.',
    },
    {
      q: 'Can a `private` method be overridden?',
      options: ['Yes, in any subclass', 'Yes, but only in the same package', 'No — private methods are not visible to subclasses', 'Only if the subclass uses the same name'],
      answer: 2,
      explanation: 'Private methods are not inherited, so they cannot be overridden. A subclass defining a method with the same name is simply a new method.',
    },
  ],

  'constructors': [
    {
      q: 'What is a constructor\'s return type in Java?',
      options: ['void', 'The class type', 'Object', 'Constructors have no return type'],
      answer: 3,
      explanation: 'Constructors have no declared return type — not even void. They initialise the new object and return it implicitly.',
    },
    {
      q: 'What happens if you define no constructor in a class?',
      options: ['Compilation fails', 'The class cannot be instantiated', 'Java provides a default no-arg constructor automatically', 'All fields default to null'],
      answer: 2,
      explanation: 'If no constructor is defined, the compiler inserts a default no-arg constructor that calls `super()`.',
    },
    {
      q: 'What is constructor chaining with `this(...)`?',
      options: ['Calling a method on the current object', 'Calling another constructor in the same class', 'Calling the superclass constructor', 'Overloading the constructor'],
      answer: 1,
      explanation: '`this(...)` invokes another constructor in the same class and must be the first statement in the constructor body.',
    },
    {
      q: 'Once you define a constructor with parameters, what happens to the default no-arg constructor?',
      options: ['It remains available', 'The compiler still generates it', 'It is no longer provided automatically', 'It becomes private'],
      answer: 2,
      explanation: 'Once you define any constructor, the compiler stops generating the default no-arg one. You must add it explicitly if needed.',
    },
    {
      q: 'Which keyword calls the parent class constructor from a subclass?',
      options: ['this()', 'parent()', 'super()', 'base()'],
      answer: 2,
      explanation: '`super(...)` calls the superclass constructor and must be the first statement. If omitted, the compiler inserts `super()` implicitly.',
    },
  ],

  'this-super': [
    {
      q: 'What does `super.methodName()` do?',
      options: ['Calls the current class method', 'Calls the overridden method from the parent class', 'Creates a new parent object', 'Accesses a static parent method'],
      answer: 1,
      explanation: '`super.method()` invokes the parent class\'s version of the method, bypassing the overridden version in the current class.',
    },
    {
      q: 'When must `super()` appear in a constructor?',
      options: ['Anywhere in the body', 'As the last statement', 'As the first statement', 'Only in abstract classes'],
      answer: 2,
      explanation: '`super()` must be the very first statement so that the parent is fully initialised before the child constructor runs.',
    },
    {
      q: 'Can you use both `this()` and `super()` in the same constructor?',
      options: ['Yes, in any order', 'Yes, but super must come first', 'No — only one can be the first statement', 'Yes, but only in abstract classes'],
      answer: 2,
      explanation: 'Both must be the first statement — so only one can exist per constructor. Using both would be a compilation error.',
    },
    {
      q: 'What is `this` used for inside a constructor to resolve name conflicts?',
      options: ['Referring to the class itself', 'Distinguishing a field from a local parameter with the same name', 'Calling parent methods', 'Returning from the constructor'],
      answer: 1,
      explanation: '`this.name = name` disambiguates the field `this.name` from the constructor parameter `name` when they share the same identifier.',
    },
    {
      q: 'Can `super` access private members of the parent class?',
      options: ['Yes, always', 'Only if the subclass is in the same package', 'No — private members are not visible to subclasses', 'Only via super()'],
      answer: 2,
      explanation: 'Private members are not inherited and cannot be accessed via `super`. Use protected or package-private if subclass access is needed.',
    },
  ],

  'method-calls-memory': [
    {
      q: 'Where are local variables and method frames stored?',
      options: ['Heap', 'Stack', 'Method Area', 'Native Memory'],
      answer: 1,
      explanation: 'Each method call creates a stack frame on the thread\'s call stack, storing local variables and the return address.',
    },
    {
      q: 'Where are objects allocated in Java?',
      options: ['Stack', 'Stack or Heap depending on size', 'Heap', 'Method Area'],
      answer: 2,
      explanation: 'Objects are always allocated on the heap and survive beyond the method that created them.',
    },
    {
      q: 'What does it mean that Java is "pass-by-value"?',
      options: ['Primitives are copied; objects are passed by reference', 'A copy of the value (or reference) is passed, not the original variable', 'Objects can be mutated via the parameter', 'Primitives cannot be passed to methods'],
      answer: 1,
      explanation: 'Java copies the value of the variable: for primitives this is the data, for objects this is the reference (address). The caller\'s variable itself is never changed.',
    },
    {
      q: 'What triggers a StackOverflowError?',
      options: ['Too many objects on the heap', 'A method calling itself infinitely deep', 'Running out of CPU threads', 'A null pointer dereference'],
      answer: 1,
      explanation: 'Each call pushes a new frame onto the call stack. Unbounded recursion exhausts the stack space and throws StackOverflowError.',
    },
    {
      q: 'What happens to a stack frame when a method returns?',
      options: ['It is moved to the heap', 'It is garbage collected', 'It is popped off the stack', 'It is saved for later reuse'],
      answer: 2,
      explanation: 'When a method returns, its frame is popped, releasing its local variables from the stack.',
    },
  ],

  'static-concepts': [
    {
      q: 'When is a `static` block executed?',
      options: ['Each time an instance is created', 'Once when the class is first loaded by the JVM', 'On every method call', 'Only when explicitly called'],
      answer: 1,
      explanation: 'A static initialiser block runs once when the class is loaded — before any constructor or instance code.',
    },
    {
      q: 'Can a `static` method access instance (non-static) fields directly?',
      options: ['Yes, always', 'Only if the class is final', 'No — static methods have no `this` reference', 'Only via a getter'],
      answer: 2,
      explanation: 'Static methods belong to the class, not to an instance. They have no `this`, so they cannot access instance fields directly.',
    },
    {
      q: 'What is the correct way to call a static method?',
      options: ['Only via an instance', 'ClassName.methodName() — via the class name', 'Using new ClassName().methodName()', 'Via the `super` keyword'],
      answer: 1,
      explanation: 'Static methods are called on the class: `ClassName.method()`. Calling via an instance works but is misleading and discouraged.',
    },
    {
      q: 'Which design pattern commonly uses a `static` field and method?',
      options: ['Observer', 'Factory', 'Singleton', 'Decorator'],
      answer: 2,
      explanation: 'Singleton uses a private static field to hold the single instance and a static `getInstance()` method to return it.',
    },
    {
      q: 'What is the Singleton pattern\'s main risk in a multi-threaded environment?',
      options: ['The static field may be garbage collected', 'Multiple threads can create multiple instances if not synchronised', 'Static methods cannot be overridden', 'The constructor is called too many times'],
      answer: 1,
      explanation: 'Without synchronisation (or using double-checked locking / enum singleton), two threads can both pass the null check and create separate instances.',
    },
  ],

  'exception-handling': [
    {
      q: 'What is the difference between checked and unchecked exceptions?',
      options: ['Checked extend RuntimeException; unchecked extend Exception', 'Checked must be declared or caught; unchecked do not', 'Unchecked must be declared; checked do not', 'There is no difference'],
      answer: 1,
      explanation: 'Checked exceptions (e.g. IOException) must be handled or declared with `throws`. Unchecked (RuntimeException subclasses) do not require this.',
    },
    {
      q: 'What does the `finally` block guarantee?',
      options: ['It runs only if no exception is thrown', 'It runs only if an exception is thrown', 'It always runs after try/catch, whether or not an exception occurred', 'It runs before the try block'],
      answer: 2,
      explanation: '`finally` always executes — perfect for releasing resources like DB connections or file handles.',
    },
    {
      q: 'What is try-with-resources used for?',
      options: ['Catching multiple exceptions in one catch', 'Automatically closing AutoCloseable resources after the try block', 'Retrying failed operations', 'Catching checked exceptions only'],
      answer: 1,
      explanation: 'Resources declared in the `try(...)` header implement AutoCloseable. Java calls `close()` automatically at the end of the block.',
    },
    {
      q: 'What happens if you throw an exception inside a `finally` block?',
      options: ['It is ignored', 'It replaces any exception from the try block', 'Both exceptions are propagated', 'The program exits immediately'],
      answer: 1,
      explanation: 'An exception thrown in `finally` suppresses (replaces) the original exception — a common bug. Avoid throwing in finally.',
    },
    {
      q: 'Which of the following is NOT a good use of exceptions?',
      options: ['Signalling a file not found', 'Handling a network timeout', 'Controlling normal loop flow (e.g. catching NoSuchElementException to end a loop)', 'Wrapping a low-level JDBC exception'],
      answer: 2,
      explanation: 'Exceptions are for exceptional conditions, not flow control. Using them for normal loops is slow, unreadable, and an anti-pattern.',
    },
  ],

  'polymorphism': [
    {
      q: 'What is runtime (dynamic) polymorphism in Java?',
      options: ['Method overloading resolved at compile time', 'Method overriding resolved at runtime based on actual object type', 'Casting a subclass to a superclass', 'Using generics to accept multiple types'],
      answer: 1,
      explanation: 'When you call a method on a reference of the parent type, the JVM dispatches to the actual overriding method of the runtime object.',
    },
    {
      q: 'What is method overloading?',
      options: ['Defining the same method in a subclass', 'Multiple methods with the same name but different parameter lists in the same class', 'Calling a method via a superclass reference', 'Using an interface to define behaviour'],
      answer: 1,
      explanation: 'Overloading = same name, different signatures (parameter types/counts), resolved at compile time.',
    },
    {
      q: 'Can a static method be overridden?',
      options: ['Yes, like any other method', 'No — static methods are hidden, not overridden', 'Only in the same package', 'Only if the class is abstract'],
      answer: 1,
      explanation: 'Static methods belong to the class. A subclass can define the same static method, but it hides (not overrides) the parent\'s. There is no dynamic dispatch.',
    },
    {
      q: 'What annotation should you use when overriding a method?',
      options: ['@Override', '@Polymorphic', '@Inherited', '@Super'],
      answer: 0,
      explanation: '@Override tells the compiler you intend to override. It will error if the signature doesn\'t match, preventing silent bugs.',
    },
    {
      q: 'A variable of type Animal holds a Dog object. Which method is called: Animal\'s or Dog\'s?',
      options: ['Always Animal\'s', 'Depends on the cast used', 'Dog\'s — the runtime type determines which override runs', 'Animal\'s, unless you cast to Dog first'],
      answer: 2,
      explanation: 'Dynamic dispatch uses the actual runtime type. The JVM calls Dog\'s version even though the reference is typed as Animal.',
    },
  ],

  'encapsulation-abstraction': [
    {
      q: 'What is the key difference between an abstract class and an interface?',
      options: ['Abstract classes can have constructors; interfaces cannot', 'Interfaces can have state; abstract classes cannot', 'Abstract classes support multiple inheritance', 'Interfaces cannot have any implemented methods'],
      answer: 0,
      explanation: 'Abstract classes can have constructors, fields, and state. Interfaces (pre-Java 8) cannot. A class can implement many interfaces but extend only one abstract class.',
    },
    {
      q: 'When should you prefer an interface over an abstract class?',
      options: ['When you need to share code across unrelated classes', 'When you want to enforce a single inheritance hierarchy', 'When you need to store shared state', 'When you need a constructor'],
      answer: 0,
      explanation: 'Interfaces define contracts that can be applied to any class hierarchy. Use them when capability (e.g. Comparable, Runnable) should be independent of the class tree.',
    },
    {
      q: 'What does abstraction hide?',
      options: ['The method return type', 'Implementation details — exposing only what the caller needs', 'The class\'s package', 'Static members'],
      answer: 1,
      explanation: 'Abstraction lets callers interact with a high-level interface without knowing (or depending on) the internal implementation.',
    },
    {
      q: 'Can you instantiate an abstract class directly?',
      options: ['Yes, always', 'Yes, but only if all abstract methods are implemented', 'No — you must subclass and implement all abstract methods', 'Only inside a static method'],
      answer: 2,
      explanation: 'Abstract classes cannot be instantiated directly. You must create a concrete subclass that implements all abstract methods.',
    },
    {
      q: 'What is a default method in a Java interface (Java 8+)?',
      options: ['A method that returns null by default', 'A method with a body in an interface, used for backward compatibility', 'A method that cannot be overridden', 'A constructor in the interface'],
      answer: 1,
      explanation: 'Default methods let interface authors add new methods with implementations without breaking existing implementors.',
    },
  ],

  'inheritance': [
    {
      q: 'What does Java\'s single inheritance rule mean for classes?',
      options: ['A class can only have one method', 'A class can extend only one other class', 'A class can implement only one interface', 'A class can have only one constructor'],
      answer: 1,
      explanation: 'Java classes support single inheritance — `extends` accepts only one class. But a class can implement many interfaces.',
    },
    {
      q: 'How does Java resolve the "diamond problem"?',
      options: ['By forbidding multiple interface inheritance', 'Interfaces cannot have default methods', 'The implementing class must override the conflicting default method', 'Java picks the method alphabetically'],
      answer: 2,
      explanation: 'When two interfaces provide conflicting default methods, the implementing class must explicitly override the method to resolve the ambiguity.',
    },
    {
      q: 'What does `instanceof` check?',
      options: ['Whether an object is null', 'Whether an object is an instance of a specific class or interface', 'Whether two objects are equal', 'Whether a class is abstract'],
      answer: 1,
      explanation: '`instanceof` returns true if the object is an instance of the given class or any subclass/interface in its hierarchy.',
    },
    {
      q: 'What is the purpose of calling `super()` in a subclass constructor?',
      options: ['To override the parent constructor', 'To ensure the parent class is initialised before the child', 'To copy parent fields', 'To make the subclass abstract'],
      answer: 1,
      explanation: 'Calling `super()` initialises the parent part of the object first. If omitted, the compiler inserts `super()` automatically — which fails if no no-arg constructor exists.',
    },
    {
      q: 'Which class is the implicit parent of all Java classes?',
      options: ['Class', 'Base', 'Root', 'Object'],
      answer: 3,
      explanation: 'Every Java class implicitly extends `java.lang.Object`, inheriting methods like `equals()`, `hashCode()`, and `toString()`.',
    },
  ],

  'comparison': [
    {
      q: 'What is the contract between `equals()` and `hashCode()`?',
      options: ['If equals is true, hashCode must be the same', 'If hashCode is the same, equals must be true', 'They are completely independent', 'hashCode must always return 0'],
      answer: 0,
      explanation: 'If two objects are equal (`equals()` returns true), they must have the same `hashCode()`. Violating this breaks HashMap/HashSet lookups.',
    },
    {
      q: 'What does `Comparable<T>` define?',
      options: ['An external comparison strategy', 'The natural ordering of a class via `compareTo()`', 'Equality only', 'A way to sort by multiple fields'],
      answer: 1,
      explanation: '`Comparable` gives a class a natural order. `Collections.sort()` and `TreeMap` use it by default.',
    },
    {
      q: 'When should you use `Comparator<T>` instead of `Comparable<T>`?',
      options: ['When you need a single, fixed sort order', 'When sorting classes you cannot modify, or need multiple orderings', 'When the class already implements Comparable', 'When you only need equality, not ordering'],
      answer: 1,
      explanation: '`Comparator` is an external strategy — pass it to sort() when you need multiple orderings or cannot touch the class source.',
    },
    {
      q: 'What must `compareTo()` return when `a.compareTo(b)` and `a.equals(b)` are both true?',
      options: ['Any negative number', '0', 'Any positive number', '1'],
      answer: 1,
      explanation: 'Consistency requires `compareTo()` returns 0 whenever `equals()` returns true — otherwise TreeMap and SortedSet behave incorrectly.',
    },
    {
      q: 'What is wrong with comparing integers by subtraction in `compareTo`?',
      options: ['It is too slow', 'Integer overflow can make the sign incorrect', 'It only works for positive numbers', 'compareTo must return boolean'],
      answer: 1,
      explanation: 'Subtracting a large negative from a large positive can overflow, flipping the sign and breaking the ordering.',
    },
  ],

  'generics': [
    {
      q: 'What is type erasure in Java generics?',
      options: ['Generic types are removed by the JVM at startup', 'Generic type information is removed at compile time and replaced with Object or bounds', 'Generic methods are inlined', 'Type parameters are stored as metadata'],
      answer: 1,
      explanation: 'Generics exist for compile-time type safety only. At runtime, `List<String>` becomes `List`. This is type erasure — no generic info survives at runtime.',
    },
    {
      q: 'What does `List<? extends Number>` mean?',
      options: ['A list of exactly Number', 'A read-only list that may hold Number or any subtype', 'A list you can add any Number to', 'A list of Number subtypes that allows add()'],
      answer: 1,
      explanation: 'Upper bounded wildcard (`extends`) allows reading as Number but prevents adding (since the exact subtype is unknown).',
    },
    {
      q: 'What does `List<? super Integer>` allow?',
      options: ['Reading elements as Integer', 'Adding Integer (or subtypes) safely, reading only as Object', 'Reading as any type', 'Neither read nor write'],
      answer: 1,
      explanation: 'Lower bounded wildcard (`super`) is safe for adding Integer values, but you can only read elements as Object.',
    },
    {
      q: 'Why can\'t you create `new T[]` inside a generic class?',
      options: ['Arrays do not support generics', 'Type erasure means T is unknown at runtime, making array creation unsafe', 'Arrays are immutable', 'T must extend Comparable to use arrays'],
      answer: 1,
      explanation: 'Array creation requires a type at runtime, but T is erased. Use `new Object[]` with a cast, or use a List instead.',
    },
    {
      q: 'What is the PECS rule for wildcards?',
      options: ['Producer Extends, Consumer Super — use extends when reading, super when writing', 'Private Enum Constructor Singleton', 'Polymorphic Erasure Compile Safety', 'None of the above'],
      answer: 0,
      explanation: 'PECS: if a collection produces (you read from it), use `? extends`. If it consumes (you write to it), use `? super`.',
    },
  ],

  'collections': [
    {
      q: 'How does HashMap handle hash collisions in Java 8+?',
      options: ['It throws an exception', 'It resizes immediately', 'It uses a linked list, converting to a red-black tree after 8 entries', 'It uses open addressing'],
      answer: 2,
      explanation: 'Collisions are chained in a linked list per bucket. Once a bucket exceeds 8 entries, it is converted to a red-black tree for O(log n) lookup.',
    },
    {
      q: 'What is the time complexity of ArrayList\'s get(index)?',
      options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
      answer: 2,
      explanation: 'ArrayList is backed by an array — index access is O(1) regardless of size.',
    },
    {
      q: 'Which collection guarantees insertion-order iteration?',
      options: ['HashSet', 'TreeSet', 'LinkedHashSet', 'ArrayDeque'],
      answer: 2,
      explanation: 'LinkedHashSet maintains a doubly-linked list to preserve insertion order, unlike HashSet (no order) or TreeSet (sorted order).',
    },
    {
      q: 'What is the main difference between HashMap and ConcurrentHashMap?',
      options: ['ConcurrentHashMap is slower', 'ConcurrentHashMap uses fine-grained locking / CAS for thread-safe reads and writes', 'HashMap allows null keys; ConcurrentHashMap does not allow null keys', 'Both A and C'],
      answer: 3,
      explanation: 'ConcurrentHashMap is thread-safe with fine-grained locks. It also rejects null keys and values, unlike HashMap which allows one null key.',
    },
    {
      q: 'When is LinkedList faster than ArrayList?',
      options: ['Random access', 'Frequent insertions/deletions at the head or tail of a large list', 'Sorting', 'Iteration'],
      answer: 1,
      explanation: 'LinkedList\'s head/tail operations are O(1). But for most real-world workloads ArrayList\'s cache-locality makes it faster overall.',
    },
  ],

  'lambda-functional': [
    {
      q: 'What is a functional interface?',
      options: ['An interface with no methods', 'An interface with exactly one abstract method', 'An interface with only default methods', 'An interface that extends Function'],
      answer: 1,
      explanation: 'A functional interface has exactly one abstract method — this is what a lambda can implement.',
    },
    {
      q: 'What does the `Function<T, R>` functional interface do?',
      options: ['Takes no argument and returns R', 'Takes T, returns nothing', 'Takes T and returns R', 'Takes two arguments'],
      answer: 2,
      explanation: '`Function<T,R>` is `R apply(T t)` — transform one value into another.',
    },
    {
      q: 'What is a method reference?',
      options: ['A pointer to a static method only', 'A shorthand for a lambda that calls an existing method', 'A way to override an interface', 'A reflection-based method call'],
      answer: 1,
      explanation: 'Method references (`Class::method`) are compact lambda equivalents. e.g. `String::toUpperCase` = `s -> s.toUpperCase()`.',
    },
    {
      q: 'What does `Predicate<T>` return?',
      options: ['T', 'void', 'boolean', 'Optional<T>'],
      answer: 2,
      explanation: '`Predicate<T>` is `boolean test(T t)` — it evaluates a condition on T.',
    },
    {
      q: 'Can a lambda capture a local variable from its enclosing scope?',
      options: ['Only if it is public', 'Yes — if the variable is effectively final (never reassigned)', 'Yes — any variable', 'No — lambdas cannot access outer variables'],
      answer: 1,
      explanation: 'Lambdas capture variables that are effectively final. This prevents concurrency issues and ensures consistent behaviour.',
    },
  ],

  'streams': [
    {
      q: 'What is a terminal operation in the Stream API?',
      options: ['An operation that returns a Stream', 'An operation that closes the connection', 'An operation that triggers processing and produces a result or side effect', 'The first operation in the pipeline'],
      answer: 2,
      explanation: 'Terminal operations (collect, forEach, count, reduce) trigger the stream pipeline. Without one, no intermediate operations execute.',
    },
    {
      q: 'What makes Stream pipelines lazy?',
      options: ['Intermediate operations run as soon as called', 'Elements are processed only when a terminal operation is invoked', 'Streams require explicit flushing', 'Collectors are lazy by default'],
      answer: 1,
      explanation: 'Intermediate operations (filter, map) are lazy — they stack up. The pipeline runs only when a terminal operation is reached.',
    },
    {
      q: 'What does `flatMap` do differently from `map`?',
      options: ['It filters elements', 'It maps each element to a Stream, then flattens all streams into one', 'It runs in parallel', 'It groups elements by key'],
      answer: 1,
      explanation: '`flatMap(f)` applies f (which returns a Stream per element) and merges all the resulting streams into a single stream.',
    },
    {
      q: 'Can you reuse a Stream after a terminal operation?',
      options: ['Yes, always', 'Yes, but only with non-modifying terminals', 'No — a Stream can only be consumed once', 'Yes, if you call reset()'],
      answer: 2,
      explanation: 'Streams are single-use. After a terminal operation the stream is consumed. Create a new one to process again.',
    },
    {
      q: 'What does `Collectors.groupingBy()` return?',
      options: ['A List', 'A Set', 'A Map where keys are the grouping criteria', 'A Stream of grouped elements'],
      answer: 2,
      explanation: '`groupingBy(classifier)` returns `Map<K, List<T>>` grouping elements by the classifier function\'s output.',
    },
  ],

  'threads-concurrency': [
    {
      q: 'What is the difference between a process and a thread?',
      options: ['Threads have separate memory; processes share memory', 'Processes are lightweight; threads are heavy', 'Threads share the process\'s memory space; processes have isolated memory', 'There is no difference in Java'],
      answer: 2,
      explanation: 'Threads within the same process share heap memory, enabling fast communication but requiring synchronisation. Processes have separate address spaces.',
    },
    {
      q: 'What is a race condition?',
      options: ['Two threads running at exactly the same speed', 'When thread scheduling order affects correctness of the outcome', 'A deadlock caused by two waiting threads', 'When a thread runs faster than expected'],
      answer: 1,
      explanation: 'A race condition occurs when multiple threads access shared state and the result depends on the non-deterministic scheduling order.',
    },
    {
      q: 'What does `synchronized` guarantee?',
      options: ['Visibility only', 'Atomicity only', 'Both mutual exclusion and memory visibility', 'Thread priority'],
      answer: 2,
      explanation: '`synchronized` ensures only one thread holds the monitor at a time (mutual exclusion) and that changes are visible to the next thread that acquires the same lock.',
    },
    {
      q: 'What is a deadlock?',
      options: ['A thread that runs forever', 'A thread blocked waiting for I/O', 'Two or more threads waiting for locks held by each other — all stuck forever', 'An exception thrown from a thread'],
      answer: 2,
      explanation: 'Deadlock: Thread A holds Lock 1, waits for Lock 2. Thread B holds Lock 2, waits for Lock 1. Neither can proceed.',
    },
    {
      q: 'What is the purpose of `ExecutorService`?',
      options: ['To create new threads manually', 'To manage a pool of threads and schedule tasks without creating threads directly', 'To synchronise access to shared data', 'To kill threads after timeout'],
      answer: 1,
      explanation: 'ExecutorService manages a thread pool — submit tasks, reuse threads, and control lifecycle. Preferred over raw `new Thread()`.',
    },
  ],

  'jvm-architecture': [
    {
      q: 'What does the JIT compiler do?',
      options: ['Interprets bytecode line by line', 'Compiles Java source to bytecode', 'Compiles frequently-run bytecode to native machine code at runtime', 'Manages garbage collection'],
      answer: 2,
      explanation: 'The JIT compiler detects hot methods and compiles them to native code, dramatically improving execution speed over interpretation.',
    },
    {
      q: 'What is stored in the Method Area (Metaspace)?',
      options: ['Object instances', 'Local variables', 'Class metadata, static fields, and method bytecode', 'Thread stacks'],
      answer: 2,
      explanation: 'The Method Area (called Metaspace since Java 8) holds class structures: bytecode, constant pool, static fields, and method metadata.',
    },
    {
      q: 'What does the garbage collector reclaim?',
      options: ['Stack frames of completed methods', 'Objects on the heap that are no longer reachable', 'Unused static variables', 'Native memory'],
      answer: 1,
      explanation: 'GC reclaims heap memory occupied by objects with no live references. Stack frames are automatically freed when methods return.',
    },
    {
      q: 'What triggers a `java.lang.OutOfMemoryError`?',
      options: ['Too many threads', 'The heap is exhausted and GC cannot free enough memory', 'A static field holding too much data', 'Too many class loaders'],
      answer: 1,
      explanation: 'OutOfMemoryError occurs when the heap is full and the GC cannot reclaim enough space to fulfil an allocation request.',
    },
    {
      q: 'What is the role of the ClassLoader?',
      options: ['Executing bytecode', 'Loading, linking, and initialising class files into the JVM at runtime', 'Managing the heap', 'Optimising bytecode'],
      answer: 1,
      explanation: 'ClassLoaders find class files (from .jar, network, or custom sources), load them into memory, and initialise the class metadata.',
    },
  ],

  'spring-framework': [
    {
      q: 'What is the Spring IoC container?',
      options: ['A database connection pool', 'A component that creates and manages beans and injects dependencies', 'A web server', 'A transaction manager'],
      answer: 1,
      explanation: 'The IoC (Inversion of Control) container instantiates beans, wires their dependencies, and manages their lifecycle.',
    },
    {
      q: 'Which injection type does Spring recommend?',
      options: ['Field injection (@Autowired on a field)', 'Setter injection', 'Constructor injection', 'Interface injection'],
      answer: 2,
      explanation: 'Constructor injection is preferred: dependencies are explicit, the object is always fully initialised, and fields can be `final`.',
    },
    {
      q: 'What is the default scope of a Spring bean?',
      options: ['prototype', 'request', 'session', 'singleton'],
      answer: 3,
      explanation: 'Beans are singletons by default — one instance per ApplicationContext. Use `@Scope("prototype")` for a new instance per request.',
    },
    {
      q: 'What is Spring Boot\'s auto-configuration?',
      options: ['Manual XML configuration', 'Automatically configures beans based on classpath dependencies', 'A build tool plugin', 'A cloud deployment feature'],
      answer: 1,
      explanation: 'Spring Boot detects what is on the classpath (e.g. spring-data-jpa) and auto-configures sensible beans so you don\'t need boilerplate XML.',
    },
    {
      q: 'What does `@Transactional` do?',
      options: ['Caches the method result', 'Wraps the method in a database transaction, rolling back on unchecked exception', 'Marks a class as a Spring bean', 'Enables async execution'],
      answer: 1,
      explanation: '@Transactional opens a transaction before the method and commits on success, or rolls back on RuntimeException by default.',
    },
  ],

  'reflection': [
    {
      q: 'What is Java Reflection?',
      options: ['A design pattern for logging', 'The ability to inspect and manipulate class structure at runtime', 'A compiler optimisation', 'A way to compare objects'],
      answer: 1,
      explanation: 'Reflection lets code examine classes, methods, fields, and constructors at runtime — essential for frameworks like Spring and Hibernate.',
    },
    {
      q: 'What is the main performance concern with Reflection?',
      options: ['It causes stack overflows', 'Reflective calls skip JIT optimisations and have higher overhead than direct calls', 'It requires more heap memory', 'It is not thread-safe'],
      answer: 1,
      explanation: 'Reflective method invocations bypass JIT optimisation. They are typically 10–100x slower for hot paths — fine for framework startup, bad for tight loops.',
    },
    {
      q: 'What is the difference between `getMethods()` and `getDeclaredMethods()`?',
      options: ['getMethods returns private methods; getDeclaredMethods returns public ones', 'getMethods returns all public inherited methods; getDeclaredMethods returns all methods (any visibility) declared in the class', 'They are identical', 'getDeclaredMethods includes static methods only'],
      answer: 1,
      explanation: '`getMethods()` returns public methods including inherited ones. `getDeclaredMethods()` returns all methods (public, protected, private) declared directly in the class.',
    },
    {
      q: 'What must you call to invoke a private method via reflection?',
      options: ['method.setPublic(true)', 'method.setAccessible(true)', 'method.unlock()', 'method.bypass(true)'],
      answer: 1,
      explanation: '`setAccessible(true)` overrides the JVM access check, allowing invocation of private methods — though this can be restricted by module system or SecurityManager.',
    },
    {
      q: 'Which Spring feature relies heavily on reflection?',
      options: ['Spring Security password encoding', 'Dependency injection and bean instantiation', 'Spring Boot embedded server', 'Spring Data query generation'],
      answer: 1,
      explanation: 'Spring uses reflection to read annotations, create bean instances, and inject dependencies — often via `getDeclaredConstructor().newInstance()`.',
    },
  ],

  'concurrency': [
    {
      q: 'What does `volatile` guarantee that `synchronized` does not exclusively provide?',
      options: ['Mutual exclusion', 'Visibility without locking overhead for simple flag variables', 'Atomicity of compound operations', 'Thread creation'],
      answer: 1,
      explanation: 'volatile ensures writes are immediately visible to all threads without acquiring a lock — lighter than synchronized for simple flags.',
    },
    {
      q: 'What is a `ReentrantLock` and when should you use it over `synchronized`?',
      options: ['An immutable lock for read-only data', 'An explicit lock offering tryLock, timed locking, and interruptible waiting', 'A lock that auto-releases after 1 second', 'A lock that allows multiple writers'],
      answer: 1,
      explanation: 'ReentrantLock provides more control: tryLock to avoid blocking, timed waits, and interruptible lock acquisition — useful for complex concurrent algorithms.',
    },
    {
      q: 'What does `AtomicInteger.compareAndSet(expected, update)` do?',
      options: ['Compares two integers and throws if different', 'Atomically sets value to update only if current value equals expected', 'Locks the variable then sets it', 'Creates a copy of the integer'],
      answer: 1,
      explanation: 'CAS is a hardware-level atomic operation. It sets the value only if it hasn\'t changed since you read it — enabling lock-free algorithms.',
    },
    {
      q: 'What is `CountDownLatch` used for?',
      options: ['Limiting how many threads can run', 'Making one or more threads wait until a set of other threads completes', 'Counting CPU cycles', 'Limiting task queue size'],
      answer: 1,
      explanation: 'CountDownLatch allows threads to wait at a gate until N other threads have called `countDown()` — e.g. wait for all services to initialise.',
    },
    {
      q: 'What is the difference between `Future` and `CompletableFuture`?',
      options: ['Future is newer; CompletableFuture is deprecated', 'CompletableFuture supports chaining, composition, and callbacks; Future is a simple blocking handle', 'They are identical', 'CompletableFuture only works with ExecutorService'],
      answer: 1,
      explanation: 'CompletableFuture adds `thenApply`, `thenCompose`, `exceptionally` etc. for non-blocking async pipelines. Future only offers `get()` (blocking).',
    },
  ],

  'modern-java': [
    {
      q: 'What is a Record in Java (Java 16+)?',
      options: ['A mutable data class with generated getters/setters', 'An immutable data carrier with auto-generated equals, hashCode, toString, and accessors', 'A new kind of interface', 'A replacement for enums'],
      answer: 1,
      explanation: 'Records (`record Point(int x, int y)`) generate immutable fields, a canonical constructor, accessors, and equals/hashCode/toString automatically.',
    },
    {
      q: 'What does a sealed class do in Java 17+?',
      options: ['Prevents the class from being instantiated', 'Restricts which classes can extend or implement it', 'Makes all fields final', 'Disables reflection on the class'],
      answer: 1,
      explanation: 'Sealed classes declare an explicit `permits` list — only those named subclasses can extend it, enabling exhaustive pattern matching.',
    },
    {
      q: 'What are virtual threads (Java 21)?',
      options: ['Threads that run in a virtual machine only', 'Lightweight threads managed by the JVM, enabling massive concurrency without OS thread overhead', 'GPU-accelerated threads', 'Threads that execute bytecode symbolically'],
      answer: 1,
      explanation: 'Virtual threads (Project Loom) are JVM-managed, extremely cheap to create by the millions. They block without pinning an OS thread, ideal for I/O-heavy servers.',
    },
    {
      q: 'What does text blocks add in Java 13+?',
      options: ['Multi-line string literals with automatic indent trimming', 'A new String method', 'Template strings with variable interpolation', 'Rich text formatting'],
      answer: 0,
      explanation: 'Text blocks (`"""..."""`) allow multi-line strings without escape sequences, with automatic indentation stripping.',
    },
    {
      q: 'What is pattern matching for `instanceof` (Java 16)?',
      options: ['A way to use instanceof in switch statements', 'Combines the type check and binding cast: `if (obj instanceof String s)`', 'A new regex engine', 'A compile-time type check'],
      answer: 1,
      explanation: '`instanceof String s` checks the type AND binds the cast result to `s` in one step, eliminating the boilerplate explicit cast.',
    },
  ],

  'sql-basics': [
    {
      q: 'What does a JOIN do in SQL?',
      options: ['Filters rows by condition', 'Combines rows from two or more tables based on a related column', 'Groups rows by a column', 'Sorts the result set'],
      answer: 1,
      explanation: 'JOIN merges rows from two tables by matching a condition (typically a foreign key). INNER JOIN returns only matching rows.',
    },
    {
      q: 'What is the difference between WHERE and HAVING?',
      options: ['WHERE filters rows before grouping; HAVING filters groups after GROUP BY', 'They are identical', 'HAVING filters individual rows; WHERE filters groups', 'WHERE is for SELECT only; HAVING is for UPDATE'],
      answer: 0,
      explanation: 'WHERE filters individual rows before aggregation. HAVING filters the groups produced by GROUP BY.',
    },
    {
      q: 'What does an index do?',
      options: ['Duplicates data for backup', 'Speeds up read queries by creating a sorted lookup structure', 'Enforces uniqueness only', 'Replaces a primary key'],
      answer: 1,
      explanation: 'An index (typically a B-tree) lets the database locate rows matching a condition without scanning every row.',
    },
    {
      q: 'What are the ACID properties?',
      options: ['Availability, Consistency, Isolation, Durability', 'Atomicity, Consistency, Isolation, Durability', 'Atomicity, Concurrency, Integrity, Durability', 'Availability, Correctness, Isolation, Distribution'],
      answer: 1,
      explanation: 'ACID: Atomicity (all or nothing), Consistency (valid state), Isolation (transactions don\'t interfere), Durability (committed data survives crashes).',
    },
    {
      q: 'What does N+1 query problem mean?',
      options: ['Fetching N rows plus one extra row accidentally', '1 query to fetch a list + N queries to fetch related data for each row — causing performance issues', 'An off-by-one error in LIMIT clauses', 'Using N joins in a single query'],
      answer: 1,
      explanation: 'Classic ORM pitfall: 1 query returns 100 orders, then 100 more queries fetch the customer for each. Fix with JOIN or fetch join.',
    },
  ],

  'spring-mvc': [
    {
      q: 'What is the role of `DispatcherServlet` in Spring MVC?',
      options: ['A database connection pool', 'The front controller that routes incoming HTTP requests to the correct handler', 'A view template engine', 'A thread pool manager'],
      answer: 1,
      explanation: 'DispatcherServlet is Spring MVC\'s front controller — it receives all requests and delegates to @Controller methods via handler mappings.',
    },
    {
      q: 'What is the difference between `@Controller` and `@RestController`?',
      options: ['@RestController can only return JSON', '@RestController combines @Controller + @ResponseBody, serialising return values directly', '@Controller is for REST APIs; @RestController is for views', 'There is no difference'],
      answer: 1,
      explanation: '@RestController = @Controller + @ResponseBody. Methods return data serialised to JSON/XML directly, not a view name.',
    },
    {
      q: 'What does `@PathVariable` do?',
      options: ['Reads a query parameter from the URL', 'Extracts a value from the URI path template e.g. /users/{id}', 'Reads a request body field', 'Sets a response header'],
      answer: 1,
      explanation: '@PathVariable binds a URI template variable like `{id}` to a method parameter: `@GetMapping("/users/{id}") User get(@PathVariable Long id)`.',
    },
    {
      q: 'What HTTP status code does `@ResponseStatus(HttpStatus.CREATED)` send?',
      options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
      answer: 1,
      explanation: 'HTTP 201 Created is the correct response for a successful POST that creates a new resource.',
    },
    {
      q: 'What is the purpose of `@ExceptionHandler`?',
      options: ['Logging exceptions to a file', 'Handling specific exceptions thrown by controllers and returning appropriate responses', 'Retrying failed requests', 'Configuring global filters'],
      answer: 1,
      explanation: '@ExceptionHandler in a @ControllerAdvice class catches exceptions from any controller and maps them to error responses.',
    },
  ],

  'annotations': [
    {
      q: 'What is an annotation in Java?',
      options: ['A comment in source code', 'A form of metadata attached to code elements, readable at compile time or runtime', 'A type of interface', 'A compiler directive'],
      answer: 1,
      explanation: 'Annotations provide metadata about code (classes, methods, fields). They have no direct effect on logic — consumers read them via reflection or compile-time processors.',
    },
    {
      q: 'What does `@Retention(RetentionPolicy.RUNTIME)` mean?',
      options: ['The annotation is erased at compile time', 'The annotation is kept in the class file but not at runtime', 'The annotation is available via reflection at runtime', 'The annotation only applies during testing'],
      answer: 2,
      explanation: 'RUNTIME retention keeps the annotation in bytecode and makes it available via reflection — needed for framework processing at runtime.',
    },
    {
      q: 'What does `@Target(ElementType.METHOD)` restrict?',
      options: ['The return type of the method', 'Where the annotation can be applied — in this case, only to methods', 'The annotation\'s visibility', 'The annotation\'s retention'],
      answer: 1,
      explanation: '@Target limits valid placement. ElementType.METHOD means the annotation can only be placed on method declarations.',
    },
    {
      q: 'How do frameworks like Spring process annotations?',
      options: ['Using the Java compiler only', 'Via reflection at runtime to detect and act on annotated classes and methods', 'Via bytecode injection at class loading', 'Via XML configuration that maps annotation names'],
      answer: 1,
      explanation: 'Spring scans for annotations like @Component, @Autowired, and @Transactional using reflection and applies behaviour (bean registration, DI, AOP proxying) accordingly.',
    },
    {
      q: 'What is annotation processing (APT)?',
      options: ['Running annotations at runtime', 'A compile-time mechanism to generate code or validate usage based on annotations', 'A debugger for annotations', 'A JVM feature'],
      answer: 1,
      explanation: 'APT runs during compilation. Tools like Lombok use it to generate boilerplate code (getters, builders) before the source is compiled to bytecode.',
    },
  ],

  'patterns': [
    {
      q: 'What problem does the Builder pattern solve?',
      options: ['Object pooling', 'Constructing complex objects step-by-step, avoiding telescoping constructors', 'Lazy initialisation of a singleton', 'Decoupling an interface from implementation'],
      answer: 1,
      explanation: 'Builder avoids constructors with many parameters by providing a fluent API to set only the fields you need.',
    },
    {
      q: 'What is the Observer pattern?',
      options: ['A pattern for creating objects', 'A pattern where subscribers are notified when a subject\'s state changes', 'A pattern for thread-safe singleton creation', 'A pattern for building complex queries'],
      answer: 1,
      explanation: 'Observer defines a one-to-many relationship — when the subject changes, all registered observers are notified. Used in event systems and MVC.',
    },
    {
      q: 'What does the Decorator pattern do?',
      options: ['Creates a clone of an object', 'Adds behaviour to an object dynamically by wrapping it', 'Converts one interface to another', 'Provides a single point of access'],
      answer: 1,
      explanation: 'Decorator wraps an object and adds new behaviour without changing the original class. Java I/O streams use this heavily.',
    },
    {
      q: 'What is the Factory Method pattern?',
      options: ['A method that returns a singleton', 'Defines an interface for creating objects but lets subclasses decide the concrete class', 'Creates a family of related objects', 'Separates construction from representation'],
      answer: 1,
      explanation: 'Factory Method delegates creation to subclasses — the superclass defines `createProduct()` abstractly; subclasses implement it with their specific product.',
    },
    {
      q: 'What is the Strategy pattern?',
      options: ['Storing multiple algorithms in a list', 'Defining a family of algorithms and making them interchangeable at runtime', 'A pattern for database access', 'A way to manage thread pools'],
      answer: 1,
      explanation: 'Strategy encapsulates an algorithm behind an interface and allows swapping implementations at runtime — e.g. different sorting or payment strategies.',
    },
  ],

  'spring-internals': [
    {
      q: 'How does Spring AOP create proxies?',
      options: ['By modifying source code', 'Via JDK dynamic proxies (for interfaces) or CGLIB proxies (for classes) at runtime', 'By generating new Java files', 'Using reflection without proxies'],
      answer: 1,
      explanation: 'Spring AOP wraps beans in proxies. JDK proxies require an interface; CGLIB subclasses the target class at runtime to intercept method calls.',
    },
    {
      q: 'What is a BeanPostProcessor?',
      options: ['A factory that creates beans from XML', 'A hook that runs before and after each bean is initialised, allowing modification', 'A thread that monitors bean health', 'A validator for @Configuration classes'],
      answer: 1,
      explanation: 'BeanPostProcessor intercepts every bean after construction. Spring\'s AOP proxy creator is itself a BeanPostProcessor that wraps beans needing advice.',
    },
    {
      q: 'What is the difference between @Bean and @Component?',
      options: ['@Bean is for interfaces; @Component is for classes', '@Bean is method-level in @Configuration classes; @Component is class-level for classpath scanning', 'They are identical', '@Component creates singletons; @Bean creates prototypes'],
      answer: 1,
      explanation: '@Component marks a class for component scan. @Bean annotates a method in a @Configuration class that explicitly constructs and returns a bean.',
    },
    {
      q: 'What is the ApplicationContext responsible for?',
      options: ['Managing HTTP sessions', 'Bootstrapping beans, wiring dependencies, and providing access to the application environment', 'Running scheduled tasks only', 'Managing database transactions'],
      answer: 1,
      explanation: 'ApplicationContext extends BeanFactory with event publishing, i18n, environment abstraction, and lifecycle management — the core of a Spring application.',
    },
    {
      q: 'What does @Lazy do on a Spring bean?',
      options: ['Makes the bean load in a separate thread', 'Defers bean creation until the first time it is requested', 'Makes the bean stateless', 'Disables proxy creation'],
      answer: 1,
      explanation: '@Lazy delays instantiation until the bean is actually needed — useful for expensive beans or breaking circular dependency issues.',
    },
  ],

  'networking-http': [
    {
      q: 'What does HTTP status 404 mean?',
      options: ['Server error', 'Redirect', 'Not Found — the requested resource does not exist', 'Unauthorised'],
      answer: 2,
      explanation: '404 Not Found means the server understood the request but could not find the resource at that URI.',
    },
    {
      q: 'What is the difference between PUT and PATCH?',
      options: ['PUT creates; PATCH deletes', 'PUT replaces the entire resource; PATCH applies a partial update', 'They are identical', 'PATCH is for creating; PUT is for updating'],
      answer: 1,
      explanation: 'PUT is idempotent and replaces the full resource. PATCH applies partial modifications — only the provided fields change.',
    },
    {
      q: 'What does idempotent mean for an HTTP method?',
      options: ['The request always returns the same response', 'Calling the method multiple times produces the same state as calling it once', 'The request has no side effects', 'The method is safe to cache'],
      answer: 1,
      explanation: 'Idempotent: repeated identical requests leave the server in the same state. GET, PUT, DELETE are idempotent. POST is not.',
    },
    {
      q: 'What is the purpose of the HTTP Authorization header?',
      options: ['To specify the response format', 'To carry credentials (Bearer token, Basic auth) for authenticating the request', 'To set caching rules', 'To specify the request body encoding'],
      answer: 1,
      explanation: 'Authorization carries credentials. e.g. `Authorization: Bearer <JWT>` or `Authorization: Basic <base64>`.',
    },
    {
      q: 'What does CORS protect against?',
      options: ['SQL injection', 'Cross-site request forgery', 'Browsers making requests to a different origin than the page was loaded from, without explicit server permission', 'XSS attacks'],
      answer: 2,
      explanation: 'CORS (Cross-Origin Resource Sharing) is a browser security mechanism. A server must include correct CORS headers to allow requests from different origins.',
    },
  ],

  'design-patterns': [
    {
      q: 'What are the three categories of GoF design patterns?',
      options: ['Create, Update, Delete', 'Creational, Structural, Behavioural', 'Static, Dynamic, Hybrid', 'Abstract, Concrete, Mixed'],
      answer: 1,
      explanation: 'GoF (Gang of Four) patterns: Creational (how objects are created), Structural (how classes are composed), Behavioural (how objects communicate).',
    },
    {
      q: 'What pattern does `java.util.Collections.unmodifiableList()` use?',
      options: ['Singleton', 'Factory', 'Decorator', 'Proxy'],
      answer: 2,
      explanation: 'It wraps the list in a decorator that intercepts mutating methods and throws UnsupportedOperationException.',
    },
    {
      q: 'What is the Proxy pattern?',
      options: ['A placeholder object that controls access to another object', 'A pattern for creating multiple instances', 'A pattern for converting interfaces', 'A pattern for chaining operations'],
      answer: 0,
      explanation: 'Proxy provides a surrogate for another object to control access — for lazy loading, access control, logging, or remoting.',
    },
    {
      q: 'What is the Facade pattern?',
      options: ['Hiding class hierarchies', 'Providing a simplified interface to a complex subsystem', 'Converting one interface to another', 'Managing object creation'],
      answer: 1,
      explanation: 'Facade simplifies usage of a complex API by offering a single, clean interface over multiple underlying components.',
    },
    {
      q: 'When is the Template Method pattern useful?',
      options: ['When you need to swap algorithms at runtime', 'When you want to define a skeleton algorithm in a superclass and let subclasses fill in specific steps', 'When you need to notify multiple objects of state change', 'When constructing complex objects step by step'],
      answer: 1,
      explanation: 'Template Method defines the overall algorithm in a base class with abstract "hook" methods that subclasses implement for variation.',
    },
  ],
};
