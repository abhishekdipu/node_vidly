## Types of Test :

### 1. unit test :

- Test a unit of an application without it's external dependencies (external dependencies such as files, databases, message queues, web services etc)
- or we can also say that -> to test a class or multiple classes without their external dependencies.
- pros & cons : They are Cheap to write and executes fast but doesn't give more confidence

### 2. integeration test:

- Test an application with it's external dependencies
- or we can also say that -> to test a class or multiple classes with their external dependencies.
- They are Cheap to write and executes fast
- pros & cons : takes longer to execute but give more confidence

### 3. end to end test :

- to test application through its UI. tools like selenium are used for this
- pros & cons : give more confidence but takes longer to execute (very slow)

## Q.) what kind of tests we should write in our application?

Ans.) All of 3.

- we should write maximum no. of Unit Test to test each and every function and classes
- we should also write some of the integeration test to make sure our classes/functions are working fine with external dependencies such as databases
- at the end we should also write few ETE test to check complete functionality

## Q.) How much tests we should write for our application?

Ans.) depends on our appliation but usually we should follow Test Pyramid.

- Test Pyramid:
  - based on no. of TC we should write.
    Unit > Integeration > E2E
