import { Component, Input, OnInit } from '@angular/core';
import { Comment} from "./comment.model";
import { CommentService} from "./comment.service";
import { ActivatedRoute } from "@angular/router";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: Comment[] = [];
  replies = [];
  @Input() parent;
  viewReplies = [];
  edit = [];


  constructor(
    private commentService: CommentService,
    protected  activatedRoute: ActivatedRoute,
    private  notifyService: NotificationService
  ) { }

  ngOnInit() {
    if(!this.parent){
      this.commentService.getCommentsById(this.activatedRoute.snapshot.params.id)
      .subscribe(comment=>{
        this.comments=comment
        for( let i = 0; i<= this.comments.length; i++) {
          this.replies[i] = false;
        }
      } );
    }
    if(this.parent) {
      this.commentService.getCommentsByParent(this.parent).subscribe(comments=> {
        this.comments = comments;
        for( let i = 0; i<= this.comments.length; i++) {
          this.viewReplies[i] = false;
        }
      })
    }
  }

  deleteComment(id: string){
    if(!id){
      this.notifyService.showWarning("There is no article to delete","Warning");
    }
    else{
      if(confirm("Are you sure to delete this article?")) {
        this.commentService.deleteComment(id).subscribe();
        this.ngOnInit();
      };
    }
  }
}
