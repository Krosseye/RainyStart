import os

import yaml
from flask import Flask, render_template, request

app = Flask(__name__)

# Get directory of current script
script_directory = os.path.dirname(os.path.abspath(__file__))
# Construct full path to config
config_file_path = os.path.join(script_directory, "websites.yml")

# Load the websites data from YAML
with open(config_file_path, 'r', encoding='utf8') as yaml_file:
    websites_data = yaml.load(yaml_file, Loader=yaml.FullLoader)


@app.route('/')
def index():
    return render_template('index.html', websites_data=websites_data)


@app.route('/edit')
def edit_yaml_page():
    return render_template('edit_yaml.html')


@app.route('/get-yaml')
def get_yaml():
    with open(config_file_path, 'r', encoding='utf8') as yaml_file:
        yaml_content = yaml_file.read()
    return yaml_content


@app.route('/save-yaml', methods=['POST'])
def save_yaml():
    yaml_data = request.form.get('yaml')
    try:
        with open(config_file_path, 'w', encoding='utf8') as yaml_file:
            yaml_file.write(yaml_data)
        return "OK", 200
    except Exception as e:
        return str(e), 500


if __name__ == '__main__':
    app.run(debug=True)
