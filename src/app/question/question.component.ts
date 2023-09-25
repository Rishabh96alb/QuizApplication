import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  
  name: any;                           //any is datatype here
  questionList : any;
  currentQuestion : any=0;
  Marks : any=0;
  counter: any=60;
  correctAnswer: number=0;
  incorrectAnswer:number=0;
  intervals:any;
  progress:any;

  isQuizCompleted : boolean=false;

  constructor(private questionService : QuestionService)
  {

  }
  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions()
  {
    this.questionService.getQuestionJson()
    .subscribe(res=>{
      this.questionList= res.questions;
    })
  }

  nextquestion()
  {
    this.currentQuestion++ ;
  }

  previousquestion()
  {
    this.currentQuestion-- ;
  }

  answer(currentQ:number,option:any)
  {
    if(currentQ===this.questionList.length)
    {
      this.isQuizCompleted=true;
      this.stopCounter();
    }
    if(option.correct)
    {
      this.Marks+=10;
      setTimeout(()=>{
      this.correctAnswer ++ ;
      this.currentQuestion++;
      this.resetCounter();
      this.progressBar();
      },1000)
      
    }
    else{
      this.Marks-=10;
      setTimeout(()=>{
      this.incorrectAnswer ++ ;
      this.currentQuestion++;
      this.resetCounter();
      this.progressBar();
      },1000)
    }
  }

  startCounter()
  {
    this.intervals=interval(1000)
    .subscribe(val=>{
      this.counter--;
      if(this.counter===0)
      {
        this.currentQuestion++;
        this.counter=60;
        this.Marks-=10;
      }
    })
  }

  stopCounter()
  {
    this.intervals.unsubscribe();
    this.counter=0;

  }

  resetCounter()
  {
    this.stopCounter();
    this.counter=60;
    this.startCounter();
  }

  resetQuiz()
  {
    this.resetCounter();
    this.getAllQuestions();
    this.currentQuestion=0;
    this.Marks=0;
    this.counter=60;
    this.progress=0;
  }

  progressBar()
  {
   
    
      this.progress =((this.currentQuestion/this.questionList.length)*100).toString();
      return this.progress;
  }
}


