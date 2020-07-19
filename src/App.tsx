import React, {useState} from 'react';

import {fetchQuestions} from './API';

import {QuestionState, Difficulty} from './API';

import Question from './components/Question';

const TOTAL_QUESTIONS = 10;


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement> ) => {
    if(!gameOver){

      const answer = e.currentTarget.value;
      // CHECK
      const correct = questions[number].correct_answer === answer;
      if(correct){
        setScore( prev => prev + 1 )
      }

      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObj])

      if(number+1 === TOTAL_QUESTIONS){ setGameOver(true) }

    }
  }

  const nextQuestion = () => {
    // Go to next question if not last
    const nextQuestion = number + 1;
    if(nextQuestion == TOTAL_QUESTIONS){
      setGameOver(true);
    }else{
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
        <h1>Quiz App</h1>
        { gameOver &&
          <button className="start" onClick={startTrivia} >
            Start
          </button>
        }

        <p className="score" >Score: {score}</p>
        { loading && <p>Loading questions....</p>}
        { !loading && !gameOver && (questions.length !== 0) &&
        <Question
          questionNr = {number + 1}
          totalQuestions = {TOTAL_QUESTIONS}
          question = {questions[number].question}
          answers = {questions[number].answers}
          userAnswer = {userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      }
        { !gameOver && !loading && userAnswers.length === number+1 && (number !== TOTAL_QUESTIONS - 1) &&
          <button className="next" onClick={nextQuestion} >Next Question</button>
        }
        
    </div>
  );
}

export default App;
