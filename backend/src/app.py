from flask import Flask, request, jsonify, json
from flask_cors import CORS
from cv2 import cv2
import requests
import os 
from os import remove

#Get an object for connection
app = Flask(__name__)
root_path = os.getcwd()
path = root_path.split('backend')
frontend_path = path[0] + 'frontend/src/components/'

#Allow comunication between React and Python server 
CORS(app)

#Set the default user response 
@app.route('/')
def index():
    return 'I am alive!'

@app.route('/default-filter', methods=['POST'])
def applyDefaultFilter():
    url = request.json['url']
    kernel = request.json['kernel']
    original_image = requests.get(url).content
    local_original_image_name = frontend_path + "original_median_image.jpg"
    local_processed_image_name = frontend_path + "processed_median_image.jpg"

    if os.path.isfile(local_original_image_name):
        os.remove(local_original_image_name)
    with open(local_original_image_name, 'wb') as handler:
        handler.write(original_image)

    img = cv2.imread(local_original_image_name, cv2.IMREAD_UNCHANGED)
    processed_image = cv2.medianBlur(img, kernel)
    cv2.imwrite(local_processed_image_name, processed_image)

    return json.loads('{"response":"Filter applied"}')

@app.route('/user-filters', methods=['POST'])
def applyUserFilters():
    url = request.json['url']
    original_image = requests.get(url).content
    kernel = 0
    local_original_image_name = frontend_path + "original_image.jpg"
    local_processed_image_name = frontend_path + "processed_image.jpg"

    if os.path.isfile(local_original_image_name):
        os.remove(local_original_image_name)
    with open(local_original_image_name, 'wb') as handler:
        handler.write(original_image)

    img = cv2.imread(local_original_image_name, cv2.IMREAD_UNCHANGED)
    filters = request.json['filters']

    if filters['gauss']['state']:
        kernel = filters['gauss']['parameters']['kernel']
        img = cv2.GaussianBlur(img, (kernel, kernel), cv2.BORDER_DEFAULT)
        cv2.imwrite(local_processed_image_name, img)
    if filters['laplacian']['state']:
        imgColor = cv2.cvtColor(img, cv2.COLOR_HSV2RGB)
        img = cv2.Laplacian(imgColor, cv2.CV_64F)
        cv2.imwrite(local_processed_image_name, img)
    if filters['sobel']['state']:
        kernel = filters['sobel']['parameters']['kernel']
        img = cv2.Sobel(img, cv2.CV_64F,1,0,ksize=kernel)
        cv2.imwrite(local_processed_image_name, img)

    return json.loads('{"response":"Filters applied"}')

#Start running the connection 
if __name__ == '__main__':  #Valide that the running file is the main file (App.py)
    app.run(debug = True)