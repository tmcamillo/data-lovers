# Data Lovers

## Índice

* [Projeto](#Projeto)
* [Personas](#Persona)
* [Protótipo](#Protótipo)
* [Testes de Usabilidade](#Testes)


***

## Resumo do Projeto

Neste projeto desenvolvemos uma página web à partir da manipulação de objetos de dados do tema Steam Notícias. Utilizamos HTML, CSS e Vanilla Javascript no desenvolvimento. O layout acompanhou a identidade visual da plataforma de jogo.

As funcionalidades implementadas permitem ao usuário: 
* Visualizar em lista todas as notícias da base;
* Filtrar notícias a partir do canal de interesse e de datas disponíveis para este canal selecionado (selects interdependentes); 
* Ordenar notícias totais entre 'mais antigas’ e 'mais recentes’; 
* Visualizar o total de notícia a cada interação e,
* Visualizar a porcentagem de notícias publicadas por Canal. 


## Usuário e Interface

#### Persona
Fizemos a definição das personas, e identificamos que de forma geral os usuários da Steam entram na plataforma com o objetivo de adquirir jogos que já conhecem e, buscando novidades e atualizações dos jogos no mercado de forma rápida, com filtros datados e canais outros de interesse

![alt text](Personas.jpg)


#### Protótipo
Elaboramos esboços de baixa fidelidade diretamente no [Marvel](https://marvelapp.com/) para uma primeira versão do protótipo. Confira  [aqui](https://marvelapp.com/4fa1ag4/screen/53823466).


#### Testes de usabilidade

Com os testes de usabilidade identificamos necessidade de mudança nos pontos abaixo:
###### Problema 1
A utilização dos filtros não estava clara para o usuário. Nos testes o usuário imaginou que os filtros dependiam um do outro e deveriam ser selecionados em sequência. Mas o resultado era justamente o oposto: os filtros funcionavam independentes e a cada seleção o usuário tinha seus resultado de busca redefinidos por outra base (desconsideravam o filtro escolhido anterior).
###### Solução 1
A solução foi deixar a página mais simples, diminuímos a quantidade de filtros para dois (de maneira a deixar o uso mais fácil) e os fizemos funcionar em cadeia sendo que, o segundo filtro só abre as opções à partir da opção selecionado no primeiro select. 

###### Problema 2
O usuário ficou perdido em vários momentos para limpar os filtros.
###### Solução 2
Incorporamos um botão para limpar a seleção de filtros feita.


## Checklist

* [x] Usar VanillaJS.
* [x] Inclui _Definição de produto_ clara e informativa no `README.md`.
* [x] Inclui esboço da solução (protótipo de baixa fidelidade e de alta fidelidade, se houver) no
  `README.md`.
* [x] Inclui a lista de problema detectados através dos testes de usabilidade
  no `README.md`.
* [x] UI: Mostra lista e/ou tabela com dados e/ou indicadores.
* [x] UI: Permite ordenar os dados por meio de um ou mais campos
  (asc e desc).
* [x] UI: Permite filtrar os dados com base em uma condição.
* [x] Hacker Edition( completa em 50%): Utilizar gráfico para mostrar um dado aritmético.