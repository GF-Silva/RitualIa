from flask import Flask, render_template

app = Flask(__name__,
            template_folder='pages',
            static_folder='pages',
            static_url_path='/pages')

@app.route('/')
def home():
    return render_template('home/index.html')

@app.route('/player')
def player():
    return render_template("player/index.html")

if __name__ == '__main__':
    app.run(debug=True)