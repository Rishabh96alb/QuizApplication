import { Directive,Input,ElementRef,HostListener,Renderer2} from '@angular/core';

@Directive({
  selector: '[appOptionsBg]'
})
export class OptionsBgDirective {

  @Input() isCorrect : Boolean = false;
  

  constructor(private ef:ElementRef, private Render: Renderer2) { }

  @HostListener('click')answer()
  {
    if(this.isCorrect)
    {
      this.Render.setStyle(this.ef.nativeElement, 'background', 'green');
      this.Render.setStyle(this.ef.nativeElement, 'border', '2px solid black');
    }

    else{
      this.Render.setStyle(this.ef.nativeElement, 'background', 'red');
      this.Render.setStyle(this.ef.nativeElement, 'border', '2px solid black');
    }
  }

}
