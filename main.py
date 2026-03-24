from flask import Flask, render_template, request, jsonify

# Create an instance of the Flask class
app = Flask(__name__)

# Use the route() decorator to tell Flask what URL should trigger the function
@app.route("/")
def index():
    return render_template('index.html')

# Optional: Run the application directly when the script is executed
if __name__ == '__main__':
    app.run(debug=True)
