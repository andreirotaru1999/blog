import { Component, OnInit } from '@angular/core';
import {Article} from "../article.model";
import {ActivatedRoute} from "@angular/router";
import {ArticleService} from "../article.service";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../notification.service";

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  article: Article;
  file: File;

  constructor(
    private  articleService:ArticleService,
    protected  activatedRoute: ActivatedRoute,
    private notifyService : NotificationService
    ) {
  }
  createArticle(form: NgForm){
    let id: number = this.activatedRoute.snapshot.params.id;
    if(id){
      form.value.id = Number(id);
      this.articleService.edit(id, this.toFormData(form.value)).subscribe();
      this.notifyService.showSuccess("Article edited succesfully", "Success")
    }
    else{
      this.articleService.createArticle(this.toFormData(form.value)).subscribe();
      this.notifyService.showSuccess("Article created succesfully", "Success")
    }

  }

  ngOnInit(){
    const id: string = this.activatedRoute.snapshot.params.id;
    if(id){
      this.articleService.find(id).subscribe(
        (rez: Article) => this.article = rez
      );
    }


  }
  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      
      reader.readAsDataURL(file);
      reader.onload = () => {
        // this.productForm.patchValue({
        //   picture: file
        // });
        this.file = file;
      };
    }
  }
  
  public toFormData<T>( formValue: T ) {
    let formData = new FormData();

    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.set(key, value);
    }

    if (this.file) {
      formData.append('image', this.file);
    } else {
      formData.delete('image');
    }
    console.log(formData);
    return formData;
  }

}
