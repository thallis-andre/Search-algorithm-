import sys
sys.setrecursionlimit(10000)
comparacoes = 0


# Busca Binária
def pesquisa_binaria(lista, esquerda, direita, item):
    global comparacoes
    comparacoes = 0
    return pesquisa_binaria_recursiva(lista, esquerda, direita, item)
    
def pesquisa_binaria_recursiva(lista, esquerda, direita, item):
    global comparacoes
    if direita < esquerda:
        return {"dadosPessoa": [],"comparacoes": comparacoes, "posicao": False }
    meio = (esquerda + direita) // 2
    if lista[meio][0].lower() == item.lower():
        comparacoes = comparacoes + 1
        return {"dadosPessoa": lista[meio] ,"comparacoes": comparacoes, "posicao": meio }
    elif lista[meio][0].lower() > item.lower():
        comparacoes = comparacoes + 1
        return pesquisa_binaria_recursiva(lista, esquerda, meio - 1, item)
    else:
        comparacoes = comparacoes + 1
        return pesquisa_binaria_recursiva(lista, meio + 1, direita, item)

# Busca Sequencial
def busca_sequencial( lista, nome):
    global comparacoes
    comparacoes = 0
    for i in range(len(lista)):
        comparacoes = comparacoes + 1
        if lista[i][0].lower() == nome.lower():
            return { "dadosPessoa": lista[i] ,"comparacoes": comparacoes }
    return {"dadosPessoa": [],"comparacoes": comparacoes }
