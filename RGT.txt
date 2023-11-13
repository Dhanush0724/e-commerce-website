import tkinter as tk
import random

# Initialize global variables
secret_number = random.randint(1, 50)  # Set a constant secret number
num_range = [1, 50]  # Initial range from 1 to 50
attempts = 0

# Binary search algorithm
def binary_search(low, high):
    return low + (high - low) // 2

# Animation function - Create bouncing balls
def create_bouncing_balls():
    global balls  # Define the 'balls' list globally
    balls = []  # Initialize the 'balls' list
    for _ in range(10):
        x = random.randint(10, 390)
        y = random.randint(10, 190)
        radius = random.randint(10, 30)
        color = random.choice(["red", "blue", "green", "orange", "purple"])
        ball = canvas.create_oval(x, y, x + radius, y + radius, fill=color, outline="")
        balls.append({"ball": ball, "x": x, "y": y, "dx": 2, "dy": 2})  # Use constant dx and dy for uniform movement

# Animation function - Move bouncing balls uniformly and bounce back
def move_bouncing_balls():
    for ball in balls:
        dx, dy = ball["dx"], ball["dy"]
        x, y = ball["x"], ball["y"]
        canvas.move(ball["ball"], dx, dy)
        ball["x"] += dx
        ball["y"] += dy
        if x <= 0 or x + dx >= 400:
            ball["dx"] = -dx  # Bounce back horizontally
        if y <= 0 or y + dy >= 250:
            ball["dy"] = -dy  # Bounce back vertically

# Animation function - Update bouncing balls
def update_bouncing_balls():
    move_bouncing_balls()
    canvas.after(50, update_bouncing_balls)

# Clear animation function
def clear_animation():
    canvas.delete("balls")

# Animation function - Animate bouncing balls
def animate_bouncing_balls():
    update_bouncing_balls()

# Helper function to start a new game
def new_game():
    global num_range, attempts, secret_number
    clear_animation()  # Clear the animation (remove bouncing balls)
    secret_number = random.randint(1, 50)  # Generate a new secret number
    num_range = [1, 50]  # Set the range from 1 to 50
    attempts = 0
    lbl_result.config(text="New game! Guess the Number in Range from {} to {}".format(num_range[0], num_range[1]))
    entry_guess.delete(0, tk.END)
    lbl_attempts.config(text="Attempts: 0")
    create_bouncing_balls()  # Start a new animation by creating new bouncing balls

# Define the event handler for input
def input_guess():
    global attempts
    player_guess = entry_guess.get()
    
    # Check if the input contains more than two characters (numbers)
    if len(player_guess) > 2:
        lbl_result.config(text="Out of Range. Please enter a valid number.")
        return

    try:
        player_guess = int(player_guess)
    except ValueError:
        lbl_result.config(text="Invalid input. Please enter a number.")
        return

    attempts += 1
    player_guess = binary_search(num_range[0], num_range[1])

    if player_guess < secret_number:
        lbl_result.config(text="Try with Higher Numbers! Attempts: {}".format(attempts), fg="red")
        num_range[0] = player_guess + 1
    elif player_guess > secret_number:
        lbl_result.config(text="Try with Lower Numbers! Attempts: {}".format(attempts), fg="red")
        num_range[1] = player_guess
    else:
        lbl_result.config(text="Correct! You guessed the number in {} attempts.".format(attempts), fg="green")
        animate_bouncing_balls()
        canvas.after(2000, clear_animation)

    lbl_attempts.config(text="Attempts: {}".format(attempts))

# Function to reset the game
def reset_game():
    new_game()

# Create the main window
window = tk.Tk()
window.title("Guess the Number by TEAM JAMES")

# Configure window size
window.geometry("500x500")

# Create and place widgets with some styling
lbl_instruction = tk.Label(window, text="Enter your guess:", font=("Arial", 14))
lbl_instruction.pack()

entry_guess = tk.Entry(window, font=("Arial", 14))
entry_guess.pack()

btn_guess = tk.Button(window, text="Guess", command=input_guess, font=("Arial", 14), bg="blue", fg="white")
btn_guess.pack()

lbl_result = tk.Label(window, text="", font=("Arial", 16))
lbl_result.pack()

lbl_attempts = tk.Label(window, text="Attempts: 0", font=("Arial", 14))
lbl_attempts.pack()

# Create a canvas for animation
canvas = tk.Canvas(window, width=400, height=250)
canvas.pack()

# Create a "Reset" button
btn_reset = tk.Button(window, text="Reset", command=reset_game, font=("Arial", 14), bg="red", fg="white")
btn_reset.pack()

# Start a new game when the program runs
new_game()

# Run the main loop
window.mainloop()
