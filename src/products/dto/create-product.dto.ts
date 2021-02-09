import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ description: 'product name' })
    name: string;

    @ApiProperty({ description: 'product code' })
    code: string;
}
