from flask import Flask, render_template

app = Flask(__name__,
            template_folder='pages',
            static_folder='pages',
            static_url_path='/pages')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/copa')
def copa():
    return render_template('/copa/index.html')

if __name__ == '__main__':
    app.run(debug=True)