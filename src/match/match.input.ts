// server/src/Match/movie.input.ts

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MatchInputCreate {
	@Field(() => String, {
		nullable: false,
		description: "match location",
	})
	location: string;
}

@InputType()
export class MatchInputEdit {
	@Field(() => Number)
	id: number;
}