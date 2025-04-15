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
