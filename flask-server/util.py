import json
from collections.abc import Sequence
import numpy as np
from typing import List
import math

def read_json_file(file_name: str):
    try:
        with open(file_name, 'r') as file:
            return json.load(file)
    except Exception as e:
        raise e


def clean_for_nan_values(_list: list) -> list:

    cleaned_list = [x for x in _list if str(x) != 'nan' or str(x) != np.nan or math.isnan(float(x)) == False]
    return cleaned_list

def clean_data_columns(data_columns: List[dict], labels: tuple) -> list:
    original_labels, transformed_labels = labels
    entries: List[dict] = []
    for element in range(len(data_columns)):
        entry: dict = data_columns[element][2]
        entry.update({original_labels: clean_for_nan_values(entry[original_labels]), transformed_labels: clean_for_nan_values(entry[transformed_labels])})
        entries.append(entry)
    



