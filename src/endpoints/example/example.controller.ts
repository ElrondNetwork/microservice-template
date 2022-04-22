import { Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Example } from "./entities/example";
import { ExampleService } from "./example.service";

@Controller()
@ApiTags('example')
export class ExampleController {
	constructor(
		private readonly exampleService: ExampleService
	) { }

	@Get("/examples")
	@ApiResponse({
		status: 200,
		description: 'Returns a list of examples',
		type: Example,
		isArray: true,
	})
	@ApiQuery({ name: 'from', description: 'Numer of items to skip for the result set', required: false })
	@ApiQuery({ name: 'size', description: 'Number of items to retrieve', required: false })
	@ApiQuery({ name: 'search', description: 'Search by example description', required: false })
	async getExamples(
		@Query('from', new DefaultValuePipe(0), ParseIntPipe) from: number,
		@Query('size', new DefaultValuePipe(25), ParseIntPipe) size: number,
		@Query('search') search?: string,
	): Promise<Example[]> {
		return await this.exampleService.getExamples({ from, size }, { search });
	}

	@Get("/examples/:id")
	@ApiResponse({
		status: 200,
		description: 'Returns one example',
		type: Example,
	})
	async getExample(
		@Param('id') id: string,
	): Promise<Example> {
		const result = await this.exampleService.getExample(id);
		if (!result) {
			throw new NotFoundException('Example not found');
		}

		return result;
	}
}
