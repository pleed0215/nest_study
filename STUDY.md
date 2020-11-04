# 1 Architecture of nestjs

## 1. main.ts

- @Module

```js
   @Module({
       import: [],
       controllers: [AppController],
       providers: [AppService],
   })
```

- controllers: express의 router와 비슷하다함.

```js
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

- @Get decorator -> express의 get과 유사한 역할.
  - Decorator는 반드시 함수 윗줄에 있어야 한다. 공백 있으면 안된다.
- 그나저나 typescript의 class contructor 살펴 볼 것..
  - 저렇게만 선언하면 private 변수를 설정한 것과 다름이 없다.

# 2. Services

- 라우터에서 보내주면 실제 행위를 해줘야 하는 듯하다.

# 2 REST API

## 1. controllers

- nest cli를 이용하여 controller를 만들 수가 있다.

```sh
    nest generate controller or co
```

이렇게 만들면 알아서 module에 넣어주기 까지 한다. 친절..

- @Controller('movies') -> 기본적으로 이렇게 라우팅을 해준다.

- @Param

```js
@Get('/:id')
  getOne(@Param('id') id: string) {
    return `It will return one movie information. id: ${id}`;
  }
```

- @Body() updateData
  - request.body 의 data를 리턴해주는 역할.

## 2. Single resposibility principle?

- SRP
- 쉽게 말해서 하나의 클래스는 하나의 책임을 져야 한다. 즉, 캡슐화를 말한다.
-

## 3. nest g service

## 4. entity

## 5. parseInt??

- parseInt(string, 10) => +string ?? 이렇게도 쓸수 있다구?

## 6. NotFoundException()

- http 404 같은 것..

## 7. DTO Data Transfer Object

- dto folder를 먼저 만듬.
- dto 자체는 그냥 data transfer validation을 위한 object, class임.

```js
export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true })
  readonly genres: string[];
}
export class UpdateMovieDto {
  @IsString()
  readonly title?: string;
  @IsNumber()
  readonly year?: number;
  @IsString({ each: true })
  readonly genres?: string[];
}
// ?는 required가 아니라는 의미.
```

- UpdatedMovieDto는 위와 같이 하는 대신에
- 11에서 설치할 @nestjs/mapped-types 설치 후에 PartialType 이용해서 하는 방법도 있다.

## 8. useGlobalPipes

```js
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

-

## 9. class-validator

## 10. class-transformer

## 11. @nestjs/mapped-types

## 12. generate module

- nest g mo
- 모듈 단위로 만드는게 좋은 방법이라, 모듈화를 한다고 함.
- nestjs는 프레임워크이므로 사용방법을 알아야 하는 것.
- 이런 모듈화 이용이 권장되는 것.

## 13. Dependecy inject

- @Injectable()
- nest dependency 때문임. 이를테면 controller에서 privder를 import하지 않고 type만 지정해도 작동을 하는데, 그 이유임.

## 14. @Req, @Res

- express 위에서 돌아가기 때문에 request, response를 사용할 수 있다.
- 사용을 그닥 추천하지는 않는다 함.

# 3. Unit testing

testing 에서 중요한 내용은 없고 어떻게 사용하는지만 대충 알면 될 듯하구.
beforeEach, beforeAll은 알아 둬야 겠다..

- 일단은 에러가 발생한다.
- /movies/:id에서 테스팅 서버가 아니라 어플리케이션 서버에서는 :id가 number 타입인 반면에..
- 테스팅 서버에서는 :id가 string으로 보인다.
- 왜냐하면 main.ts에서 validate 관련 pipe line을 넘겼는데, 테스트 서버에서는 안 넘겼기 때문에..

그래서 pipe라인을 validation pipe line을 추가해주면 되는 것이다.
