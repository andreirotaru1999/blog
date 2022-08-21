import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../comment.model';
import { CommentService} from "../comment.service";
import { ActivatedRoute } from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {
  commentForm: FormGroup;
  @Input() parent;
  @Input() commentId;
  comment: Comment;
  constructor(
    private commentService: CommentService,
    protected  activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.commentForm = new FormGroup({
      'content': new FormControl('', Validators.required)
    });
    if( this.commentId){
      this.commentService.findComment(this.commentId).subscribe((response)=>{
        this.comment = response;
        this.commentForm.patchValue({
          content: this.comment.content,
        })
      })
 
    }
    
   

  }

  onSubmit() {
    this.commentService.createComment(this.activatedRoute.snapshot.params.id, this.createFromForm()).subscribe();
  }

  createFromForm() {
    const comment = {
      ...new Comment(),
      content: this.commentForm.get(['content']).value,
      parentId: this.parent,
    }
    comment.parentId = this.parent;
    console.log(comment);
    return comment;
  }

}
