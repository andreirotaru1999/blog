import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Article} from '../article/article.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column ({name: 'content'})
  content: string;

  @Column({name: 'created_on', type: 'date', nullable: true})
  createdOn?: Date;

  @Column({name: 'parent_id', nullable: true})
  parentId: string;

  @Column({name: 'number_of_children', default: 0})
  numberOfChildren: number;

  @ManyToOne(() => Article, (article: Article) => article.comment, {
    onDelete: 'CASCADE'
    })
  @JoinColumn({name: 'article_id'})
  public article: Article;

}