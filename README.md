# Métodos de pesquisa

Aplicação feita em python e react para ler arquivos csv ordenados pesquisar por nome utilizando busca sequencial ou buca binária.

## Index
+ [Instalação](#installation)
+ [Métodos de pesquisa](#algorithms)


## Instalação<a name="installation"></a>
### Front-end
Verifique se você tem [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/) já instalados.

1. Clonar ou baixar o repositório

	```
	$ git clone https://github.com/thallis-andre/Search-algorithm-.git
	$ cd frontend
	```
2. Instalar dependências

	```
	$ npm install
	```
5. Iniciando a aplicação

	```
	$ npm start
	```
Sua aplicação executará em [localhost:3000](http://localhost:3000/).

### Back-end
Verifique se você tem [Python](https://www.python.org/) e [Pip](https://pypi.org/project/pip/) já instalados.

1. Clonar ou baixar o repositório

	```
	$ git clone https://github.com/thallis-andre/Search-algorithm-.git
	$ cd backend
	```
2. Instalar dependências

	```
	$ pip install flask flask-jsonpify flask-sqlalchemy flask-restful flask_cors
	```
5. Iniciando a aplicação

	```
	$ python server.py
	```

## Métodos de Pesquisa<a name="algorithms"></a>
### Busca Sequencial (Busca Linear)
A partir do primeiro item da lista, simplesmente passamos de item para item, seguindo o pedido sequencial subjacente até encontrar o que estamos procurando ou ficar sem itens. Se ficarmos sem itens, descobrimos que o item que procuramos não estava presente.


##### Análise de Complexidade
No melhor caso, o elemento a ser buscado é encontrado logo na primeira tentativa da busca. No pior caso, o elemento a ser buscado encontra-se na última posição e são feitas N comparações, sendo N o número total de elementos. No caso médio, o elemento é encontrado após (N+1)/2 comparações. O algoritmo de busca linear é um algoritmo O(n).


### Busca Binária
Uma busca binária começará examinando o item do meio. Se esse item for aquele que estamos procurando, a busca termina. Se não for o item correto, podemos usar a natureza ordenada da lista para eliminar a metade dos itens restantes. Se o item que procuramos for maior do que o item do meio, sabemos que toda a metade inferior da lista, bem como o item do meio, podem ser eliminados de uma consideração mais aprofundada. O item, se estiver na lista, deve estar na metade superior.

Podemos então repetir o processo com a metade superior. Comece no item do meio e compare-o contra o que estamos procurando. Novamente, encontramos ou dividimos a lista pela metade, eliminando assim uma grande parte do nosso possível espaço de busca.


##### Análise de Complexidade
A complexidade desse algoritmo é da ordem de Θ(log2 n), em que n é o tamanho do vetor de busca. Apresenta-se mais eficiente que a Busca linear cuja ordem é O(n).

<div style="text-align:center">
  <img src="./public/binary-and-linear-search-animations.gif" />
</div>


