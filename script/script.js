'use script'

class First {
    constructor() {} 

    static hello(){
        console.log('Привет я метод родителя');
    }
}

class Second extends First {
    constructor() {}

    static hello() {
        super.hello();
        console.log('А я наследуюемый метод');
    }
}

Second.hello();