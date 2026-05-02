export const articles = [
  {
    slug: 'reflection-power-risk',
    title: 'Reflection in Java: Power, Risk, and Practical Use',
    topic: 'reflection',
    summary: 'An overview of Java Reflection, its runtime strengths, safety tradeoffs, and how frameworks like Spring depend on it.',
    tags: ['Reflection', 'Spring', 'Security'],
    sections: [
      {
        title: 'What is Reflection in Java?',
        content: [
          'Reflection is the ability of a Java program to inspect or modify its own structure and behavior at runtime.',
          'It allows access to classes, methods, constructors, fields, and metadata without knowing them at compile time.',
        ],
      },
      {
        title: 'Why Reflection is Powerful',
        content: [
          'Reflection enables dynamic behavior, plugin systems, framework wiring, object mapping, and runtime analysis.',
          'It allows libraries to create objects, invoke methods, and configure classes without explicit compile-time references.',
        ],
      },
      {
        title: 'Why Reflection is Risky',
        content: [
          'Reflection bypasses normal access control, which can break encapsulation and create security vulnerabilities.',
          'It is slower than direct calls, harder to analyze, and can break when internal APIs or class structures change.',
        ],
      },
      {
        title: 'Creating an Object with Reflection',
        content: [
          'Use `Class.forName("com.example.MyClass")` or `MyClass.class` to obtain a `Class<?>` object, then call `getDeclaredConstructor().newInstance()`.',
          'This makes object creation data-driven and suitable for configuration-based systems.',
        ],
        code: `Class<?> clazz = Class.forName("com.example.MyClass");\nObject instance = clazz.getDeclaredConstructor().newInstance();`,
      },
      {
        title: 'getMethods() vs getDeclaredMethods()',
        content: [
          '`getMethods()` returns all public methods of the class and its superclasses, including inherited methods.',
          '`getDeclaredMethods()` returns all methods declared in the class itself, including private and package-private methods, but not inherited methods.',
        ],
      },
      {
        title: 'Accessing Private Fields',
        content: [
          'Reflection can access private fields by calling `getDeclaredField(name)` and then using `setAccessible(true)`.',
          'This allows frameworks to inject values or serialize objects without exposing fields through public APIs.',
        ],
        code: `Field field = clazz.getDeclaredField("secret");\nfield.setAccessible(true);\nfield.set(instance, "value");`,
      },
      {
        title: 'What is setAccessible(true)?',
        content: [
          '`setAccessible(true)` disables Java language access checks for reflection operations.',
          'It is dangerous because it exposes private internals, bypasses encapsulation, and can easily violate invariants or security expectations.',
        ],
      },
      {
        title: 'How Spring Uses Reflection',
        content: [
          'Spring uses reflection to create beans, set field values, invoke lifecycle callbacks, and build proxies at runtime.',
          'Spring also scans annotations and metadata using reflection to wire dependencies and apply cross-cutting concerns.',
        ],
      },
    ],
  },
  {
    slug: 'annotations-custom-metadata',
    title: 'Java Annotations: Built-in and Custom Metadata',
    topic: 'annotations',
    summary: 'Learn what Java annotations are, how to create custom metadata, and how to create runtime-aware annotations.',
    tags: ['Annotations', 'Custom Annotation'],
    sections: [
      {
        title: 'What Are Annotations in Java?',
        content: [
          'Annotations are metadata that can be attached to classes, methods, fields, parameters, and packages.',
          'They do not change program semantics by themselves but can be read by tools, compilers, or runtime frameworks.',
        ],
      },
      {
        title: 'Common Uses of Annotations',
        content: [
          'Framework configuration, dependency injection, validation rules, serialization hints, and code generation.',
          'Examples include `@Override`, `@Deprecated`, `@Entity`, `@Autowired`, and `@RequestMapping`.',
        ],
      },
      {
        title: 'Creating a Custom Annotation',
        content: [
          'Define a custom annotation with `@interface` and configure retention and target policies.',
          'Use `@Retention(RetentionPolicy.RUNTIME)` if the annotation must be available through reflection at runtime.',
        ],
        code: `import java.lang.annotation.Retention;\nimport java.lang.annotation.RetentionPolicy;\nimport java.lang.annotation.Target;\nimport java.lang.annotation.ElementType;\n\n@Retention(RetentionPolicy.RUNTIME)\n@Target(ElementType.TYPE)\npublic @interface Service {\n  String value() default "";\n}`,
      },
      {
        title: 'How Frameworks Consume Annotations',
        content: [
          'Frameworks scan classes and read annotation values to build configuration, apply behavior, or generate proxies.',
          'A runtime processor can use reflection to inspect annotated elements and act on the metadata.',
        ],
      },
    ],
  },
  {
    slug: 'jmm-concurrency-primitives',
    title: 'Java Memory Model, Visibility, and Concurrency Primitives',
    topic: 'concurrency',
    summary: 'Understand the Java Memory Model, visibility problems, volatile, synchronization, ReentrantLock, CAS, and AtomicInteger.',
    tags: ['JMM', 'volatile', 'synchronized', 'ReentrantLock', 'CAS', 'AtomicInteger'],
    sections: [
      {
        title: 'What is the Java Memory Model?',
        content: [
          'The Java Memory Model (JMM) defines how threads interact through memory and how changes by one thread become visible to others.',
          'It specifies rules for reads, writes, ordering, and synchronization to avoid data races and undefined behavior.',
        ],
      },
      {
        title: 'What is the Visibility Problem?',
        content: [
          'A visibility problem occurs when one thread updates a shared variable but other threads do not see the updated value immediately.',
          'Without synchronization, writes can be cached or reordered, leading to stale data across threads.',
        ],
      },
      {
        title: 'What is volatile?',
        content: [
          '`volatile` ensures that reads and writes to a variable are visible to all threads immediately.',
          'It also prevents certain reorderings, making it useful for simple state flags and publish-subscribe signals.',
        ],
      },
      {
        title: 'When to Use volatile vs synchronized',
        content: [
          '`volatile` is lighter-weight and gives visibility guarantees, but it does not provide atomicity for compound operations.',
          '`synchronized` provides both visibility and mutual exclusion, making it safer for updating shared state with multiple steps.',
        ],
      },
      {
        title: 'What is Synchronization?',
        content: [
          'Synchronization controls access to shared resources using monitors, ensuring only one thread executes a critical section at a time.',
          'It also establishes happens-before relationships that guarantee memory visibility for changes made inside synchronized blocks.',
        ],
      },
      {
        title: 'Synchronized Method vs Synchronized Block',
        content: [
          'A synchronized method locks either the current object (`this`) or the class object for static methods.',
          'A synchronized block can lock any object and limits the scope of locking, reducing contention and increasing performance.',
        ],
      },
      {
        title: 'What is ReentrantLock?',
        content: [
          '`ReentrantLock` is an explicit lock implementation from `java.util.concurrent.locks` that supports advanced features like fairness, try-lock, and interruptible waits.',
          'It is reentrant, meaning the same thread can acquire it multiple times without deadlocking itself.',
        ],
      },
      {
        title: 'Advantages of ReentrantLock over synchronized',
        content: [
          'Supports timed locking, interruptible lock acquisition, and fair locking order.',
          'Offers better diagnostics, lock polling, and the ability to separate lock acquisition from unlocking in different scopes.',
        ],
      },
      {
        title: 'What is CAS (Compare-And-Swap)?',
        content: [
          'CAS is an atomic hardware-supported operation that compares the current value with an expected value and updates it only if they match.',
          'It is the foundation of non-blocking algorithms and is used by classes in `java.util.concurrent.atomic`.',
        ],
      },
      {
        title: 'How AtomicInteger Works Internally',
        content: [
          '`AtomicInteger` uses CAS operations on a volatile integer field to update state without locks.',
          'If the CAS operation fails because another thread changed the value, it retries until it succeeds.',
        ],
      },
    ],
  },
  {
    slug: 'proxy-vs-decorator',
    title: 'Proxy Pattern, Decorator, and Dynamic Proxies',
    topic: 'patterns',
    summary: 'Learn why proxies are used, how they differ from decorators, and how Java dynamic proxies enable runtime wrapping.',
    tags: ['Proxy', 'Decorator', 'Dynamic Proxy', 'Singleton'],
    sections: [
      {
        title: 'What is the Proxy Design Pattern?',
        content: [
          'A proxy provides a placeholder or surrogate for another object and controls access to it.',
          'It is often used to add security, logging, lazy initialization, or remote access without modifying the original object.',
        ],
      },
      {
        title: 'Proxy vs Decorator',
        content: [
          'A proxy focuses on controlling access or adding behavior before/after calls to the target object.',
          'A decorator focuses on extending behavior by wrapping the original object and preserving the same interface.',
        ],
      },
      {
        title: 'Why use Proxy?',
        content: [
          'Proxies allow cross-cutting concerns like caching, security checks, throttling, and transaction management to be added transparently.',
          'They make systems more modular by separating behavior from the core business object.',
        ],
      },
      {
        title: 'What is Dynamic Proxy?',
        content: [
          'Java dynamic proxies create proxy instances at runtime for a set of interfaces using `Proxy.newProxyInstance`.',
          'They are widely used by frameworks to implement AOP, remote stubs, and runtime behavior injection.',
        ],
      },
      {
        title: 'What is the Singleton Pattern?',
        content: [
          'The Singleton pattern restricts a class to a single instance and provides a global access point to it.',
          'It is commonly used for configuration managers, logging, or shared resources where only one instance should exist.',
        ],
      },
      {
        title: 'Eager vs Lazy Initialization',
        content: [
          'Eager initialization creates the Singleton instance when the class loads, ensuring thread safety but using resources immediately.',
          'Lazy initialization defers creation until first use, saving resources but requiring synchronization for thread safety.',
        ],
      },
    ],
    related: ['jmm-concurrency-primitives'],
  },
  {
    slug: 'oop-fundamentals',
    title: 'OOP Fundamentals: Classes, Objects, State, and Behavior',
    topic: 'oop-fundamentals',
    summary: 'Understand the core concepts of Object-Oriented Programming: classes, objects, state, and behavior.',
    tags: ['Class', 'Object', 'OOP', 'State', 'Behavior'],
    sections: [
      {
        title: 'What is a class in Java?',
        content: [
          'A class is a blueprint or template for creating objects. It defines the structure and behavior that objects of that class will have.',
          'Classes contain fields (variables) and methods (functions) that describe the properties and actions of objects.',
        ],
      },
      {
        title: 'What is an object?',
        content: [
          'An object is an instance of a class. It is a concrete entity created from the class blueprint.',
          'Objects have their own state (data) and can perform behaviors (methods) defined in the class.',
        ],
      },
      {
        title: 'What do you mean by the state and behavior of an object?',
        content: [
          'State refers to the data or properties of an object, stored in its fields/variables.',
          'Behavior refers to the actions an object can perform, implemented as methods.',
        ],
      },
      {
        title: 'What is Object-Oriented Programming (OOP)?',
        content: [
          'OOP is a programming paradigm based on the concept of objects, which contain data and code.',
          'Key principles include encapsulation, inheritance, polymorphism, and abstraction.',
        ],
      },
      {
        title: 'Hands-on Practice: OOP Fundamentals',
        content: [
          'Let\'s apply what we\'ve learned by creating a simple banking system with classes and objects.',
        ],
        tasks: [
          {
            title: 'Create a BankAccount Class',
            description: 'Design a BankAccount class with fields for account number, balance, and account holder name. Include methods for deposit, withdraw, and check balance.',
            hints: [
              'Use private fields for encapsulation',
              'Add validation in withdraw method to prevent negative balance',
              'Use this keyword to refer to instance variables'
            ],
            solution: `public class BankAccount {
    private String accountNumber;
    private double balance;
    private String accountHolderName;

    public BankAccount(String accountNumber, String accountHolderName) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = 0.0;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Insufficient funds or invalid amount");
        }
    }

    public double getBalance() {
        return balance;
    }

    public String getAccountInfo() {
        return "Account: " + accountNumber + ", Holder: " + accountHolderName + ", Balance: $" + balance;
    }
}`
          },
          {
            title: 'Create Multiple Objects',
            description: 'Create three different BankAccount objects and perform various operations on them to demonstrate object independence.',
            hints: [
              'Each object should have its own state',
              'Operations on one object shouldn\'t affect others',
              'Print account info after each operation'
            ],
            solution: `public class BankingDemo {
    public static void main(String[] args) {
        // Create three different accounts
        BankAccount account1 = new BankAccount("ACC001", "John Doe");
        BankAccount account2 = new BankAccount("ACC002", "Jane Smith");
        BankAccount account3 = new BankAccount("ACC003", "Bob Johnson");

        // Perform operations
        account1.deposit(1000);
        account2.deposit(500);
        account3.deposit(750);

        account1.withdraw(200);
        account2.withdraw(100);
        account3.withdraw(50);

        // Display account information
        System.out.println(account1.getAccountInfo());
        System.out.println(account2.getAccountInfo());
        System.out.println(account3.getAccountInfo());
    }
}`
          },
          {
            title: 'Add Constructor Overloading',
            description: 'Add multiple constructors to BankAccount class - one with initial balance and one without.',
            hints: [
              'Use constructor chaining with this()',
              'One constructor should call another to avoid code duplication',
              'Test both constructors'
            ],
            solution: `public class BankAccount {
    private String accountNumber;
    private double balance;
    private String accountHolderName;

    // Constructor without initial balance
    public BankAccount(String accountNumber, String accountHolderName) {
        this(accountNumber, accountHolderName, 0.0);
    }

    // Constructor with initial balance
    public BankAccount(String accountNumber, String accountHolderName, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = initialBalance;
    }

    // ... rest of the methods remain the same
}`
          }
        ]
      },
    ],
  },
  {
    slug: 'polymorphism-types',
    title: 'Polymorphism: Overloading vs Overriding',
    topic: 'polymorphism',
    summary: 'Explore compile-time and runtime polymorphism through method overloading and overriding.',
    tags: ['Polymorphism', 'Overloading', 'Overriding', 'Runtime', 'Compile-time'],
    sections: [
      {
        title: 'What is polymorphism in Java?',
        content: [
          'Polymorphism allows objects of different classes to be treated as objects of a common superclass.',
          'It enables one interface to be used for a general class of actions, with the specific action determined at runtime.',
        ],
      },
      {
        title: 'What are the different types of polymorphism?',
        content: [
          'Compile-time polymorphism (static): Achieved through method overloading.',
          'Runtime polymorphism (dynamic): Achieved through method overriding.',
        ],
      },
      {
        title: 'What is compile-time polymorphism (method overloading)?',
        content: [
          'Method overloading allows multiple methods with the same name but different parameters in the same class.',
          'The correct method is chosen at compile time based on the method signature.',
        ],
        code: `public void print(String s) { System.out.println(s); }\npublic void print(int i) { System.out.println(i); }`,
      },
      {
        title: 'What is runtime polymorphism (method overriding)?',
        content: [
          'Method overriding allows a subclass to provide a specific implementation of a method already defined in its superclass.',
          'The method to be called is determined at runtime based on the actual object type.',
        ],
        code: `class Animal {\n  void sound() { System.out.println("Animal sound"); }\n}\nclass Dog extends Animal {\n  void sound() { System.out.println("Woof"); }\n}`,
      },
      {
        title: 'What rules must be followed when implementing method overloading?',
        content: [
          'Methods must have the same name but different parameter lists (type, number, or order).',
          'Return type can be different, but parameter list must differ.',
          'Access modifiers can be different.',
        ],
      },
      {
        title: 'What rules must be followed when implementing method overriding?',
        content: [
          'Method signature (name, parameters) must be identical.',
          'Return type must be the same or covariant (subclass).',
          'Access modifier must be the same or more accessible.',
          'Cannot override static or final methods.',
        ],
      },
      {
        title: 'Practice Tasks: Polymorphism in Action',
        content: [
          'Let\'s practice both compile-time and runtime polymorphism with practical examples.',
        ],
        tasks: [
          {
            title: 'Method Overloading Calculator',
            description: 'Create a Calculator class with overloaded add methods for different parameter types (int, double, three parameters).',
            hints: [
              'Use same method name "add" with different parameter lists',
              'Handle int, double, and multiple parameters',
              'Test all overloaded methods'
            ],
            solution: `public class Calculator {
    // Method overloading - different parameter types
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }

    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println("2 + 3 = " + calc.add(2, 3));
        System.out.println("2.5 + 3.7 = " + calc.add(2.5, 3.7));
        System.out.println("1 + 2 + 3 = " + calc.add(1, 2, 3));
    }
}`
          },
          {
            title: 'Runtime Polymorphism with Shapes',
            description: 'Create an abstract Shape class with area() method, then implement Circle and Rectangle classes that override it.',
            hints: [
              'Create abstract Shape class with abstract area() method',
              'Circle and Rectangle should extend Shape',
              'Use Math.PI for circle area calculation',
              'Demonstrate polymorphism by calling area() on different shape objects'
            ],
            solution: `abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    double area() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double length, width;

    public Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }

    @Override
    double area() {
        return length * width;
    }
}

public class ShapeDemo {
    public static void main(String[] args) {
        Shape circle = new Circle(5);
        Shape rectangle = new Rectangle(4, 6);

        System.out.println("Circle area: " + circle.area());
        System.out.println("Rectangle area: " + rectangle.area());
    }
}`
          },
          {
            title: 'Polymorphic Method Calls',
            description: 'Create a method that accepts Shape parameter and calls area() - demonstrate how the correct implementation is called at runtime.',
            hints: [
              'Create a method that takes Shape as parameter',
              'Call area() method on the parameter',
              'Pass different shape objects to see runtime polymorphism'
            ],
            solution: `public class PolymorphismDemo {
    public static void printArea(Shape shape) {
        System.out.println("Area: " + shape.area());
    }

    public static void main(String[] args) {
        Shape circle = new Circle(3);
        Shape rectangle = new Rectangle(5, 7);

        // Runtime polymorphism - correct method called based on actual object type
        printArea(circle);      // Calls Circle.area()
        printArea(rectangle);   // Calls Rectangle.area()
    }
}`
          }
        ]
      },
    ],
  },
  {
    slug: 'encapsulation-abstraction',
    title: 'Encapsulation & Abstraction: Abstract Classes vs Interfaces',
    topic: 'encapsulation-abstraction',
    summary: 'Learn encapsulation, abstraction, abstract classes vs interfaces, and when to use each.',
    tags: ['Encapsulation', 'Abstraction', 'Abstract Class', 'Interface'],
    sections: [
      {
        title: 'What is encapsulation?',
        content: [
          'Encapsulation is the bundling of data and methods that operate on that data within a single unit (class).',
          'It restricts direct access to some of an object\'s components, protecting the integrity of the data.',
        ],
      },
      {
        title: 'What is abstraction?',
        content: [
          'Abstraction is the process of hiding complex implementation details and showing only the essential features.',
          'It focuses on what an object does rather than how it does it.',
        ],
      },
      {
        title: 'What is the difference between an abstract class and an interface?',
        content: [
          'Abstract classes can have both abstract and concrete methods, while interfaces can only have abstract methods (before Java 8).',
          'Abstract classes support single inheritance, interfaces support multiple inheritance.',
          'Abstract classes can have constructors and instance variables, interfaces cannot.',
        ],
      },
      {
        title: 'When should you use an abstract class vs an interface?',
        content: [
          'Use abstract classes when you want to share code among closely related classes.',
          'Use interfaces when you want to define a contract for unrelated classes or support multiple inheritance.',
        ],
      },
      {
        title: 'What is the difference between a concrete method and an abstract method?',
        content: [
          'A concrete method has a complete implementation with a method body.',
          'An abstract method has no implementation (just a declaration) and must be implemented by subclasses.',
        ],
      },
      {
        title: 'Why can an abstract class have a constructor even though it cannot be instantiated?',
        content: [
          'Abstract classes can have constructors to initialize fields that are inherited by subclasses.',
          'Subclasses call the abstract class constructor using super() to properly initialize the inherited state.',
        ],
      },
    ],
  },
  {
    slug: 'inheritance-diamond',
    title: 'Inheritance: Extends, Implements, and Diamond Problem',
    topic: 'inheritance',
    summary: 'Understand inheritance, extends vs implements, and how Java resolves the diamond problem.',
    tags: ['Inheritance', 'Extends', 'Implements', 'Diamond Problem'],
    sections: [
      {
        title: 'What is inheritance in Java?',
        content: [
          'Inheritance allows a class (subclass) to inherit properties and methods from another class (superclass).',
          'It promotes code reuse and establishes an "is-a" relationship between classes.',
        ],
      },
      {
        title: 'What is the difference between extends and implements?',
        content: [
          'extends is used to inherit from a class (single inheritance).',
          'implements is used to implement interfaces (multiple inheritance of type).',
        ],
      },
      {
        title: 'What is the diamond problem in Java?',
        content: [
          'The diamond problem occurs in multiple inheritance when a class inherits from two classes that have a common ancestor.',
          'It can lead to ambiguity about which method or property to inherit.',
        ],
      },
      {
        title: 'How does Java resolve the diamond problem?',
        content: [
          'Java avoids the diamond problem by not supporting multiple inheritance of classes.',
          'It uses interfaces for multiple inheritance, and the implementing class must provide implementations for conflicting methods.',
        ],
      },
    ],
  },
  {
    slug: 'data-types-wrappers',
    title: 'Data Types: Primitives, Wrappers, Autoboxing, and Unboxing',
    topic: 'data-types',
    summary: 'Learn about primitive types, wrapper classes, autoboxing, unboxing, and default values.',
    tags: ['Primitives', 'Wrappers', 'Autoboxing', 'Unboxing'],
    sections: [
      {
        title: 'What is the difference between primitive types, wrapper classes, and reference types?',
        content: [
          'Primitive types (int, boolean, etc.) are basic data types stored directly in memory.',
          'Wrapper classes (Integer, Boolean, etc.) are objects that wrap primitive values.',
          'Reference types are objects stored on the heap, accessed via references.',
        ],
      },
      {
        title: 'What is the difference between autoboxing and unboxing?',
        content: [
          'Autoboxing automatically converts a primitive to its corresponding wrapper class.',
          'Unboxing automatically converts a wrapper class to its corresponding primitive.',
        ],
        code: `Integer i = 5; // autoboxing\nint j = i; // unboxing`,
      },
      {
        title: 'What are the default values of primitive types and wrapper types?',
        content: [
          'Primitive defaults: int=0, boolean=false, char=\'\u0000\', etc.',
          'Wrapper defaults: null (since they are objects).',
        ],
      },
    ],
  },
  {
    slug: 'string-concepts',
    title: 'String Concepts: Immutability, Builders, and Constant Pool',
    topic: 'strings',
    summary: 'Understand String immutability, StringBuilder vs StringBuffer, and the String Constant Pool.',
    tags: ['String', 'StringBuilder', 'StringBuffer', 'Immutable', 'Constant Pool'],
    sections: [
      {
        title: 'What is the difference between String, StringBuilder, and StringBuffer?',
        content: [
          'String is immutable; operations create new strings.',
          'StringBuilder is mutable and not thread-safe; faster for single-threaded modifications.',
          'StringBuffer is mutable and thread-safe; slower due to synchronization.',
        ],
      },
      {
        title: 'Why is String immutable in Java?',
        content: [
          'String immutability ensures thread safety, security (e.g., database passwords), and enables string pooling.',
          'It allows strings to be shared without fear of modification.',
        ],
      },
      {
        title: 'What happens when you create a String using the new keyword versus using string literals ("")?',
        content: [
          'new String("hello") creates a new object on the heap.',
          'String literals ("hello") check the constant pool first; if exists, returns reference, else creates new.',
        ],
      },
      {
        title: 'What is the String Constant Pool?',
        content: [
          'The String Constant Pool is a special memory area in the heap that stores unique string literals.',
          'It optimizes memory usage by reusing identical strings.',
        ],
      },
    ],
  },
  {
    slug: 'final-immutable-threadsafe',
    title: 'final Keyword, Immutable Classes, and Thread Safety',
    topic: 'keywords-immutability',
    summary: 'Learn about final keyword, creating immutable classes, and thread safety concepts.',
    tags: ['final', 'Immutable', 'Thread Safety'],
    sections: [
      {
        title: 'What is the final keyword in Java?',
        content: [
          'final variables cannot be reassigned after initialization.',
          'final methods cannot be overridden.',
          'final classes cannot be subclassed.',
        ],
      },
      {
        title: 'How can you make a class immutable?',
        content: [
          'Declare the class as final.',
          'Make all fields private and final.',
          'Provide only getters, no setters.',
          'Ensure mutable fields are defensively copied.',
        ],
      },
      {
        title: 'StringBuffer is thread-safe — what does thread safety mean?',
        content: [
          'Thread safety means the class can be safely used in multi-threaded environments.',
          'Multiple threads can access the same StringBuffer instance without causing data corruption.',
        ],
      },
    ],
  },
  {
    slug: 'access-modifiers-scope',
    title: 'Access Modifiers: public, protected, default, private',
    topic: 'access-modifiers',
    summary: 'Understand the scope and usage of Java access modifiers.',
    tags: ['Access Modifiers', 'public', 'protected', 'private', 'default'],
    sections: [
      {
        title: 'What are access modifiers in Java?',
        content: [
          'Access modifiers control the visibility and accessibility of classes, methods, and fields.',
          'They help implement encapsulation and information hiding.',
        ],
      },
      {
        title: 'What is the scope of public, protected, default, and private access modifiers?',
        content: [
          'public: Accessible from anywhere.',
          'protected: Accessible within the same package and subclasses.',
          'default (no modifier): Accessible within the same package.',
          'private: Accessible only within the same class.',
        ],
      },
    ],
  },
  {
    slug: 'constructors-overloading',
    title: 'Constructors and Constructor Overloading',
    topic: 'constructors',
    summary: 'Learn about constructors, their purpose, and constructor overloading.',
    tags: ['Constructor', 'Overloading', 'Initialization'],
    sections: [
      {
        title: 'What is a constructor?',
        content: [
          'A constructor is a special method called when an object is instantiated.',
          'It initializes the object\'s state and has the same name as the class.',
        ],
      },
      {
        title: 'What is constructor overloading?',
        content: [
          'Constructor overloading allows multiple constructors with different parameter lists.',
          'It provides flexibility in object creation with different initialization options.',
        ],
        code: `public MyClass() { }\npublic MyClass(int x) { this.x = x; }`,
      },
    ],
  },
  {
    slug: 'this-super-keywords',
    title: 'this and super Keywords: Usage and Differences',
    topic: 'this-super',
    summary: 'Understand the differences between this and super, and when to use this() and super().',
    tags: ['this', 'super', 'this()', 'super()'],
    sections: [
      {
        title: 'What is the difference between this and super keywords?',
        content: [
          'this refers to the current instance of the class.',
          'super refers to the superclass instance.',
        ],
      },
      {
        title: 'When do you use the this keyword?',
        content: [
          'To refer to current class instance variables.',
          'To call current class constructors (this()).',
          'To pass current object as parameter.',
        ],
      },
      {
        title: 'What is the difference between this() and super()?',
        content: [
          'this() calls another constructor in the same class.',
          'super() calls a constructor in the superclass.',
        ],
      },
      {
        title: 'When should this() and super() be used?',
        content: [
          'this() is used for constructor chaining within the same class.',
          'super() is used to call superclass constructors and must be the first statement.',
        ],
      },
    ],
  },
  {
    slug: 'method-calls-memory',
    title: 'Method Calls, Pass-by-Value, and JVM Memory Areas',
    topic: 'method-calls-memory',
    summary: 'Explore how objects are passed to methods and understand Heap vs Stack memory.',
    tags: ['Pass-by-value', 'Pass-by-reference', 'Heap', 'Stack'],
    sections: [
      {
        title: 'How can you pass an object as a parameter to a method?',
        content: [
          'Objects are passed by reference (the reference is passed by value).',
          'Changes to the object inside the method affect the original object.',
        ],
        code: `public void modify(MyClass obj) {\n  obj.value = 10; // affects original\n}`,
      },
      {
        title: 'Does Java use pass-by-value or pass-by-reference? Explain both concepts.',
        content: [
          'Java uses pass-by-value for all parameters.',
          'For primitives: the value is copied.',
          'For objects: the reference (memory address) is copied by value.',
        ],
      },
      {
        title: 'What is Heap and Stack in the JVM memory areas?',
        content: [
          'Stack: Stores method call frames, local variables, and references. LIFO structure.',
          'Heap: Stores objects and arrays. Managed by garbage collector.',
        ],
      },
    ],
  },
  {
    slug: 'static-vs-nonstatic',
    title: 'Static vs Non-Static Members',
    topic: 'static-concepts',
    summary: 'Understand the differences between static and non-static members and how they are accessed.',
    tags: ['static', 'non-static', 'Members'],
    sections: [
      {
        title: 'What is the difference between static and non-static members of a class?',
        content: [
          'Static members belong to the class itself, shared among all instances.',
          'Non-static (instance) members belong to individual objects.',
        ],
      },
      {
        title: 'How are static and non-static members accessed?',
        content: [
          'Static: ClassName.member or instance.member (not recommended).',
          'Non-static: instance.member.',
        ],
        code: `MyClass.staticMethod(); // static\nobj.instanceMethod(); // non-static`,
      },
    ],
  },
  {
    slug: 'exception-handling',
    title: 'Exception Handling: Types, finally, throw vs throws',
    topic: 'exception-handling',
    summary: 'Master exception types, handling mechanisms, finally block, and custom exceptions.',
    tags: ['Exception', 'try-catch', 'finally', 'throw', 'throws'],
    sections: [
      {
        title: 'What is an exception in Java?',
        content: [
          'An exception is an event that occurs during program execution that disrupts the normal flow.',
          'It represents an error condition that can be handled.',
        ],
      },
      {
        title: 'What are the different types of exceptions?',
        content: [
          'Checked exceptions: Checked at compile time (e.g., IOException).',
          'Unchecked exceptions: Runtime exceptions (e.g., NullPointerException).',
          'Errors: Serious problems (e.g., OutOfMemoryError).',
        ],
      },
      {
        title: 'How do you handle exceptions in Java?',
        content: [
          'Use try-catch blocks to catch and handle exceptions.',
          'Use try-catch-finally for cleanup code.',
        ],
        code: `try {\n  // risky code\n} catch (Exception e) {\n  // handle\n} finally {\n  // cleanup\n}`,
      },
      {
        title: 'What is the purpose of the finally block?',
        content: [
          'The finally block executes regardless of whether an exception occurs.',
          'It is used for cleanup operations like closing resources.',
        ],
      },
      {
        title: 'What is the difference between throw and throws?',
        content: [
          'throw is used to explicitly throw an exception.',
          'throws declares that a method may throw exceptions.',
        ],
      },
      {
        title: 'What is a custom (user-defined) exception?',
        content: [
          'A custom exception is a user-defined class that extends Exception or RuntimeException.',
          'It allows creating application-specific error conditions.',
        ],
        code: `class MyException extends Exception {\n  public MyException(String message) {\n    super(message);\n  }\n}`,
      },
    ],
  },
  {
    slug: 'comparison-equals',
    title: 'Comparison: == Operator vs equals() Method',
    topic: 'comparison',
    summary: 'Learn the critical differences between == and equals() for object comparison.',
    tags: ['==', 'equals()', 'Comparison'],
    sections: [
      {
        title: 'What is the difference between == operator and .equals() method?',
        content: [
          '== compares reference equality (memory addresses).',
          '.equals() compares value equality (content).',
          'For primitives, == compares values; for objects, == compares references.',
        ],
      },
    ],
  },
  {
    slug: 'generics-advantages',
    title: 'Generics in Java: Type Safety and Advantages',
    topic: 'generics',
    summary: 'Understand Generics and their benefits for type-safe collections and methods.',
    tags: ['Generics', 'Type Safety'],
    sections: [
      {
        title: 'What are Generics in Java?',
        content: [
          'Generics allow types to be parameters when defining classes, interfaces, and methods.',
          'They enable type-safe collections and compile-time type checking.',
        ],
        code: `List<String> list = new ArrayList<>();`,
      },
      {
        title: 'What are their advantages?',
        content: [
          'Type safety: Prevents ClassCastException at runtime.',
          'Code reusability: Same code works with different types.',
          'Compile-time checking: Catches type errors early.',
        ],
      },
    ],
  },
  {
    slug: 'collections-framework',
    title: 'Collections Framework: List, Set, Queue, Map',
    topic: 'collections',
    summary: 'Explore the Collections hierarchy, implementations, and common issues like ConcurrentModificationException.',
    tags: ['Collections', 'List', 'Set', 'Queue', 'Map', 'HashMap'],
    sections: [
      {
        title: 'Understand the Collections Framework hierarchy.',
        content: [
          'Collection (interface): Root of collection hierarchy.',
          'List: Ordered collection, allows duplicates.',
          'Set: Unordered collection, no duplicates.',
          'Queue: FIFO data structure.',
          'Map: Key-value pairs.',
        ],
      },
      {
        title: 'What is a List? Differences between ArrayList, LinkedList, Stack, Vector.',
        content: [
          'ArrayList: Dynamic array, fast random access, slow insertions/deletions.',
          'LinkedList: Doubly-linked list, fast insertions/deletions, slow random access.',
          'Stack: LIFO structure, extends Vector.',
          'Vector: Synchronized ArrayList, thread-safe but slower.',
        ],
      },
      {
        title: 'What is ConcurrentModificationException?',
        content: [
          'Thrown when a collection is modified while iterating over it.',
          'Happens with fail-fast iterators when structural changes occur during iteration.',
        ],
      },
      {
        title: 'What are fail-fast vs fail-safe iterators?',
        content: [
          'Fail-fast: Throws ConcurrentModificationException on concurrent modification.',
          'Fail-safe: Works on a copy, doesn\'t throw exception but may not reflect latest changes.',
        ],
      },
      {
        title: 'What is a Set? Differences between HashSet, LinkedHashSet, TreeSet.',
        content: [
          'HashSet: Hash table, no order, fast operations.',
          'LinkedHashSet: Maintains insertion order.',
          'TreeSet: Sorted set, implements NavigableSet.',
        ],
      },
      {
        title: 'What is a Queue? PriorityQueue, Deque, ArrayDeque.',
        content: [
          'Queue: FIFO, PriorityQueue uses heap for ordering.',
          'Deque: Double-ended queue, ArrayDeque is efficient implementation.',
        ],
      },
      {
        title: 'What is a Map? Differences between HashMap, LinkedHashMap, TreeMap.',
        content: [
          'HashMap: Hash table, no order.',
          'LinkedHashMap: Maintains insertion order.',
          'TreeMap: Sorted map, implements NavigableMap.',
        ],
      },
      {
        title: 'How does HashMap work internally? Java 8 enhancements.',
        content: [
          'Uses hash table with buckets and linked lists/chains.',
          'Java 8: Converts to balanced tree when chains get too long.',
        ],
      },
      {
        title: 'How does collision handling work in HashMap?',
        content: [
          'Collisions occur when different keys hash to same bucket.',
          'Handled by linked lists (Java 7) or trees (Java 8+).',
        ],
      },
      {
        title: 'What is the contract between hashcode and equals?',
        content: [
          'If two objects are equal, they must have same hashcode.',
          'If two objects have same hashcode, they may or may not be equal.',
        ],
      },
      {
        title: 'Implement a Stack using Deque.',
        content: [
          'Deque<Integer> stack = new ArrayDeque<>();',
          'stack.push(1); stack.pop();',
        ],
      },
      {
        title: 'What is the difference between Comparable and Comparator?',
        content: [
          'Comparable: Defines natural ordering within the class.',
          'Comparator: Defines custom ordering, can be passed to sort methods.',
        ],
      },
      {
        title: 'Hands-on Collections Practice',
        content: [
          'Let\'s implement practical examples using different collection types to understand their behavior and use cases.',
        ],
        tasks: [
          {
            title: 'Student Grade Management System',
            description: 'Create a system to manage student grades using different collections: List for grades, Set for unique subjects, Map for student-subject-grade mapping.',
            hints: [
              'Use ArrayList for storing grades',
              'Use HashSet for unique subjects',
              'Use HashMap for student-grade mapping',
              'Implement methods to add grades, calculate averages, find top performers'
            ],
            solution: `import java.util.*;

public class GradeManagementSystem {
    private Map<String, List<Integer>> studentGrades = new HashMap<>();
    private Set<String> subjects = new HashSet<>();

    public void addGrade(String student, String subject, int grade) {
        studentGrades.computeIfAbsent(student, k -> new ArrayList<>()).add(grade);
        subjects.add(subject);
    }

    public double getAverageGrade(String student) {
        List<Integer> grades = studentGrades.get(student);
        if (grades == null || grades.isEmpty()) return 0.0;
        return grades.stream().mapToInt(Integer::intValue).average().orElse(0.0);
    }

    public List<String> getTopPerformers(int threshold) {
        List<String> topStudents = new ArrayList<>();
        for (Map.Entry<String, List<Integer>> entry : studentGrades.entrySet()) {
            double avg = getAverageGrade(entry.getKey());
            if (avg >= threshold) {
                topStudents.add(entry.getKey());
            }
        }
        return topStudents;
    }

    public void displayAllSubjects() {
        System.out.println("Available subjects: " + subjects);
    }
}`
          },
          {
            title: 'Custom Comparator for Employee Sorting',
            description: 'Create Employee class with Comparable for natural ordering by salary, and Comparator for custom sorting by name or department.',
            hints: [
              'Implement Comparable<Employee> in Employee class',
              'Create separate Comparator classes or lambda expressions',
              'Test sorting by different criteria',
              'Use Collections.sort() or List.sort()'
            ],
            solution: `import java.util.*;

class Employee implements Comparable<Employee> {
    private String name;
    private String department;
    private double salary;

    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    // Natural ordering by salary
    @Override
    public int compareTo(Employee other) {
        return Double.compare(this.salary, other.salary);
    }

    // Getters
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }

    @Override
    public String toString() {
        return name + " (" + department + ") - $" + salary;
    }
}

public class EmployeeSortingDemo {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee("Alice", "Engineering", 75000),
            new Employee("Bob", "Marketing", 65000),
            new Employee("Charlie", "Engineering", 80000),
            new Employee("Diana", "HR", 60000)
        );

        // Sort by natural order (salary)
        Collections.sort(employees);
        System.out.println("Sorted by salary: " + employees);

        // Sort by name using Comparator
        employees.sort(Comparator.comparing(Employee::getName));
        System.out.println("Sorted by name: " + employees);

        // Sort by department, then salary
        employees.sort(Comparator.comparing(Employee::getDepartment)
                              .thenComparing(Employee::getSalary));
        System.out.println("Sorted by department then salary: " + employees);
    }
}`
          },
          {
            title: 'Understanding ConcurrentModificationException',
            description: 'Demonstrate ConcurrentModificationException and show how to fix it using Iterator.remove() or creating a copy.',
            hints: [
              'Try to modify ArrayList while iterating with enhanced for loop',
              'Catch the ConcurrentModificationException',
              'Fix using Iterator.remove() or creating a copy of the list',
              'Compare fail-fast vs fail-safe approaches'
            ],
            solution: `import java.util.*;

public class ConcurrentModificationDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(Arrays.asList("Alice", "Bob", "Charlie", "Diana"));

        // This will throw ConcurrentModificationException
        try {
            for (String name : names) {
                if (name.startsWith("B")) {
                    names.remove(name); // Modifying while iterating
                }
            }
        } catch (ConcurrentModificationException e) {
            System.out.println("ConcurrentModificationException caught: " + e.getMessage());
        }

        // Safe way using Iterator
        names = new ArrayList<>(Arrays.asList("Alice", "Bob", "Charlie", "Diana"));
        Iterator<String> iterator = names.iterator();
        while (iterator.hasNext()) {
            String name = iterator.next();
            if (name.startsWith("B")) {
                iterator.remove(); // Safe removal
            }
        }
        System.out.println("After safe removal: " + names);

        // Alternative: Create a copy
        names = new ArrayList<>(Arrays.asList("Alice", "Bob", "Charlie", "Diana"));
        List<String> copy = new ArrayList<>(names);
        for (String name : copy) {
            if (name.startsWith("C")) {
                names.remove(name); // Remove from original
            }
        }
        System.out.println("After removal from copy: " + names);
    }
}`
          },
          {
            title: 'Implement Stack using Deque',
            description: 'Implement a custom Stack class using ArrayDeque and compare it with Java\'s Stack class.',
            hints: [
              'Use ArrayDeque as the underlying data structure',
              'Implement push(), pop(), peek(), isEmpty() methods',
              'Compare performance and thread-safety with java.util.Stack',
              'Test LIFO behavior'
            ],
            solution: `import java.util.*;

public class CustomStack<T> {
    private Deque<T> deque = new ArrayDeque<>();

    public void push(T item) {
        deque.push(item);
    }

    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return deque.pop();
    }

    public T peek() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return deque.peek();
    }

    public boolean isEmpty() {
        return deque.isEmpty();
    }

    public int size() {
        return deque.size();
    }
}

public class StackComparisonDemo {
    public static void main(String[] args) {
        // Test custom stack
        CustomStack<String> customStack = new CustomStack<>();
        customStack.push("First");
        customStack.push("Second");
        customStack.push("Third");

        System.out.println("Custom Stack operations:");
        System.out.println("Peek: " + customStack.peek());
        System.out.println("Pop: " + customStack.pop());
        System.out.println("Pop: " + customStack.pop());
        System.out.println("Size: " + customStack.size());

        // Compare with Java's Stack
        Stack<String> javaStack = new Stack<>();
        javaStack.push("First");
        javaStack.push("Second");
        javaStack.push("Third");

        System.out.println("\nJava Stack operations:");
        System.out.println("Peek: " + javaStack.peek());
        System.out.println("Pop: " + javaStack.pop());
        System.out.println("Pop: " + javaStack.pop());
        System.out.println("Size: " + javaStack.size());
    }
}`
          }
        ]
      },
    ],
  },
  {
    slug: 'lambda-functional-interfaces',
    title: 'Lambda Expressions and Functional Interfaces',
    topic: 'lambda-functional',
    summary: 'Learn lambda expressions, functional interfaces, and @FunctionalInterface annotation.',
    tags: ['Lambda', 'Functional Interface', '@FunctionalInterface'],
    sections: [
      {
        title: 'What is a lambda expression?',
        content: [
          'A lambda expression is a concise way to represent an anonymous function.',
          'It can be used wherever a functional interface is expected.',
        ],
        code: `(int a, int b) -> a + b`,
      },
      {
        title: 'What is a functional interface?',
        content: [
          'A functional interface has exactly one abstract method.',
          'It can have default and static methods.',
        ],
      },
      {
        title: 'What is @FunctionalInterface annotation?',
        content: [
          'Marks an interface as functional, ensuring it has exactly one abstract method.',
          'Provides compile-time checking.',
        ],
      },
      {
        title: 'Which functional interfaces were introduced before and after Java 8?',
        content: [
          'Before Java 8: None specifically for lambdas.',
          'Java 8: Predicate, Function, Consumer, Supplier, etc.',
        ],
      },
    ],
  },
  {
    slug: 'stream-api-operations',
    title: 'Stream API: Operations, Methods, and Optional',
    topic: 'streams',
    summary: 'Master Stream API operations, intermediate vs terminal, and Optional class.',
    tags: ['Stream', 'map', 'filter', 'collect', 'Optional'],
    sections: [
      {
        title: 'What is the Stream API?',
        content: [
          'Stream API provides functional-style operations on collections.',
          'Supports parallel processing and lazy evaluation.',
        ],
      },
      {
        title: 'What is the difference between collections and streams?',
        content: [
          'Collections are data structures storing elements.',
          'Streams are sequences of elements supporting functional operations.',
        ],
      },
      {
        title: 'What is the difference between intermediate and terminal operations?',
        content: [
          'Intermediate: Return a new stream (lazy), e.g., filter, map.',
          'Terminal: Produce a result or side-effect, e.g., collect, forEach.',
        ],
      },
      {
        title: 'Explain map() vs flatMap()',
        content: [
          'map(): Transforms each element to another element.',
          'flatMap(): Transforms each element to a stream and flattens the result.',
        ],
      },
      {
        title: 'What is filter()?',
        content: [
          'filter() selects elements matching a predicate.',
          'Returns a stream of matching elements.',
        ],
        code: `stream.filter(x -> x > 5)`,
      },
      {
        title: 'What is distinct()?',
        content: [
          'distinct() removes duplicate elements based on equals().',
          'Returns a stream with unique elements.',
        ],
      },
      {
        title: 'What is sorted()?',
        content: [
          'sorted() sorts elements using natural or custom comparator.',
          'Returns a sorted stream.',
        ],
      },
      {
        title: 'What is collect()?',
        content: [
          'collect() accumulates stream elements into a collection.',
          'Uses Collector to specify the result type.',
        ],
        code: `stream.collect(Collectors.toList())`,
      },
      {
        title: 'What is reduce()?',
        content: [
          'reduce() combines stream elements into a single result.',
          'Takes an identity and accumulator function.',
        ],
      },
      {
        title: 'What is forEach()?',
        content: [
          'forEach() performs an action on each element.',
          'Terminal operation, no return value.',
        ],
      },
      {
        title: 'What is count()?',
        content: [
          'count() returns the number of elements in the stream.',
          'Terminal operation returning long.',
        ],
      },
      {
        title: 'Difference between max() and min()?',
        content: [
          'Both return Optional with maximum/minimum element.',
          'Use comparator for custom ordering.',
        ],
      },
      {
        title: 'What is toList()?',
        content: [
          'toList() collects stream elements into an immutable List.',
          'Convenient method for Collectors.toList().',
        ],
      },
      {
        title: 'What is groupingBy()?',
        content: [
          'groupingBy() groups elements by a classifier function.',
          'Returns a Map with groups as values.',
        ],
        code: `stream.collect(Collectors.groupingBy(Person::getCity))`,
      },
      {
        title: 'What are anyMatch(), noneMatch() and allMatch()?',
        content: [
          'anyMatch(): True if any element matches predicate.',
          'noneMatch(): True if no elements match predicate.',
          'allMatch(): True if all elements match predicate.',
        ],
      },
      {
        title: 'Difference between stream() and parallelStream()',
        content: [
          'stream(): Sequential processing.',
          'parallelStream(): Parallel processing using ForkJoinPool.',
        ],
      },
      {
        title: 'What is findFirst()?',
        content: [
          'findFirst() returns Optional with first element.',
          'Short-circuiting terminal operation.',
        ],
      },
      {
        title: 'What is limit()?',
        content: [
          'limit(n) truncates stream to first n elements.',
          'Intermediate operation.',
        ],
      },
      {
        title: 'What is Optional?',
        content: [
          'Optional is a container that may or may not contain a value.',
          'Helps avoid NullPointerException.',
        ],
      },
      {
        title: 'Difference between ifPresent() and isPresent()',
        content: [
          'isPresent(): Returns true if value is present.',
          'ifPresent(): Executes action if value is present.',
        ],
      },
      {
        title: 'Difference between orElse(), orElseGet(), and orElseThrow()',
        content: [
          'orElse(): Returns value or default.',
          'orElseGet(): Returns value or calls supplier for default.',
          'orElseThrow(): Returns value or throws exception.',
        ],
      },
      {
        title: 'Difference between of() and ofNullable()',
        content: [
          'of(): Creates Optional with non-null value.',
          'ofNullable(): Creates Optional that may be empty.',
        ],
      },
      {
        title: 'What is a method reference?',
        content: [
          'Method reference is shorthand for lambda expressions.',
          'Syntax: Class::method or object::method.',
        ],
        code: `list.forEach(System.out::println)`,
      },
      {
        title: 'Stream API Practice Exercises',
        content: [
          'Let\'s practice Stream API operations with real-world data processing scenarios.',
        ],
        tasks: [
          {
            title: 'Employee Data Processing',
            description: 'Given a list of employees, use Stream API to filter high earners, calculate averages, group by department, and find top performers.',
            hints: [
              'Create Employee class with name, department, salary fields',
              'Use filter() for high earners (> $50k)',
              'Use mapToDouble() and average() for department averages',
              'Use Collectors.groupingBy() for department grouping',
              'Use sorted() and limit() for top performers'
            ],
            solution: `import java.util.*;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private String department;
    private double salary;

    public Employee(String name, String department, double salary) {
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    // Getters
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public double getSalary() { return salary; }

    @Override
    public String toString() {
        return name + " ($" + salary + ")";
    }
}

public class EmployeeStreamProcessing {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee("Alice", "Engineering", 75000),
            new Employee("Bob", "Engineering", 65000),
            new Employee("Charlie", "Marketing", 55000),
            new Employee("Diana", "Marketing", 60000),
            new Employee("Eve", "HR", 50000),
            new Employee("Frank", "Engineering", 80000)
        );

        // 1. Filter high earners (> $60k)
        List<Employee> highEarners = employees.stream()
            .filter(emp -> emp.getSalary() > 60000)
            .collect(Collectors.toList());
        System.out.println("High earners: " + highEarners);

        // 2. Calculate average salary by department
        Map<String, Double> avgByDept = employees.stream()
            .collect(Collectors.groupingBy(
                Employee::getDepartment,
                Collectors.averagingDouble(Employee::getSalary)
            ));
        System.out.println("Average salary by department: " + avgByDept);

        // 3. Find top 3 highest paid employees
        List<Employee> topEarners = employees.stream()
            .sorted(Comparator.comparingDouble(Employee::getSalary).reversed())
            .limit(3)
            .collect(Collectors.toList());
        System.out.println("Top 3 earners: " + topEarners);

        // 4. Check if any employee earns more than $70k
        boolean hasHighEarner = employees.stream()
            .anyMatch(emp -> emp.getSalary() > 70000);
        System.out.println("Has employee earning > $70k: " + hasHighEarner);
    }
}`
          },
          {
            title: 'Text Processing with Streams',
            description: 'Process a list of sentences: count words, find unique words, group by word length, and find most frequent words.',
            hints: [
              'Use flatMap() to split sentences into words',
              'Use distinct() for unique words',
              'Use Collectors.groupingBy() with word length',
              'Use Collectors.groupingBy() with counting for frequency',
              'Use sorted() and limit() for most frequent'
            ],
            solution: `import java.util.*;
import java.util.stream.Collectors;

public class TextProcessingStreams {
    public static void main(String[] args) {
        List<String> sentences = Arrays.asList(
            "The quick brown fox jumps over the lazy dog",
            "Java streams are powerful for data processing",
            "Functional programming with lambdas is elegant",
            "Collections and streams work great together"
        );

        // 1. Count total words
        long totalWords = sentences.stream()
            .flatMap(sentence -> Arrays.stream(sentence.split("\\s+")))
            .count();
        System.out.println("Total words: " + totalWords);

        // 2. Find unique words (case insensitive)
        List<String> uniqueWords = sentences.stream()
            .flatMap(sentence -> Arrays.stream(sentence.toLowerCase().split("\\s+")))
            .distinct()
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Unique words: " + uniqueWords);

        // 3. Group words by length
        Map<Integer, List<String>> wordsByLength = sentences.stream()
            .flatMap(sentence -> Arrays.stream(sentence.toLowerCase().split("\\s+")))
            .distinct()
            .collect(Collectors.groupingBy(String::length));
        System.out.println("Words by length: " + wordsByLength);

        // 4. Find most frequent words
        Map<String, Long> wordFrequency = sentences.stream()
            .flatMap(sentence -> Arrays.stream(sentence.toLowerCase().split("\\s+")))
            .collect(Collectors.groupingBy(word -> word, Collectors.counting()));

        List<Map.Entry<String, Long>> mostFrequent = wordFrequency.entrySet().stream()
            .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
            .limit(5)
            .collect(Collectors.toList());
        System.out.println("Most frequent words: " + mostFrequent);
    }
}`
          },
          {
            title: 'Optional Handling Practice',
            description: 'Practice Optional operations: create Optionals, handle empty cases, chain operations, and provide defaults.',
            hints: [
              'Use Optional.of(), Optional.ofNullable(), Optional.empty()',
              'Use ifPresent(), orElse(), orElseGet(), orElseThrow()',
              'Chain operations with map(), filter(), flatMap()',
              'Handle null values safely'
            ],
            solution: `import java.util.Optional;

public class OptionalPractice {
    public static void main(String[] args) {
        // 1. Creating Optionals
        Optional<String> present = Optional.of("Hello");
        Optional<String> empty = Optional.empty();
        Optional<String> nullable = Optional.ofNullable(null);

        System.out.println("Present: " + present.isPresent());
        System.out.println("Empty: " + empty.isPresent());
        System.out.println("Nullable: " + nullable.isPresent());

        // 2. Safe operations
        present.ifPresent(value -> System.out.println("Value: " + value));
        empty.ifPresent(value -> System.out.println("This won't print"));

        // 3. Providing defaults
        String result1 = empty.orElse("Default Value");
        String result2 = empty.orElseGet(() -> "Computed Default");
        System.out.println("orElse result: " + result1);
        System.out.println("orElseGet result: " + result2);

        // 4. Chaining operations
        Optional<String> result = getUserInput()
            .filter(input -> input.length() > 3)
            .map(String::toUpperCase)
            .filter(upper -> upper.startsWith("A"));

        System.out.println("Chained result: " + result.orElse("No valid input"));

        // 5. Exception handling
        try {
            String mustHaveValue = empty.orElseThrow(() -> new RuntimeException("Value required"));
        } catch (RuntimeException e) {
            System.out.println("Caught exception: " + e.getMessage());
        }
    }

    private static Optional<String> getUserInput() {
        // Simulate user input - sometimes returns null
        return Math.random() > 0.5 ? Optional.of("apple") : Optional.empty();
    }
}`
          },
          {
            title: 'Parallel Streams Performance Comparison',
            description: 'Compare sequential vs parallel stream performance for CPU-intensive operations and data processing.',
            hints: [
              'Use System.nanoTime() to measure execution time',
              'Create CPU-intensive operation (e.g., mathematical calculations)',
              'Compare stream() vs parallelStream() performance',
              'Be aware that parallel streams have overhead for small datasets'
            ],
            solution: `import java.util.*;
import java.util.stream.IntStream;

public class ParallelStreamPerformance {
    public static void main(String[] args) {
        // Create a large dataset
        List<Integer> numbers = new ArrayList<>();
        for (int i = 0; i < 1000000; i++) {
            numbers.add(i);
        }

        // Sequential processing
        long startTime = System.nanoTime();
        double sequentialResult = numbers.stream()
            .mapToDouble(ParallelStreamPerformance::cpuIntensiveOperation)
            .average()
            .orElse(0.0);
        long sequentialTime = System.nanoTime() - startTime;

        // Parallel processing
        startTime = System.nanoTime();
        double parallelResult = numbers.parallelStream()
            .mapToDouble(ParallelStreamPerformance::cpuIntensiveOperation)
            .average()
            .orElse(0.0);
        long parallelTime = System.nanoTime() - startTime;

        System.out.println("Sequential result: " + sequentialResult);
        System.out.println("Parallel result: " + parallelResult);
        System.out.println("Sequential time: " + (sequentialTime / 1_000_000) + " ms");
        System.out.println("Parallel time: " + (parallelTime / 1_000_000) + " ms");
        System.out.println("Speedup: " + (double) sequentialTime / parallelTime + "x");

        // Test with smaller dataset (where parallel might be slower)
        List<Integer> smallNumbers = IntStream.range(0, 100).boxed().collect(Collectors.toList());

        startTime = System.nanoTime();
        double smallSequential = smallNumbers.stream()
            .mapToDouble(ParallelStreamPerformance::cpuIntensiveOperation)
            .sum();
        long smallSequentialTime = System.nanoTime() - startTime;

        startTime = System.nanoTime();
        double smallParallel = smallNumbers.parallelStream()
            .mapToDouble(ParallelStreamPerformance::cpuIntensiveOperation)
            .sum();
        long smallParallelTime = System.nanoTime() - startTime;

        System.out.println("\nSmall dataset results:");
        System.out.println("Sequential time: " + (smallSequentialTime / 1_000_000) + " ms");
        System.out.println("Parallel time: " + (smallParallelTime / 1_000_000) + " ms");
    }

    private static double cpuIntensiveOperation(int number) {
        // Simulate CPU-intensive calculation
        double result = 0;
        for (int i = 0; i < 100; i++) {
            result += Math.sqrt(number) * Math.sin(number);
        }
        return result;
    }
}`
          }
        ]
      },
    ],
  },
  {
    slug: 'modern-java-features',
    title: 'Modern Java: Sealed Classes, Records, and Virtual Threads',
    topic: 'modern-java',
    summary: 'Explore Java 17 sealed classes, records, and Java 21 virtual threads.',
    tags: ['Sealed Classes', 'Records', 'Virtual Threads'],
    sections: [
      {
        title: 'What are sealed classes and record classes in Java 17?',
        content: [
          'Sealed classes restrict which classes can extend or implement them.',
          'Records are immutable data classes with automatic equals, hashCode, toString.',
        ],
      },
      {
        title: 'What are virtual threads in Java 21?',
        content: [
          'Virtual threads are lightweight threads managed by the JVM.',
          'They enable high concurrency without the overhead of platform threads.',
        ],
      },
    ],
  },
  {
    slug: 'threads-concurrency-advanced',
    title: 'Threads & Concurrency: Creation, Synchronization, Locks',
    topic: 'threads-concurrency',
    summary: 'Master thread creation, lifecycle, synchronization, locks, and advanced concurrency concepts.',
    tags: ['Thread', 'Synchronization', 'ReentrantLock', 'CAS', 'Deadlock'],
    sections: [
      {
        title: 'How to create Thread? Different ways.',
        content: [
          'Extend Thread class and override run().',
          'Implement Runnable and pass to Thread constructor.',
          'Use lambda with Runnable.',
        ],
        code: `Thread t = new Thread(() -> System.out.println("Hello"));`,
      },
      {
        title: 'Thread Lifecycle?',
        content: [
          'NEW: Created but not started.',
          'RUNNABLE: Ready to run.',
          'RUNNING: Currently executing.',
          'BLOCKED/WAITING: Waiting for resource/notify.',
          'TERMINATED: Finished execution.',
        ],
      },
      {
        title: 'What is the difference between Runnable and Callable?',
        content: [
          'Runnable: run() returns void.',
          'Callable: call() returns a value and can throw exceptions.',
        ],
      },
      {
        title: 'What is race condition?',
        content: [
          'Race condition occurs when multiple threads access shared data concurrently.',
          'Result depends on timing of thread execution.',
        ],
      },
      {
        title: 'What is synchronization? Synchronized block vs method.',
        content: [
          'Synchronization controls access to shared resources.',
          'Method: synchronized void method() {}',
          'Block: synchronized(obj) { }',
        ],
      },
      {
        title: 'What is Reentrant lock?',
        content: [
          'ReentrantLock allows a thread to acquire the same lock multiple times.',
          'More flexible than synchronized, supports fairness and timeouts.',
        ],
      },
      {
        title: 'What is volatile?',
        content: [
          'volatile ensures visibility of changes across threads.',
          'Prevents compiler optimizations that could hide updates.',
        ],
      },
      {
        title: 'What is optimistic locking?',
        content: [
          'Assumes conflicts are rare, uses version checking.',
          'Retries on conflict instead of blocking.',
        ],
      },
      {
        title: 'Difference between sleep and Wait methods?',
        content: [
          'sleep(): Thread pauses for specified time.',
          'wait(): Releases lock and waits for notify().',
        ],
      },
      {
        title: 'What is yield, join?',
        content: [
          'yield(): Hints scheduler to run other threads.',
          'join(): Waits for thread to complete.',
        ],
      },
      {
        title: 'Interthread communication? Wait, notify, notifyAll?',
        content: [
          'wait(): Releases lock and waits.',
          'notify(): Wakes one waiting thread.',
          'notifyAll(): Wakes all waiting threads.',
        ],
      },
      {
        title: 'What is thread pool? Types of thread pools?',
        content: [
          'Thread pool manages reusable threads.',
          'Types: Fixed, Cached, Single, Scheduled.',
        ],
      },
      {
        title: 'What is executor service?',
        content: [
          'ExecutorService manages thread execution.',
          'Provides methods for submitting tasks.',
        ],
      },
      {
        title: 'Difference between submit() and execute()?',
        content: [
          'execute(): For Runnable, no return value.',
          'submit(): For Runnable/Callable, returns Future.',
        ],
      },
      {
        title: 'What is future?',
        content: [
          'Future represents result of asynchronous computation.',
          'Can check completion and get result.',
        ],
      },
      {
        title: 'What is AtomicInteger?',
        content: [
          'AtomicInteger provides thread-safe integer operations.',
          'Uses CAS for atomic updates.',
        ],
      },
      {
        title: 'What is CAS (Compare-And-Swap)?',
        content: [
          'CAS atomically compares and updates a value.',
          'Foundation of non-blocking algorithms.',
        ],
      },
      {
        title: 'What is deadlock?',
        content: [
          'Deadlock occurs when threads wait for each other indefinitely.',
          'Each holds a resource the other needs.',
        ],
      },
      {
        title: 'How to avoid deadlock?',
        content: [
          'Acquire locks in consistent order.',
          'Use timeouts.',
          'Avoid nested locks.',
        ],
      },
      {
        title: 'What is CompletableFuture?',
        content: [
          'CompletableFuture supports asynchronous programming.',
          'Allows chaining and combining futures.',
        ],
      },
      {
        title: 'Difference between runAsync() vs supplyAsync()?',
        content: [
          'runAsync(): For Runnable, returns CompletableFuture<Void>.',
          'supplyAsync(): For Supplier, returns CompletableFuture<T>.',
        ],
      },
      {
        title: 'Difference between thenApply() vs thenAccept()?',
        content: [
          'thenApply(): Transforms result, returns new CompletableFuture.',
          'thenAccept(): Consumes result, returns CompletableFuture<Void>.',
        ],
      },
      {
        title: 'Difference between thenCompose() vs thenCombine()?',
        content: [
          'thenCompose(): Chains dependent futures.',
          'thenCombine(): Combines independent futures.',
        ],
      },
      {
        title: 'How do you handle exceptions in CompletableFuture?',
        content: [
          'Use exceptionally() or handle() methods.',
          'exceptionally() provides fallback value.',
          'handle() handles both result and exception.',
        ],
      },
      {
        title: 'What is get() vs join()?',
        content: [
          'get(): Blocks and throws checked exceptions.',
          'join(): Blocks and throws unchecked exceptions.',
        ],
      },
      {
        title: 'What is ForkJoinPool?',
        content: [
          'ForkJoinPool implements work-stealing algorithm.',
          'Used for parallel processing of recursive tasks.',
        ],
      },
      {
        title: 'What is blocking queue?',
        content: [
          'BlockingQueue blocks when full/empty.',
          'Used for producer-consumer patterns.',
        ],
      },
      {
        title: 'Difference between optimistic and pessimistic locking?',
        content: [
          'Optimistic: Assumes no conflicts, checks at commit.',
          'Pessimistic: Locks resources to prevent conflicts.',
        ],
      },
    ],
  },
  {
    slug: 'jvm-architecture-components',
    title: 'JVM Architecture: Components, Memory, GC, JIT',
    topic: 'jvm-architecture',
    summary: 'Dive into JVM components, ClassLoader, memory areas, garbage collection, and JIT compiler.',
    tags: ['JVM', 'ClassLoader', 'Heap', 'Stack', 'GC', 'JIT'],
    sections: [
      {
        title: 'What is JVM architecture and how does it work internally?',
        content: [
          'JVM executes Java bytecode on any platform.',
          'Loads classes, manages memory, executes bytecode, performs GC.',
        ],
      },
      {
        title: 'What are the key components of JVM?',
        content: [
          'ClassLoader: Loads classes.',
          'Runtime Data Areas: Memory areas.',
          'Execution Engine: Executes bytecode.',
          'Garbage Collector: Manages memory.',
        ],
      },
      {
        title: 'What is the role of ClassLoader?',
        content: [
          'ClassLoader loads class files into memory.',
          'Performs linking and initialization.',
        ],
      },
      {
        title: 'What are the different types of ClassLoaders in Java?',
        content: [
          'Bootstrap: Loads core Java classes.',
          'Extension: Loads extension classes.',
          'System/Application: Loads application classes.',
        ],
      },
      {
        title: 'What are the different memory areas in JVM?',
        content: [
          'Heap: Objects and arrays.',
          'Stack: Method frames and variables.',
          'Metaspace: Class metadata.',
          'PC Register: Current instruction.',
          'Native Method Stack: Native method calls.',
        ],
      },
      {
        title: 'What is Heap memory and how is it structured?',
        content: [
          'Heap stores objects and is divided into Young and Old generations.',
          'Young: Eden, Survivor spaces.',
          'Old: Long-lived objects.',
        ],
      },
      {
        title: 'What is Stack memory and how does it work?',
        content: [
          'Stack stores method call frames.',
          'Each frame contains local variables, operand stack, frame data.',
        ],
      },
      {
        title: 'What is Metaspace?',
        content: [
          'Metaspace stores class metadata.',
          'Replaced PermGen in Java 8.',
        ],
      },
      {
        title: 'What is JIT Compiler?',
        content: [
          'JIT compiles bytecode to native code at runtime.',
          'Improves performance for hot methods.',
        ],
      },
      {
        title: 'How does JIT improve performance?',
        content: [
          'Compiles frequently executed code to native instructions.',
          'Eliminates interpretation overhead.',
        ],
      },
      {
        title: 'What is Garbage Collection?',
        content: [
          'GC automatically reclaims memory from unreachable objects.',
          'Prevents memory leaks.',
        ],
      },
      {
        title: 'What is Minor GC and Major GC?',
        content: [
          'Minor GC: Collects Young generation.',
          'Major/Full GC: Collects entire heap.',
        ],
      },
      {
        title: 'What are different types of Garbage Collectors in Java?',
        content: [
          'Serial: Single-threaded.',
          'Parallel: Multi-threaded.',
          'CMS: Concurrent Mark-Sweep.',
          'G1: Garbage First.',
          'ZGC/Shenandoah: Low-latency.',
        ],
      },
    ],
  },
  {
    slug: 'design-patterns-core',
    title: 'Design Patterns: Singleton, Factory, Builder, Decorator',
    topic: 'design-patterns',
    summary: 'Learn core design patterns: Singleton, Factory, Builder, and Decorator.',
    tags: ['Singleton', 'Factory', 'Builder', 'Decorator'],
    sections: [
      {
        title: 'Singleton design pattern.',
        content: [
          'Ensures only one instance of a class exists.',
          'Provides global access point to that instance.',
        ],
        code: `public class Singleton {\n  private static Singleton instance;\n  private Singleton() {}\n  public static Singleton getInstance() {\n    if (instance == null) instance = new Singleton();\n    return instance;\n  }\n}`,
      },
      {
        title: 'Factory design pattern.',
        content: [
          'Creates objects without specifying exact classes.',
          'Delegates instantiation to subclasses.',
        ],
      },
      {
        title: 'Builder design pattern.',
        content: [
          'Constructs complex objects step by step.',
          'Separates construction from representation.',
        ],
      },
      {
        title: 'Decorator pattern.',
        content: [
          'Adds behavior to objects dynamically.',
          'Wraps objects with additional functionality.',
        ],
      },
    ],
  },
  {
    slug: 'networking-http-basics',
    title: 'Networking & HTTP: Methods, Idempotency, REST',
    topic: 'networking-http',
    summary: 'Understand HTTP methods, idempotency, and basic REST concepts.',
    tags: ['HTTP', 'REST', 'Idempotency'],
    sections: [
      {
        title: 'Networking Basics.',
        content: [
          'HTTP: Protocol for web communication.',
          'REST: Architectural style for web services.',
        ],
      },
      {
        title: 'Http(GET/POST/PUT/PATCH).',
        content: [
          'GET: Retrieve data.',
          'POST: Create resource.',
          'PUT: Update/replace resource.',
          'PATCH: Partial update.',
        ],
      },
      {
        title: 'Idempotency.',
        content: [
          'Idempotent operations produce same result when repeated.',
          'GET, PUT, DELETE are idempotent; POST is not.',
        ],
      },
    ],
  },
  {
    slug: 'spring-framework-core',
    title: 'Spring Framework: IOC, DI, Beans, AOP',
    topic: 'spring-framework',
    summary: 'Master Spring IOC, DI, bean lifecycle, AOP, and Spring Boot features.',
    tags: ['Spring', 'IOC', 'DI', 'AOP', 'Spring Boot'],
    sections: [
      {
        title: 'What is spring framework and what are its advantages?',
        content: [
          'Spring is a framework for enterprise Java applications.',
          'Advantages: Dependency injection, AOP, modularity, testability.',
        ],
      },
      {
        title: 'What is IOC?',
        content: [
          'Inversion of Control: Framework manages object creation and dependencies.',
          'Objects receive dependencies instead of creating them.',
        ],
      },
      {
        title: 'What is DI? Types of DI? Which is recommended and why?',
        content: [
          'Dependency Injection: IOC implementation.',
          'Types: Constructor, Setter, Field injection.',
          'Constructor recommended: Immutable, required dependencies.',
        ],
      },
      {
        title: 'Difference between Application Context vs Bean Factory?',
        content: [
          'ApplicationContext: Advanced features, eager loading.',
          'BeanFactory: Basic functionality, lazy loading.',
        ],
      },
      {
        title: 'What is a Spring Bean? Ways to create.',
        content: [
          'Spring-managed object.',
          'Ways: @Component, @Bean, XML configuration.',
        ],
      },
      {
        title: 'Difference between @Bean vs @Component?',
        content: [
          '@Component: Class-level, auto-detection.',
          '@Bean: Method-level, manual configuration.',
        ],
      },
      {
        title: '@Component vs @Controller vs @Service vs @Repository.',
        content: [
          '@Component: Generic stereotype.',
          '@Controller: Web controllers.',
          '@Service: Business logic.',
          '@Repository: Data access.',
        ],
      },
      {
        title: 'What do you know about @Configuration?',
        content: [
          '@Configuration marks class as source of bean definitions.',
          'Methods with @Bean create beans.',
        ],
      },
      {
        title: 'What do you know about @ComponentScan?',
        content: [
          '@ComponentScan tells Spring where to find components.',
          'Scans packages for @Component annotations.',
        ],
      },
      {
        title: 'What do you know about @Autowired?',
        content: [
          '@Autowired injects dependencies.',
          'Can be used on fields, constructors, setters.',
        ],
      },
      {
        title: 'What happens if multiple beans of same type exist?',
        content: [
          'Spring throws NoUniqueBeanDefinitionException.',
          'Use @Qualifier or @Primary to resolve.',
        ],
      },
      {
        title: 'What do you know about @Qualifier?',
        content: [
          '@Qualifier specifies which bean to inject.',
          'Used with @Autowired.',
        ],
      },
      {
        title: 'What do you know about @Primary?',
        content: [
          '@Primary marks bean as primary choice.',
          'Used when multiple candidates exist.',
        ],
      },
      {
        title: 'What is Spring Bean Lifecycle?',
        content: [
          'Instantiation → Populate properties → setBeanName → setBeanFactory → Pre-initialization → @PostConstruct → InitializingBean.afterPropertiesSet → Custom init → Post-initialization → Bean ready.',
        ],
      },
      {
        title: 'What are different Bean Scopes?',
        content: [
          'Singleton: One instance per container.',
          'Prototype: New instance each time.',
          'Request: One per HTTP request.',
          'Session: One per HTTP session.',
        ],
      },
      {
        title: 'What is AOP? Why do we need AOP?',
        content: [
          'Aspect-Oriented Programming modularizes cross-cutting concerns.',
          'Needed for logging, security, transactions without scattering code.',
        ],
      },
      {
        title: 'What are cross-cutting concerns? Examples.',
        content: [
          'Concerns affecting multiple modules.',
          'Examples: Logging, security, caching, transactions.',
        ],
      },
      {
        title: 'What problems does AOP solve in Spring?',
        content: [
          'Code duplication, tight coupling, maintainability.',
          'Allows clean separation of concerns.',
        ],
      },
      {
        title: 'What is an Aspect?',
        content: [
          'Aspect is a module implementing cross-cutting concern.',
          'Contains advice and pointcuts.',
        ],
      },
      {
        title: 'What is a Join Point?',
        content: [
          'Point in program execution where aspect can be applied.',
          'Method execution, exception handling, etc.',
        ],
      },
      {
        title: 'What is a Pointcut?',
        content: [
          'Expression identifying join points.',
          'Defines where advice should be applied.',
        ],
      },
      {
        title: 'Difference between Join Point and Pointcut.',
        content: [
          'Join Point: Specific execution point.',
          'Pointcut: Pattern matching multiple join points.',
        ],
      },
      {
        title: 'What is Advice?',
        content: [
          'Action taken at join point.',
          'Code executed when pointcut matches.',
        ],
      },
      {
        title: 'Types of Advice in Spring AOP?',
        content: [
          '@Before: Before method execution.',
          '@After: After method (finally).',
          '@AfterReturning: After successful return.',
          '@AfterThrowing: After exception.',
          '@Around: Around method execution.',
        ],
      },
      {
        title: 'What is Target object?',
        content: [
          'Object being advised.',
          'The actual business object.',
        ],
      },
      {
        title: 'What is Proxy?',
        content: [
          'Object created by AOP framework.',
          'Wraps target object and applies advice.',
        ],
      },
      {
        title: 'What is Weaving?',
        content: [
          'Process of applying aspects to target objects.',
          'Creates proxy objects.',
        ],
      },
      {
        title: 'When does weaving happen in Spring?',
        content: [
          'At runtime using dynamic proxies.',
          'Proxy created when bean is instantiated.',
        ],
      },
      {
        title: 'What is @Before advice?',
        content: [
          'Executes before target method.',
          'Cannot prevent method execution.',
        ],
      },
      {
        title: 'What is @After advice?',
        content: [
          'Executes after target method completes.',
          'Like finally block.',
        ],
      },
      {
        title: 'Difference between @After and @AfterReturning.',
        content: [
          '@After: Always executes.',
          '@AfterReturning: Only on successful completion.',
        ],
      },
      {
        title: 'What is @AfterThrowing?',
        content: [
          'Executes when target method throws exception.',
          'Can access thrown exception.',
        ],
      },
      {
        title: 'What is @Around advice?',
        content: [
          'Most powerful advice.',
          'Can control method execution, modify parameters/results.',
        ],
      },
      {
        title: 'What is @EnableAspectJAutoProxy?',
        content: [
          '@EnableAspectJAutoProxy enables @AspectJ style aspects.',
          'Required for @Aspect annotations.',
        ],
      },
      {
        title: 'What is @Aspect?',
        content: [
          '@Aspect marks class as aspect.',
          'Contains pointcuts and advice.',
        ],
      },
      {
        title: 'What is @Order annotation?',
        content: [
          '@Order specifies execution order of aspects.',
          'Lower values have higher priority.',
        ],
      },
      {
        title: 'Difference between Spring vs Spring Boot?',
        content: [
          'Spring: Framework with many modules.',
          'Spring Boot: Opinionated framework with auto-configuration.',
        ],
      },
      {
        title: 'Advantages of Spring Boot?',
        content: [
          'Auto-configuration, embedded servers, starters.',
          'Faster development, less configuration.',
        ],
      },
      {
        title: 'What is @SpringBootApplication?',
        content: [
          'Combines @Configuration, @EnableAutoConfiguration, @ComponentScan.',
          'Marks main class of Spring Boot application.',
        ],
      },
      {
        title: 'What is @EnableAutoConfiguration?',
        content: [
          '@EnableAutoConfiguration enables auto-configuration.',
          'Configures beans based on classpath and properties.',
        ],
      },
      {
        title: 'What is auto-configuration in Spring Boot?',
        content: [
          'Automatically configures application based on dependencies.',
          'Reduces manual configuration.',
        ],
      },
      {
        title: 'What are Spring Boot Starters?',
        content: [
          'Convenient dependency descriptors.',
          'Include all necessary dependencies for a feature.',
        ],
      },
      {
        title: 'What are embedded servers in Spring Boot?',
        content: [
          'Tomcat, Jetty, Undertow embedded in application.',
          'No need for separate server installation.',
        ],
      },
      {
        title: 'What is centralized configuration?',
        content: [
          'External configuration management.',
          'Properties files, environment variables, etc.',
        ],
      },
      {
        title: 'What is application.properties / application.yml?',
        content: [
          'Configuration files for Spring Boot.',
          'Contains application settings.',
        ],
      },
      {
        title: 'How do we externalize configuration?',
        content: [
          'Command line arguments, environment variables.',
          'Profile-specific properties.',
        ],
      },
      {
        title: 'What is Spring Cloud Config?',
        content: [
          'Centralized configuration management.',
          'External configuration server.',
        ],
      },
      {
        title: 'What is a self-contained application?',
        content: [
          'Application with all dependencies included.',
          'Can run independently.',
        ],
      },
      {
        title: 'How does Spring Boot create standalone apps?',
        content: [
          'Uses executable JAR with embedded server.',
          'Fat JAR contains all dependencies.',
        ],
      },
      {
        title: 'What is an executable JAR?',
        content: [
          'JAR that can be run directly with java -jar.',
          'Contains Main-Class manifest entry.',
        ],
      },
      {
        title: 'Advantages of self-contained deployment?',
        content: [
          'Easy deployment, no external dependencies.',
          'Consistent environment across deployments.',
        ],
      },
      {
        title: 'Spring Framework Hands-on Practice',
        content: [
          'Let\'s build a complete Spring Boot application to practice IOC, DI, AOP, and MVC concepts.',
        ],
        tasks: [
          {
            title: 'Build a Library Management System with Spring Boot',
            description: 'Create a complete Spring Boot application with service layer, repository layer, REST controllers, and AOP logging.',
            hints: [
              'Use @SpringBootApplication for main class',
              'Create Book entity with JPA annotations',
              'Implement BookRepository interface extending JpaRepository',
              'Create BookService with @Service annotation',
              'Build REST controller with @RestController',
              'Add AOP aspect for logging method calls'
            ],
            solution: `// Book.java (Entity)
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private boolean available = true;

    // Constructors, getters, setters
}

// BookRepository.java
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findByAuthor(String author);
    List<Book> findByAvailable(boolean available);
}

// BookService.java
@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new BookNotFoundException("Book not found"));
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public List<Book> getBooksByAuthor(String author) {
        return bookRepository.findByAuthor(author);
    }
}

// BookController.java
@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book createBook(@RequestBody Book book) {
        return bookService.saveBook(book);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }
}

// LoggingAspect.java
@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.library.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("Executing: " + joinPoint.getSignature().getName());
    }

    @AfterReturning(pointcut = "execution(* com.library.service.*.*(..))", returning = "result")
    public void logAfter(JoinPoint joinPoint, Object result) {
        System.out.println("Completed: " + joinPoint.getSignature().getName() + ", returned: " + result);
    }
}

// LibraryApplication.java
@SpringBootApplication
public class LibraryApplication {
    public static void main(String[] args) {
        SpringApplication.run(LibraryApplication.class, args);
    }
}`
          },
          {
            title: 'Implement Dependency Injection with Different Approaches',
            description: 'Create services with constructor injection, setter injection, and field injection. Demonstrate @Qualifier and @Primary usage.',
            hints: [
              'Create multiple implementations of same interface',
              'Use @Primary for default implementation',
              'Use @Qualifier to specify which bean to inject',
              'Demonstrate all three injection types',
              'Test with different configurations'
            ],
            solution: `// NotificationService.java (Interface)
public interface NotificationService {
    void sendNotification(String message);
}

// EmailNotificationService.java
@Service
@Primary
public class EmailNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending email: " + message);
    }
}

// SmsNotificationService.java
@Service("smsService")
public class SmsNotificationService implements NotificationService {
    @Override
    public void sendNotification(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

// UserService.java (Constructor Injection)
@Service
public class UserService {
    private final NotificationService notificationService;

    @Autowired
    public UserService(@Qualifier("smsService") NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void notifyUser(String message) {
        notificationService.sendNotification(message);
    }
}

// OrderService.java (Setter Injection)
@Service
public class OrderService {
    private NotificationService notificationService;

    @Autowired
    @Qualifier("smsService")
    public void setNotificationService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void processOrder() {
        // Order processing logic
        notificationService.sendNotification("Order processed successfully");
    }
}

// PaymentService.java (Field Injection)
@Service
public class PaymentService {
    @Autowired
    @Qualifier("emailService")
    private NotificationService notificationService;

    public void processPayment() {
        // Payment processing logic
        notificationService.sendNotification("Payment received");
    }
}`
          },
          {
            title: 'Spring AOP Logging and Performance Monitoring',
            description: 'Create aspects for method logging, performance monitoring, and exception handling using different advice types.',
            hints: [
              'Create @Aspect class with @Component',
              'Use @Around for performance monitoring with StopWatch',
              'Use @AfterThrowing for exception logging',
              'Use @Before and @After for method entry/exit logging',
              'Define pointcuts for service and controller methods'
            ],
            solution: `// LoggingAspect.java
@Aspect
@Component
@Order(1)
public class LoggingAspect {

    @Pointcut("execution(* com.library.service.*.*(..))")
    public void serviceMethods() {}

    @Pointcut("execution(* com.library.controller.*.*(..))")
    public void controllerMethods() {}

    @Before("serviceMethods() || controllerMethods()")
    public void logMethodEntry(JoinPoint joinPoint) {
        String methodName = joinPoint.getSignature().getName();
        String className = joinPoint.getTarget().getClass().getSimpleName();
        System.out.println("Entering " + className + "." + methodName +
                          " with args: " + Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(pointcut = "serviceMethods() || controllerMethods()",
                    returning = "result")
    public void logMethodExit(JoinPoint joinPoint, Object result) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Exiting " + methodName + " with result: " + result);
    }

    @AfterThrowing(pointcut = "serviceMethods() || controllerMethods()",
                    throwing = "exception")
    public void logException(JoinPoint joinPoint, Exception exception) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Exception in " + methodName + ": " + exception.getMessage());
    }
}

// PerformanceAspect.java
@Aspect
@Component
@Order(2)
public class PerformanceAspect {

    @Around("execution(* com.library.service.*.*(..))")
    public Object monitorPerformance(ProceedingJoinPoint joinPoint) throws Throwable {
        String methodName = joinPoint.getSignature().getName();
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        try {
            Object result = joinPoint.proceed();
            stopWatch.stop();
            System.out.println(methodName + " executed in " + stopWatch.getTotalTimeMillis() + " ms");
            return result;
        } catch (Throwable throwable) {
            stopWatch.stop();
            System.out.println(methodName + " failed after " + stopWatch.getTotalTimeMillis() + " ms");
            throw throwable;
        }
    }
}

// SecurityAspect.java
@Aspect
@Component
@Order(3)
public class SecurityAspect {

    @Before("execution(* com.library.controller.*.*(..))")
    public void checkSecurity(JoinPoint joinPoint) {
        // Simulate security check
        String methodName = joinPoint.getSignature().getName();
        System.out.println("Security check passed for " + methodName);

        // In real application, you would check authentication/authorization here
    }
}`
          },
          {
            title: 'Spring Boot Configuration and Profiles',
            description: 'Create a Spring Boot application with multiple profiles (dev, test, prod) and externalized configuration.',
            hints: [
              'Create application.properties, application-dev.properties, application-prod.properties',
              'Use @Profile annotation on configuration classes',
              'Create different service implementations for different environments',
              'Use @Value for property injection',
              'Demonstrate profile-specific bean creation'
            ],
            solution: `// application.properties
app.name=Library Management System
app.version=1.0.0
spring.profiles.active=dev

# application-dev.properties
database.url=jdbc:h2:mem:devdb
database.username=dev
database.password=dev123
logging.level.com.library=DEBUG

# application-prod.properties
database.url=jdbc:mysql://prod-server/library
database.username=prod_user
database.password=prod_password
logging.level.com.library=INFO

// DatabaseConfig.java
@Configuration
public class DatabaseConfig {

    @Value("\${database.url}")
    private String databaseUrl;

    @Value("\${database.username}")
    private String username;

    @Value("\${database.password}")
    private String password;

    @Bean
    @Profile("dev")
    public DataSource devDataSource() {
        return createH2DataSource();
    }

    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        return createMySQLDataSource();
    }

    private DataSource createH2DataSource() {
        // H2 configuration for development
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }

    private DataSource createMySQLDataSource() {
        // MySQL configuration for production
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setUrl(databaseUrl);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}

// NotificationConfig.java
@Configuration
public class NotificationConfig {

    @Bean
    @Profile("dev")
    public NotificationService devNotificationService() {
        return new ConsoleNotificationService();
    }

    @Bean
    @Profile("prod")
    public NotificationService prodNotificationService() {
        return new EmailNotificationService();
    }

    @Bean
    @Profile("test")
    public NotificationService testNotificationService() {
        return new MockNotificationService();
    }
}

// AppConfig.java
@Component
public class AppConfig {

    @Value("\${app.name}")
    private String appName;

    @Value("\${app.version}")
    private String appVersion;

    @PostConstruct
    public void init() {
        System.out.println("Starting " + appName + " v" + appVersion);
    }
}`
          }
        ]
      },
    ],
  },
  {
    slug: 'spring-mvc-rest',
    title: 'Spring MVC & REST: Architecture, Annotations, HTTP',
    topic: 'spring-mvc',
    summary: 'Explore Spring MVC architecture, REST APIs, HTTP structure, and key annotations.',
    tags: ['Spring MVC', 'REST', 'DispatcherServlet', '@Controller'],
    sections: [
      {
        title: 'Please take a look on spring MVC architecture.',
        content: [
          'Spring MVC follows Front Controller pattern.',
          'DispatcherServlet handles all requests.',
        ],
      },
      {
        title: 'What is the flow of the Http request in the spring MVC architecture?',
        content: [
          'Request → DispatcherServlet → Handler Mapping → Controller → Model/View → View Resolver → Response.',
        ],
      },
      {
        title: 'What is Dispatcher Servlet?',
        content: [
          'Front controller in Spring MVC.',
          'Routes requests to appropriate handlers.',
        ],
      },
      {
        title: 'What is handler Mapper?',
        content: [
          'Maps requests to handler methods.',
          'Based on URL patterns and annotations.',
        ],
      },
      {
        title: 'What is Rest api? Why Rest api?',
        content: [
          'REST: Representational State Transfer.',
          'Uses HTTP methods, stateless, scalable.',
        ],
      },
      {
        title: 'Http Request Structure (Request line, Method, Header, Body)?',
        content: [
          'Request Line: Method URI HTTP-Version.',
          'Headers: Key-value metadata.',
          'Body: Request payload.',
        ],
      },
      {
        title: 'Http Response Structure (Status line, Header, Body)?',
        content: [
          'Status Line: HTTP-Version Status-Code Reason.',
          'Headers: Response metadata.',
          'Body: Response payload.',
        ],
      },
      {
        title: 'Practice rest api coding?',
        content: [
          'Create controller with @RestController.',
          'Use @GetMapping, @PostMapping, etc.',
          'Handle request/response with @RequestBody, ResponseEntity.',
        ],
      },
      {
        title: '@Controller vs @RestController.',
        content: [
          '@Controller: Returns view names.',
          '@RestController: Returns data directly (@Controller + @ResponseBody).',
        ],
      },
      {
        title: '@RequestBody.',
        content: [
          'Binds HTTP request body to method parameter.',
          'Converts JSON/XML to Java object.',
        ],
      },
      {
        title: '@RequestMapping.',
        content: [
          'Maps HTTP requests to handler methods.',
          'Supports multiple HTTP methods.',
        ],
      },
      {
        title: '@GetMapping, @PostMapping, @PutMapping, @PatchMapping, @DeleteMapping.',
        content: [
          'Specific mappings for HTTP methods.',
          'Convenient alternatives to @RequestMapping(method=...).',
        ],
      },
      {
        title: '@PathVariable.',
        content: [
          'Extracts URI template variables.',
          'Binds path segments to method parameters.',
        ],
      },
      {
        title: '@RequestParam.',
        content: [
          'Extracts query parameters.',
          'Binds request parameters to method parameters.',
        ],
      },
      {
        title: '@ResponseStatus.',
        content: [
          'Sets HTTP status code for response.',
          'Can be used on methods or exception classes.',
        ],
      },
      {
        title: '@ResponseBody.',
        content: [
          'Indicates method return value should be bound to response body.',
          'Converts Java object to JSON/XML.',
        ],
      },
      {
        title: 'Response Entity.',
        content: [
          'Represents entire HTTP response.',
          'Allows control over status, headers, and body.',
        ],
      },
    ],
  },
  {
    slug: 'sql-basics-queries',
    title: 'SQL Basics: Queries, Aggregates, Subqueries, and Window Functions',
    topic: 'sql-basics',
    summary: 'Learn fundamental SQL operations: SELECT queries, WHERE conditions, aggregates, subqueries, and advanced functions.',
    tags: ['SQL', 'SELECT', 'WHERE', 'Aggregates', 'Subqueries'],
    sections: [
      {
        title: 'Basic SELECT queries and column aliasing',
        content: [
          'SELECT retrieves data from tables.',
          'Column aliasing: SELECT column AS alias.',
        ],
        code: `SELECT name AS full_name FROM users;`,
      },
      {
        title: 'WHERE clause with AND / OR conditions',
        content: [
          'WHERE filters rows based on conditions.',
          'AND requires all conditions true, OR requires any true.',
        ],
        code: `SELECT * FROM users WHERE age > 18 AND city = 'NY';`,
      },
      {
        title: 'Aggregate functions (MAX, MIN, AVG, COUNT, SUM)',
        content: [
          'Aggregate functions operate on groups of rows.',
          'COUNT(*): Counts rows, COUNT(column): Counts non-null values.',
        ],
        code: `SELECT AVG(salary), COUNT(*) FROM employees;`,
      },
      {
        title: 'Difference between COUNT(*) and COUNT(column)',
        content: [
          'COUNT(*): Counts all rows including NULLs.',
          'COUNT(column): Counts non-NULL values in column.',
        ],
      },
      {
        title: 'Subqueries (simple and nested)',
        content: [
          'Subqueries are queries within queries.',
          'Simple: Single result, Nested: Multiple levels.',
        ],
        code: `SELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);`,
      },
      {
        title: 'Table aliasing',
        content: [
          'Aliases simplify complex queries.',
          'Use AS keyword or just space.',
        ],
        code: `SELECT u.name FROM users u;`,
      },
      {
        title: 'ORDER BY and result pagination (LIMIT / OFFSET)',
        content: [
          'ORDER BY sorts results.',
          'LIMIT restricts rows, OFFSET skips rows.',
        ],
        code: `SELECT * FROM users ORDER BY name LIMIT 10 OFFSET 20;`,
      },
      {
        title: 'Finding Nth highest salary using multiple approaches',
        content: [
          'Using LIMIT: SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2;',
          'Using subquery: SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);',
        ],
      },
      {
        title: 'Window functions (RANK, DENSE_RANK)',
        content: [
          'Window functions perform calculations across rows.',
          'RANK: Skips ranks for ties, DENSE_RANK: No skips.',
        ],
        code: `SELECT name, salary, RANK() OVER (ORDER BY salary DESC) FROM employees;`,
      },
      {
        title: 'Correlated subqueries',
        content: [
          'Subquery references outer query columns.',
          'Executed once per outer row.',
        ],
        code: `SELECT * FROM employees e WHERE salary > (SELECT AVG(salary) FROM employees WHERE dept = e.dept);`,
      },
      {
        title: 'DISTINCT usage in queries',
        content: [
          'DISTINCT removes duplicate rows.',
          'Can be used with specific columns.',
        ],
        code: `SELECT DISTINCT city FROM users;`,
      },
    ],
  },
];
