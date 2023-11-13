#overriding
class Animal:
    def speak(self):
        print("Animal makes a sound")

class Dog(Animal):
    def speak(self):
        print("Dog barks")

class Cat(Animal):
    def speak(self):
        print("Cat meows")

class fish(Animal):
    pass # still i don't know how fish make
       #  sound after knowing i will update later

# Creating instances of the subclasses
dog = Dog()
cat = Cat()
fish = fish()
# Calling the overridden methods
dog.speak()  
cat.speak()  
fish.speak() 
