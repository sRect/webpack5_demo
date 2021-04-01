// import { a, double } from "@/a";
import '@/App';

class Foo {
  constructor() {
    this.count = 1;
  }

  get double() {
    return this.count * 2;
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