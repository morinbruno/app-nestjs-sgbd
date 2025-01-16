import { Controller, Get, Param } from '@nestjs/common';
import { UsersGeneratorService } from '../users-generator/users-generator.service';

@Controller('generator')
export class GeneratorController {

    constructor(private readonly usersGeneratorService: UsersGeneratorService) {}

    @Get('/users/:count')
    usersCount(@Param('count') count:string) {
        try {
            if(isNaN(parseInt(count))) throw "Le paramètre entré n'est pas un nombre.";
            const nbrUsers = parseInt(count, 10);
            return this.usersGeneratorService.generate(nbrUsers);
        } catch(e) {
            return {
                message: "Une erreur est survenue.",
                message_erreur: e
            }
        }
    }
}
