import React from 'react';

import {AnswerObject} from '../App';

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const Question: React.FC<Props> = ({
     question, answers, callback, userAnswer, questionNr, totalQuestions
    }) => {
    return (
        <div>
            <p className="number">
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map(e=>
                    <div key={Math.random()}>
                        <button value={e} disabled={!!userAnswer} onClick={callback} >
                            <span dangerouslySetInnerHTML={{ __html: e }} />
                        </button>
                    </div>
                    )}
            </div>
        </div> 
    )
    
}

export default Question;