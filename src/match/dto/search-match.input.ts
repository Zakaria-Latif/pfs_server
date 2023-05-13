import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class SearchMatchInput {
  @Field()
  searchTerm: string;
  
  @Field(() => Float)
  minDuration: number;

  @Field(() => Float)
  maxDuration: number;

  @Field(()=>Date)
  dateFrom: Date;

  @Field(()=>Date)
  dateTo: Date;
}