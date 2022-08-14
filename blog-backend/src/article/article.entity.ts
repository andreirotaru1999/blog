import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment} from '../comment/comment.entity';

@Entity('article')
export class Article{
  @PrimaryGeneratedColumn()
  id: string;

  @Column({name: 'title'})
  title: string;

  @Column({name: 'created_on', type: 'date', nullable: true})
  createdOn?: Date;

  @Column({name: 'updated_on', type: 'date', nullable: true})
  updatedOn?: Date;

  @Column({name: 'description'})
  description: string;

  @Column({name: 'image', nullable: true})
  image: string;

  @OneToMany(() => Comment, (comment: Comment) => comment.article, {
    cascade: true,
  })
  public comment: Comment[];
}