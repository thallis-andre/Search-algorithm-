# -*- coding: utf-8 -*-
import os
from flask import Flask, request, jsonify, make_response
from flask_restful import Resource, Api
import json
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import pandas as pd
from algoritmos import pesquisa_binaria, busca_sequencial
import time


UPLOAD_FOLDER = 'Arquivos'
ALLOWED_EXTENSIONS = set(['csv'])
filename = ''

app = Flask(__name__)
CORS(app)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    # Vendo se o tipo do arquivo inserido está no array ALLOWED_EXTENSIONS
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class UploadFiles(Resource):
    def post(self):
        # Se não inserir nada, mostrar mensagem
        if 'file' not in request.files:
            return make_response(jsonify({"message":"Arquivo obrigatório!", "error": True}), 500) 
        # Pegando o arquivo inserio
        file = request.files['file']
        # Se não for do tipo csv, mostrar mensagem 
        if allowed_file(file.filename) == False:
            return make_response(jsonify({"message":"Formato de arquivo não suportado. Por favor, entrar com um arquivo .csv !", "error": True}), 500) 
        if file:
            global filename
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return make_response(jsonify({"message":"Upload realizado com sucesso!", "error": False}), 200) 
        return make_response(jsonify({"message":"Algo deu errado. Por favor, tente novamente.", "error": True}), 500) 

api.add_resource(UploadFiles, '/') 

def getCSV (dir, filename):
    # Pegando do diretório o arquivo inserido
    filepathCsv = os.path.join(dir,app.config['UPLOAD_FOLDER'], filename)
    # Lendo o arquivo. A variável dados é do tipo DataFrame
    dados = pd.read_csv(filepathCsv)
    return dados.values.tolist()


class BuscaBinaria(Resource):
    def get(self, nome):
        dados = getCSV(os.getcwd(), filename)
        resultadoBusca = pesquisa_binaria(dados, 0, len(dados), nome )
        return make_response(jsonify({"message": 'Busca Binária ', "error": False, "dados": resultadoBusca}), 200) 

api.add_resource(BuscaBinaria, '/buscaBinaria/<nome>') 

class BuscaSequencial(Resource):
    def get(self, nome):
        dados = getCSV(os.getcwd(), filename)
        resultadoBusca = busca_sequencial(dados, nome)
        print(resultadoBusca)
        return make_response(jsonify({"message": 'Busca Sequencial ', "error": False, "dados": resultadoBusca}), 200) 

api.add_resource(BuscaSequencial, '/buscaSequencial/<nome>') 




if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)

