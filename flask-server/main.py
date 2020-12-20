# This is a sample Python script.
import os
from flask import Flask, request, jsonify, Response
import pandas as pd
import joblib
from flask_cors import CORS, cross_origin
from util import read_json_file, clean_data_columns
from graph_genration import generate_graph, User
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
import io
import matplotlib.pyplot as plt
import base64
import uuid
import json
from sklearn.metrics import accuracy_score
import sklearn
# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

models_dir = './models'
data_dir = './data'

model_file_name = f'{models_dir}/r_forst.pkl'
model_columns_file_name = f'{models_dir}/r_forst_columns.pkl'
model_labels_file_name = f'{models_dir}/label_test.pkl'

column_data_file_name = f'{data_dir}/column_data.json'

PORT = 5000

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
def hello_world():
    print(r_forest)
    print(model_columns)
    return jsonify({'message': 'hello world'})

"""
We also create an object container the order of the data points
because everything is a list. 
"""
@app.route('/columns', methods=['GET'])
def get_column_data():
    description_order = {
        'name': 'workplace',
        'firstElement': 'mapped column names',
        'secondElement': 'original column names',
        'thirdElement': 'unique data values'
    }
    print(type(column_data))
    return jsonify({'data': column_data, 'description': description_order})


@app.route('/plot', methods=['POST'])
def create_graph():
    _json = request.json
    print(_json)
    income = _json.get('income')
    mental_health_level = _json.get('mental')
    membership_days = _json.get('membership')
    user = User(1, mental_health_level, membership_days, income)
    fig = generate_graph(user)
    output = io.BytesIO()
    plt.savefig(output, format='png')
    output.seek(0)
    pic_hash = base64.b64encode(output.read()).decode("utf-8")
    return jsonify({'image': pic_hash})


@app.route('/predict', methods=['POST'])
def predict():
    print(r_forest)
    if r_forest:
        try:
            json_ = request.json
            print(model_columns)
            print(pd.DataFrame(json_, index=[0]))
            query = pd.get_dummies(pd.DataFrame(json_, index=[0]))
            query = query.reindex(columns=model_columns, fill_value=0)
            print(query)
            prediction = list(r_forest.predict(query))
            print(prediction)
            return jsonify({'prediction': list(map(int, prediction))})
        except Exception as e:
            print(e)
            return jsonify({'error': str(e)})
    # Use a breakpoint in the code line below to debug your script.
    # Press Ctrl+F8 to toggle the breakpoint.
    else:
        return jsonify({'message': 'No model availible'})


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    r_forest = joblib.load(model_file_name)
    column_data = []
    try:
        column_data = read_json_file(column_data_file_name)
    except Exception as e:
        print(e)
    clean_data_columns(column_data, tuple(column_data[0][2]))
    model_columns = joblib.load(model_columns_file_name)
    model_labels = joblib.load(model_labels_file_name)
    app.run(port=PORT, debug=True)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
