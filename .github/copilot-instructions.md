# Copilot Instructions - NestJS avec Fastify

## Contexte Technique

- **Framework**: NestJS avec Fastify comme adaptateur HTTP
- **TypeScript**: Utilisation obligatoire avec types stricts
- **Architecture**: Modular, suivant les principes SOLID et DDD
- **Base de données**: Drizzle ORM avec PostgreSQL
- **Validation**: Utilisation de zod pour la validation des données

## Standards de Code

### Structure des Projets

```
src/
├── modules/
│   ├── auth/
│   ├── users/
│   └── common/
├── shared/
│   ├── decorators/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   └── dto/
├── config/
├── database/
└── main.ts
```

### Conventions de Nommage

- **Fichiers**: kebab-case (user-profile.service.ts)
- **Classes**: PascalCase (UserProfileService)
- **Méthodes/Variables**: camelCase (getUserProfile)
- **Constantes**: UPPER_SNAKE_CASE (MAX_RETRY_ATTEMPTS)
- **Interfaces**: PascalCase avec préfixe I (IUserRepository)

## Patterns à Utiliser

### 1. Controllers

```typescript

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    async findAll(@Query() query: GetUsersDto): Promise<UserResponseDto[]> {
        return this.usersService.findAll(query);
    }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.usersService.create(createUserDto);
    }
}
```

### 2. Services

```typescript

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly logger: Logger,
    ) {
    }

    async findAll(query: GetUsersDto): Promise<UserResponseDto[]> {
        try {
            const users = await this.userRepository.find({
                where: this.buildWhereCondition(query),
                take: query.limit,
                skip: query.offset,
            });

            return users.map(user => this.mapToResponseDto(user));
        } catch (error) {
            this.logger.error('Failed to retrieve users', error.stack);
            throw new InternalServerErrorException('Failed to retrieve users');
        }
    }

    private buildWhereCondition(query: GetUsersDto): FindOptionsWhere<User> {
        // Implementation logic
    }
}
```

### 3. DTOs avec Validation

```typescript
export class CreateUserDto {
    @ApiProperty({ description: 'User email', example: 'user@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'User password', minLength: 8 })
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Password must contain uppercase, lowercase and number',
    })
    password: string;

    @ApiProperty({ description: 'User first name' })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    firstName: string;
}
```

### 4. Guards Personnalisés

```typescript

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
}
```

## Configuration Fastify

### Main.ts Setup

```typescript
async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({
            logger: true,
            bodyLimit: 10485760, // 10MB
        }),
    );

    // Global pipes
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    // Global interceptors
    app.useGlobalInterceptors(new LoggingInterceptor());

    // Swagger setup
    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // CORS
    await app.register(fastifyCors, {
        origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
        credentials: true,
    });

    await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
```

## Bonnes Pratiques

### Gestion des Erreurs

- Utiliser les exceptions NestJS appropriées
- Logger les erreurs avec le contexte
- Retourner des messages d'erreur user-friendly
- Implémenter un Global Exception Filter

### Performance

- Utiliser les interceptors pour le caching
- Implémenter la pagination systématiquement
- Optimiser les requêtes base de données
- Utiliser les pipes pour la transformation des données

### Sécurité

- Valider toutes les entrées avec class-validator
- Implémenter rate limiting
- Utiliser Helmet pour les headers de sécurité
- Sanitize les données utilisateur

### Tests

```typescript
describe('UsersService', () => {
    let service: UsersService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        find: jest.fn(),
                        findOne: jest.fn(),
                        save: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
```

## Règles de Génération de Code

1. **Toujours** générer les imports nécessaires
3. **Toujours** implémenter la validation des DTOs
4. **Toujours** gérer les erreurs appropriées
5. **Préférer** les interfaces pour les contrats
6. **Utiliser** les decorators NestJS appropriés
7. **Implémenter** les tests unitaires de base
8. **Suivre** les principes SOLID
9. **Utiliser** TypeScript strict mode
10. **Documenter** les méthodes complexes

## Modules Couramment Utilisés

- `@nestjs/common`
- `@nestjs/core`
- `@nestjs/platform-fastify`
- `@nestjs/swagger`
- `@nestjs/typeorm` ou `@nestjs/mongoose`
- `@nestjs/jwt`
- `@nestjs/passport`
- `class-validator`
- `class-transformer`

## Configuration d'Environnement

Utiliser `@nestjs/config` avec validation de schéma pour toutes les variables d'environnement et créer des classes de
configuration typées.