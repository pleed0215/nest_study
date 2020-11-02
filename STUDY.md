# 1 Architecture of nestjs

# 1. main.ts

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
