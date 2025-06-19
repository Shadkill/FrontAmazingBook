import {useState} from 'react';
import BookCreate from './BookCreate';
import BookCreateStepTwo from './BookCreateStepTwo';
const BookCreatePageMain = () => {
    const [bookId, setBookId] = useState(null);
    const [step, setStep] = useState(1);
    const handleNext =(id)=>{
        setBookId(id);
        setStep(2);
    };
    return (
        <div>
            {step === 1 && <BookCreate onNext={handleNext}/>}
            {step === 2 && <BookCreateStepTwo bookId={bookId} />}
        </div>
    );
}

export default BookCreatePageMain;
