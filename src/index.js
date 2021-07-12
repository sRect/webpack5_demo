// import { a, double } from "@/a";
import '@/App';
import '@/index.less';

class Foo {
  constructor() {
    this.count = 1;

    this.createHello();
  }

  get double() {
    return this.count * 2;
  }

  createHello() {
    const div = document.createElement('div')
    div.className = 'hello'
    div.innerHTML = 'hello'
    document.body.appendChild(div);
  }

  increment() {
    this.count+=1;
  }

  decrement() {
    this.count-=1;
  }

  async asyncIncrement() {
    const count = await new Proimise((resolve) => {
      setTimeout(() => resolve(1), 500);
    });
    
    this.count+=count;
  }
}
const foo = new Foo();

console.log(foo.count);
foo.increment();
console.log(foo.count);