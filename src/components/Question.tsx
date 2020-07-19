import React from 'react';

import {AnswerObject} from '../App';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
    score: number;
}

const Question: React.FC<Props> = ({
     question, answers, callback, userAnswer, questionNr, totalQuestions, score
    }) => {
    return (
        <div>
            <div className="header option">
                <div className="is-left">
                    <p className="number">
                        {questionNr} / {totalQuestions}
                    </p>
                </div>
                <div className="is-right">
                    <p className="score">{score}</p>
                </div>
            </div>

            <h2 dangerouslySetInnerHTML={{ __html: question }} />
            <div className="option">
                {answers.map(e=>
                    <div className="option">
                        <button className="is-medium is-fullwidth is-size-5" key={Math.random()} value={e} disabled={!!userAnswer} onClick={callback} >
                            <span dangerouslySetInnerHTML={{ __html: e }} />
                        </button>
                    </div>
                    )}
            </div>
        </div> 
    )
    
}

export default Question;