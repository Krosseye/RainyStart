import os

import yaml
from flask import Flask, render_template

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


if __name__ == '__main__':
    app.run(debug=True)
