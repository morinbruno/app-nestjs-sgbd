import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersGeneratorService {

    constructor(private readonly usersService: UsersService) { }

    getRandomUser() {
        return {
            email: faker.internet.email(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            password: faker.internet.password(),
            username: faker.internet.username()
        }
    }

    async generate(count: number = 1) {
        const users = faker.helpers.multiple(this.getRandomUser, { count: count });
        const response = await this.usersService.create(users);
        return response;
    }

}
