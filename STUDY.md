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
