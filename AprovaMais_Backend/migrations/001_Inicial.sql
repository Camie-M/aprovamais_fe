CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  school VARCHAR(100)
);

INSERT INTO users (username, password, role, school) VALUES
  ('valdir', '123456', 'professor', 'Colégio AprovaMais'),
  ('camila', '123456', 'aluno', 'Colégio Horizonte'),
  ('breno.ferrari', '123456', 'professor', 'Colégio Alfa'),
  ('matheus.pastore', '123456', 'aluno', 'Colégio Beta');


DROP TABLE IF EXISTS alternatives;
DROP TABLE IF EXISTS questoes;

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  year INT NOT NULL,
  fase VARCHAR(10) NOT NULL,
  university VARCHAR(100) NOT NULL,
  theme TEXT[] NOT NULL,
  subject TEXT[] NOT NULL,
  topic TEXT[] NOT NULL,
  difficulty FLOAT NOT NULL,
  question JSONB NOT NULL,
  alternatives JSONB NOT NULL,
  correct CHAR(1) NOT NULL,
  solution TEXT NOT NULL
);


INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Língua portuguesa'],
    ARRAY[
      'Compreensão e interpretação de textos',
      'Sentido literal e figurado',
      'Sinonímia e antonímia'
    ],
    1.5,
    '{
      "text": "‘Nevou’ no Rio\nEm pleno verão, o fenômeno que vem chamando atenção nas ruas do Rio é conhecido como “nevada carioca”, ou apenas “nevou”. Trata-se da mania de descolorir, platinando os cabelos até os fios ficarem completamente brancos, que tomou conta das cabeças dos jovens de Norte a Sul e virou a febre do momento. A onda começou às vésperas do Natal, ganhou força no réveillon e entrou em janeiro lotando os salões. Nascida nas comunidades e nos subúrbios, a tendência ultrapassou fronteiras geográficas e sociais da cidade, principalmente depois de ganhar as redes e de ter conquistado artistas e atletas. Cabeleireiros e donos de salão apostam que o modismo resiste com força até os dias de folia.\nNo texto, o verbo nevar apresenta sentido",
      "image": ""
    }'::jsonb,
    '{
      "a": { "text": "literal e é sinônimo de descolorir." },
      "b": { "text": "figurado e quer dizer embranquecer." },
      "c": { "text": "metafórico e é antônimo de escurecer." },
      "d": { "text": "metonímico e significa cabelos brancos." }
    }'::jsonb,
    'b',
    'O verbo "nevar" é usado em sentido figurado para indicar que os cabelos foram descoloridos até ficarem brancos — ou seja, embranquecidos. Isso corresponde à alternativa B. As demais opções ou interpretam erroneamente o tipo de figura de linguagem ou o significado do termo no contexto.'
);

INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Língua portuguesa'],
    ARRAY[
      'Coesão e coerência textual',
      'Referência textual'
    ],
    1.2,
    '{
      "text": "Assinale a alternativa em que todas as palavras listadas têm um mesmo referente dentro do texto.",
      "image": ""
    }'::jsonb,
    '{
      "a": { "text": "fenômeno – onda – tendência – modismo" },
      "b": { "text": "mania – onda – febre – força" },
      "c": { "text": "fenômeno – momento – mania – febre" },
      "d": { "text": "modismo – tendência – força – momento" }
    }'::jsonb,
    'a',
    'Todas as palavras da alternativa A se referem ao mesmo fenômeno descrito no texto: a prática de descolorir os cabelos, chamada de "nevou". As demais alternativas incluem palavras que se referem a aspectos diferentes, como tempo (momento) ou intensidade (força).'
);

INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Língua portuguesa'],
    ARRAY['Leitura e interpretação', 'Análise de discurso'],
    1.0,
    '{"text": "Texto 1\nVivemos no limiar de uma transição, em que a automação ocupará cada vez mais espaços na sociedade. Neste novo cenário, há um componente atuando com desenvoltura entre nós. Suas ações e decisões, invisíveis e muitas vezes autônomas, estão cada vez mais presentes no dia a dia da vida contemporânea. Seu comportamento, no entanto, é opaco e pouco compreendido. Trata-se dos algoritmos. [...] \nTexto 2\n(Quadrinhos com o personagem laranja e amarelo, que representa um algoritmo, da série criada por André Dahmer.)\nA partir do texto 1, é possível afirmar que o texto 2 explora o fato de que os algoritmos", "image": ""}'::jsonb,
    '{"a": {"text": "definem o que é melhor ou mais apropriado para cada pessoa."}, "b": {"text": "são opacos porque aleatoriamente expõem às pessoas produtos para compra."}, "c": {"text": "se servem dos nossos dados para nos oferecer continuamente produtos a serem consumidos."}, "d": {"text": "controlam a vida humana para aperfeiçoar as nossas tomadas de decisão."}}'::jsonb,
    'c',
    'A alternativa correta é a C, pois os textos indicam que os algoritmos utilizam nossos dados para oferecer produtos e conteúdos, revelando um mecanismo não aleatório, mas baseado em informações pessoais. As demais opções ou exageram o papel dos algoritmos ou interpretam erroneamente o conteúdo crítico dos textos.'
);

INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Língua portuguesa'],
    ARRAY['Leitura de imagem', 'Relação texto-verbal e não verbal'],
    1.5,
    '{"text": "Considerando a imagem no texto 2, podemos afirmar que o texto 1 promove uma", "image": ""}'::jsonb,
    '{"a": {"text": "fusão entre o símbolo da escola e o produto da expressão literária, que aparece materializado no desenho das asas da águia."}, "b": {"text": "relação entre a festa literária, mencionada em segundo plano, e o desenho do símbolo da escola, que passa a personificar a literatura."}, "c": {"text": "associação das asas da águia com o título atribuído à festa literária, que mostra o nome da escola antecedido pelo prefixo fli."}, "d": {"text": "ressignificação do símbolo da Portela, cujo desenho faz referência direta à arte literária, para destacar o centenário da escola como tema da festa."}}'::jsonb,
    'a',
    'A alternativa correta é a A, pois o anúncio da festa literária da Portela representa o livro como as asas da águia, fundindo o símbolo da escola com o universo literário. As demais alternativas interpretam equivocadamente o destaque textual ou o uso do termo ''fli''.'
);

INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Língua portuguesa'],
    ARRAY['Funções da linguagem', 'Análise sintática e semântica', 'Efeitos de sentido'],
    2.5,
    '{"text": "O texto a seguir é um trecho da canção Pantanal, que foi tema de abertura da novela com o mesmo nome, exibida originalmente pela TV Manchete em 1990 e regravada pela TV Globo em 2022.\n[Letras da canção...]\nNesse trecho da canção, podemos identificar", "image": ""}'::jsonb,
    '{"a": {"text": "repetição de advérbios que indicam as mesmas circunstâncias de tempo e de lugar, para produzir um efeito de redundância a respeito da luta pela terra."}, "b": {"text": "indeterminação de sujeito com verbo na terceira pessoa do plural, para produzir um efeito de incerteza quanto ao papel das futuras gerações."}, "c": {"text": "atribuição de características positivas por meio de substantivos que indicam cores, para produzir um efeito de otimismo na preservação da natureza."}, "d": {"text": "encadeamento sucessivo de termos ligados por preposição, para produzir um efeito de continuidade temporal quanto à condição do planeta."}}'::jsonb,
    'd',
    'A alternativa D está correta porque o verso ''os filhos dos filhos dos filhos dos nossos filhos verão'' mostra uma sequência de termos com preposição, produzindo um efeito de prolongamento temporal. As demais opções interpretam incorretamente os recursos linguísticos da canção.'
);

INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Literatura', 'Língua portuguesa'],
    ARRAY['Interpretação de textos', 'Poemas contemporâneos'],
    1.0,
    '{
        "text": "je ne parle pas bien*\nje ne parle pas bien\nje ne parle pas bien\nje ne parle pas bien\neu tenho uma língua solta\nque não me deixa esquecer\nque cada palavra minha\né resquício da colonização\ncada verbo que aprendi conjugar\nfoi ensinado com a missão\nde me afastar de quem veio antes\nnossas escolas não nos ensinam\na dar voos\n[...]\nreinvenção\nnossa revolução surge e urge\ndas nossas bocas\ndas falas aprendidas\nque são ensinadas\ne muitas não compreendidas\nsalve, a cada gíria\nje ne parle pas bien\n[...]\no que era pra ser arma de colonizador\nestá virando revide de ex colonizado\nestamos aprendendo as suas línguas\ne descolonizando os pensamento\n* Je ne parle pas bien, do francês, significa “Eu não falo direi-to”.",
        "image": null
    }'::jsonb,
    '{
        "a": { "text": "expressa a necessidade de repetir muitas vezes uma mesma sentença como forma de resistir ao esquecimento de uma língua." },
        "b": { "text": "enfatiza a ideia de que a língua francesa do colonizador ainda não foi aprendida e precisa ser repetida várias vezes." },
        "c": { "text": "é uma constatação de que, na posição de ex-colônia, não conseguimos aprender línguas estrangeiras." },
        "d": { "text": "indica um posicionamento de resistência por meio de uma crítica à aprendizagem forçada da língua do colonizador." }
    }'::jsonb,
    'd',
    'A opção D é a que caracteriza corretamente a repetição do verso nas quatro primeiras linhas do poema, destacando a postura de resistência frente à aprendizagem forçada de uma língua.'
);

INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Literatura', 'Língua portuguesa'],
    ARRAY['Compreensão de paratextos', 'Intertextualidade', 'Análise de epígrafes literárias'],
    2.5,
    '{
        "text": "Texto 1\n“Que século, meus Deus! – exclamaram os ratos\nE começaram a roer o edifício”.\n(“Edifício Esplendor” (1955), de Carlos Drummond de Andrade, epígrafe do conto “Seminário dos Ratos”, de Lygia Fagundes Telles.)\n\nTexto 2\nEpígrafe é um paratexto (um texto que acompanha o texto principal), que pode justificar ou comentar um título ou texto; referenciar a relação entre o autor do texto e o da epígrafe; criar um efeito por meio do qual a presença da epígrafe já evoca a identifica...
        "image": null
    }'::jsonb,
    '{
        "a": { "text": "A epígrafe associa o conto de Lygia ao “sentimento do mundo” drummondiano." },
        "b": { "text": "A epígrafe mostra que os versos de Drummond são imprescindíveis à escrita do conto." },
        "c": { "text": "A epígrafe justifica o título do conto e comenta os possíveis sentidos críticos dele." },
        "d": { "text": "A epígrafe identifica Lygia à geração de 30 do Modernismo, ao lado de Drummond." }
    }'::jsonb,
    'c',
    'A alternativa correta é a letra C, pois é a única que estabelece corretamente a relação entre o papel da epígrafe e seu significado como moldura interpretativa no conto ''Seminário dos Ratos''.'
);

INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Literatura', 'Língua portuguesa'],
    ARRAY['Violência social', 'Interpretação de texto jornalístico e literário', 'Relações entre literatura e realidade'],
    1.0,
    '{
        "text": "Leia o trecho da reportagem:\n“Mulher espancada após boatos em rede social morre no Guarujá, SP\n(...) A dona de casa Fabiane Maria de Jesus, de 33 anos, morreu na manhã desta segunda-feira (5), dois dias após ter sido espancada por dezenas de moradores do Guarujá, no litoral de São Paulo. Segundo a família, ela foi agredida a partir de um boato gerado por uma página em uma rede social (...)”\n\nAssinale o trecho de um dos contos a seguir – extraídos de EVARISTO, Conceição. Olhos d’Ág...
        "image": null
    }'::jsonb,
    '{
        "a": { "text": "“Os mais velhos, acumulados de tanto sofrimento, olhavam para trás e do passado nada reconheciam no presente..." },
        "b": { "text": "“Vi só lágrimas e lágrimas. Entretanto, ela sorria feliz. Mas eram tantas lágrimas..." },
        "c": { "text": "“Os assaltantes desceram rápido. Maria olhou saudosa e desesperada para o primeiro. (...) Alguém gritou que aquela puta safada lá da frente conhecia os assaltantes (...)." },
        "d": { "text": "“Nos últimos tempos na favela, os tiroteios aconteciam com frequência e a qualquer hora..." }
    }'::jsonb,
    'c',
    'A alternativa correta é a letra C, que apresenta uma passagem do conto “Maria”, no qual uma mulher é vítima de um linchamento, ao ser vista, equivocadamente, como cúmplice de um assalto.'
);

INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Literatura'],
    ARRAY['Romances', 'Machado de Assis', 'Realismo brasileiro'],
    3.5,
    '{
        "text": "No início da novela Casa Velha, de Machado de Assis, o cônego da Capela Imperial, um personagem da história, assumindo a voz narrativa dela, conta a seus interlocutores:\n\n“– Não desejo ao meu maior inimigo o que me aconteceu no mês de abril de 1839.”\n\nDe acordo com o texto, o acontecimento desagradável que vitimou o religioso faz com que ele possa ser considerado, ao final da narrativa, como:",
        "image": null
    }'::jsonb,
    '{
        "a": { "text": "um boêmio que se sente entediado na presença dos convivas da Casa Velha" },
        "b": { "text": "um antiescravista, obrigado a conviver, na mesma casa grande, com senhores, agregados e escravos" },
        "c": { "text": "um republicano que suporta um velho Coronel de posições conservadoras" },
        "d": { "text": "um ingênuo que se deixa iludir em suas relações pessoais" }
    }'::jsonb,
    'd',
    'A alternativa correta é a letra D, pois caracteriza o cônego como uma personagem ingênua, o que justificaria ter sido manipulado por Dona Antônia sem perceber os planos dela.'
);

INSERT INTO questions (
    year, fase, university, theme, subject, topic, difficulty,
    question, alternatives, correct, solution
) VALUES (
    2024,
    '1',
    'Unicamp',
    ARRAY['Linguagens'],
    ARRAY['Literatura'],
    ARRAY['Carta de Pero Vaz de Caminha'],
    3.5,
    '{
        "text": "Um deles viu umas contas brancas de rosário, acenou que lhas dessem e divertiu-se muito com elas. Enrolou-as ao pescoço, depois tirou-as e embrulhou-as no braço, e acenava para a terra e depois para as contas, e em seguida para o colar do capitão, dando a entender que eles dariam ouro por aquilo. Isto nós entendíamos assim porque queríamos. Mas se ele queria dizer que levaria as contas e mais o colar, isto nós não queríamos entender, porque não lho daríamos.\n(CAMINHA, Pero Vaz de. Carta...
        "image": ""
    }'::jsonb,
    '{
        "a": { "text": "descreve a natureza e as pessoas que os portugueses encontraram no Novo Mundo, inventariando os detalhes da viagem, com vistas à preservação da História Colonial." },
        "b": { "text": "descreve e interpreta os fatos, mostrando que a compreensão dos portugueses sobre os povos originários era mediada pelos interesses do colonizador." },
        "c": { "text": "descreve como os povos originários do Novo Mundo auxiliaram os colonizadores na prospecção por riquezas, antevendo a realização do projeto colonizador." },
        "d": { "text": "descreve e interpreta os fatos, sugerindo que, na visão dos povos originários, era possível a convivência pacífica com o colonizador, já que compartilhavam os mesmos interesses." }
    }'::jsonb,
    'b',
    'A alternativa correta é a letra B, pois evidencia como a compreensão dos portugueses era moldada pelos seus próprios interesses. As demais opções ou idealizam a relação, ou atribuem funções não evidenciadas no texto da carta.'
);
