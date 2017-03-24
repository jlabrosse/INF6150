//TEMPTEMPTEMPTEMPTEMPTEMPTEMP
class question_templates {
    constructor (_id, _subject, _question, _answer){
        this.id = _id;
        this.subject: _subject;
        this.question: _question;
        this.answer: _answer;
    }

    function toObj(){
        return {
            "id" = this.id,
            "subject" = this.subject,
            "question" = this.question,
            "answer" = this.answer
        };
    }
}