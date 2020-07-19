import React, {useState} from 'react';

import {fetchQuestions} from './API';

import {QuestionState, Difficulty} from './API';

import Question from './components/Question';

import "./styles/App.css";

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
  const [theme, setTheme] = useState("dark");

  const changeTheme = () => {
      if(theme === "dark"){ 
        document.documentElement.style.setProperty('--hiq-body-background-color', '#FFFBFC');
        document.documentElement.style.setProperty('--hiq-html-background-color', '#FFFBFC');
        document.documentElement.style.setProperty('--hiq-text-color', '#010400');
        document.documentElement.style.setProperty('--hiq-color-primary', '#0074ff');
          setTheme("light");
    }
      else{
          document.documentElement.style.setProperty('--hiq-body-background-color', '#010400');
          document.documentElement.style.setProperty('--hiq-html-background-color', '#010400');
          document.documentElement.style.setProperty('--hiq-text-color', '#FFFBFC');
          document.documentElement.style.setProperty('--hiq-color-primary', '#62BBC1');
          setTheme("dark");
      }
  }

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
    <div className="pad-top strech">
      <div className="container">
        <div className="header">
          <div className="is-left">
            <h1 className="family-secondary">Typescript Quiz App</h1>
          </div>
          <div className="is-right">
            <button onClick={changeTheme} className="button is-danger">
                { theme === "dark" ? <span>🌞</span> : <span>🌙</span> }
            </button>
          </div>
        </div>
        
        <hr />

        { gameOver &&
          <button className="button is-large is-fullwidth" onClick={startTrivia} >
            Start the Quiz
          </button>
        }

        
        { loading && <progress>indeterminate progress</progress> }
        { !loading && !gameOver && (questions.length !== 0) &&
        <Question
          questionNr = {number + 1}
          totalQuestions = {TOTAL_QUESTIONS}
          question = {questions[number].question}
          answers = {questions[number].answers}
          userAnswer = {userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          score={score}
        />
      }

        <div className="header">
            <div className="is-left">

            </div>
            <div className="is-right">
                { !gameOver && !loading && userAnswers.length === number+1 && (number !== TOTAL_QUESTIONS - 1) &&
                    <button className="next is-medium is-danger" onClick={nextQuestion} >Next Question</button>
                }   
            </div>
        </div>

      
      </div>

    </div>
  );
}

export default App;
