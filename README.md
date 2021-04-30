# PJP PEC 2

## Preguntas Teóricas (5pts)

### PT1 Responde con tus propias palabras a las siguientes cuestiones: (2p)

#### PT1.1: ¿Cómo funciona el modelo de concurrencia de JavaScript? (0.4p)

El modelo de concurrencia de JavaScript es:

**- De un solo hilo de ejecución(single-threaded).** Un hilo es un punto concreto de ejecución de un programa, cada hilo solo puede realizar una tarea a la vez. JavScript es un single-threaded, aún con múltiples procesadores, solo puede ejecutar tareas en un solo hilo. Esto significa que no existe forma de ejecutar más de una instrucción a la vez, como en otros lenguajes.

```
Task A --> Task B --> Task C
```
**- no bloqueante (non-blocking).** Es usual que las tareas que realizan los lenguajes de programación requieran de un tiempo de ejecución para procesarse. En el caso de los lenguajes de programación no bloqueantes, como es el caso de JavaScript, las tareas que se llevan a cabo no queden bloqueadas hasta su finalización. Se libera el flujo de ejecución, de modo que el proceso que inició la tarea puede atender otras necesidades del lenguaje.

Por ejemplo: una función realiza una tarea que se activa a que ocurra un determinado suceso, como puede ser un click de ratón del usuario. Si se tratase de un lenguaje bloqueante, se quedaría bloqueado esperando a que el usuario activase la tarea con un click, no se podrían seguir ejecutando las demás funciones. 

**- asícrono (asynchronous).** La asincronía en Javascript es la capacidad de diferir una tarea para seguir ejecutando las demás. Esto es, si el programa se encuentra con una operación que va a llevar tiempo en completarse, deja que esta corra y continua con lo demás. Una vez se complete la operación en espera, la ejecuta.

En el siguiente ejemplo se puede observar cómo algunas de las instrucciones se ejecutarán a destiempo. El orden en que lo imprime por consola es: e 'one', 'three' y 'two'.

```js
function one(text) {
  console.log('Number ' + text);
}
one('one');

setTimeout(() => one('two'), 0);

function three(text) {
  console.log('Number ' + text);
}
three('three');
```

**- concurrente (concurrent).** Es la habilidad para ejecutar dos o más procesos computacionales simultáneamente. Que varias tareas progresen simultáneamente no tiene porque significar que sucedan al mismo tiempo, a diferencia del paralelismo, en el cual dos o más tareas se ejecutan en el mismo instante de tiempo.

Pero, **¿cómo puede un lenguaje con un único hilo de ejecución pueda ser no bloqueante, concurrente y asincrónico?** Esto es debido a que la concurrencia en JavaScript no funciona de la misma forma que en otros lenguajes, sino que está basada en un **bucle de eventos (event loop)**.

#### PT1.2: ¿Qué es el _event loop_? ¿Cuales son sus 4 fases fundamentales? (0.4p)

JavaScript funciona con un modelo de concurrencia basado en _event loop_. Es parte de la arquitectura del motor de JavaScript y el encargado de implementar las operaciones asíncronas o el non-blocking. Debido al event loop JavaScript es un lenguaje dirigido por eventos, lo que significa que no existe un punto de comienzo ni uno final sino que el motor de javascript ejecuta tareas que estén en una pila de ejecución. 

Fases fundamentales para el funcionamiento del event loop:

**- Pila de ejecución(Call Stack).** Es una estructura de datos que apila de forma organizada las instruccones de un programa, registrando en qué parte del programa estamos. Funciona según el principio LIFO, el último elemento que entra en la pila es el primero en ser atendido. Cuando se está a punto de ejecutar una función, esta es añadida al stack. Si la función llama a su vez, a otra función, es agregada sobre la anterior. Y si en algún momento de la ejecución hay un error, este se imprimirá en la consola con un mensaje y el estado del call stack al momento en que ocurrió.

**- Web APIs.** Adicionales al motor JavaScript, las Web APIS son provistas por los navegadores web, como DOM, AJAX, setTimeout, etc. Permiten que las aplicaciones se comuniquen y puedan aprovechar desarrollos ya construidos en lugar de tener que crearlos desde cero. Abstraen el código más complejo para proveer una sintaxis más fácil de usar. Además, el motor de JavaScript es independiente de todas estos APIs, es responsabilidad de cada ambiente de agregar esa funcionalidad extra. En el event loop es el lugar en el que se agregan y permanencen las llamadas a las Web APIs hasta que se active una acción. La acción puede ser un evento de click, una solicitud HTTP o un temporizador. Una vez que se active una acción, se agrega una función de Callback a la Callback Queue.


**- Cola de tareas(Callback Queue).** En el Callback Queue se agregan los callback o funciones que se ejecutan una vez que las operaciones asíncronas hayan terminado. Tamibén funciona según el principio LIFO, el último elemento que entra en la pila es el primero en ser atendido.

**- Bucle de eventos(Envent loop).** Se encarga de revisar que el call stack esté vacío para añadir lo que está dentro del callback queue y ejecutarlo. 


#### PT1.3: ¿Qué sucede con las tareas encoladas (_queue_) si una función del _stack_ tarda mucho tiempo o se llama a si misma recursivamente? (0.4p)

Si una función del stack tarda mucho tiempo o se llama a si misma recursivamente, el navegador no puede procesar, no puede ejecutar ningún otro código, se quedaría bloqueado. La mayoría de los navegadores ante este escenario de bloqueo muestran un mensaje de alerta en el que sugieren detener la tarea con la página completa. 

En el caso de una función recursiva, se produciría el llamado Overflowing.  Comenzaría a llamarse a sí misma sin condiciones de terminación, agregándose a la Pila de ejecución una y otra vez, alcanzando el tamaño máximo de la misma. 

Por lo tanto, al igual que el resto del código, las tareas encoladas se quedarán bloqueadas sin poder ejecutarse. Son tareas que se ejecutan en segundo plano con el fin de no recargar el servidor, bien sea 1 segundo o 1 hora después de haber sido agregados al Callback Queue.

Una solución para resolver este problema, es que la función que tarda mucho tiempo o se llama a si misma recursivamente (práctica no recomendable) sea una función asíncrona. Esto permitirá que vaya al Callback Queue, evitando que se apile en el Call Stack. Utilizar una excesiva cantidad de código síncrono puede provoca una degradación muy notable en la reactividad de la aplicación. Hay que recordar que JavaScript presenta un único hilo de ejecución y un único Call Stack.

#### PT1.4: ¿Qué es una promesa? ¿En que estados puede estar una promesa? ¿Para que sirve? ¿Qué relación tiene con el _event loop_? (0.4p)

Las promesas son objetos que permiten gestionar situaciones futuras en el flujo de ejecución de un programa. Como no se sabe cuándo va a estar disponible, todas las operaciones dependientes de ese valor, tendrán que posponerse en el tiempo. 

Las promesas se crean usando un constructor llamado Promise y pasándole una función que recibe dos parámetros, resolve y reject.

Aunque en Javascript se introducen en el estándar en ES6, se vienen usando desde hace tiempo, ya que varias librerías las habían implementado para solucionar sus necesidades de una manera más elegante.

Los 3 posibles estados de una promesa son:

**- Pendiente.** Estado inicial, antes de que la promesa sea resulta o rechazada.

**- Resuelta.** Promesa completada. Pasará a estar resuelta en el momento que se llame al parámetro resolve, ejecutándose la función que se ha introducido en el método .then. 

**- Rechazada.** Promesa fallida. Pasará a estar rechazada en el momento que se llame al parámetro reject. Usualmente se lanza un error con el motivo de ese rechazo, ejecutándose la función que se ha introducido en el método .catch.

 Su relación con el event loop es que las promesas son un concepto para resolver el problema de asincronía de una forma mucho más elegante y práctica en JavaScript, y el event loop es el que se encarga de implementar las operaciones asíncronas. Esto facilita el control de flujos de datos asíncronos en una aplicación, ya que JavaScript solo puede ejecutar una acción al mismo tiempo.

#### PT1.5: ¿Qué es una función asíncrona? ¿Para que sirve? ¿Qué relación tiene con las promesas? ¿Qué relación tiene con el _event loop_? (0.4p)

Las funciones asíncronas son aquellas que permiten devolver el control al programa antes de que hayan terminado mientras siguen operando en segundo plano.  Si una tarea de un programa queda bloqueada dentro de un proceso sincrónico, la aplicación completa debe esperar. En cambio con un proceso asíncrono, la aplicación puede continuar con otro trabajo hasta que la tarea potencialmente bloqueante o síncrona finaliza.

Las funciones asíncronas son de gran utilidad para:

- Agiliza el proceso de ejecución, contribuyendo a tener una mejor respuesta en las aplicaciones y reduciendo el tiempo de espera del cliente
- Evitar que se bloquee el hilo principal de ejecución.
- Realizar tareas que tienen que esperar a que se produzca un determinado suceso (como puede ser un click del usuario), y reaccionar realizando otra tarea solo cuando dicho suceso ocurra.

En Javascript existen varias formas de gestionar la asincronía: mediante callbacks (la forma más clásica de gestionar la asincronía en Javascript), promesas (Una forma más moderna y actual de gestionar la asincronía.), async/await o top-level await (una variación de la anterior, donde no es necesario usar async).

 Es habitual que existan múltiples tareas asíncronas, dichas tareas puede que terminen resueltas o rechazadas e incluso que dependan de otras, por lo que deben respetar un cierto orden. Además, es habitual que no se conozca previamente cuanto tiempo va a tardar en terminar una tarea, por lo que es de gran importancia un mecanismo para controlar todos estos factores. Aquí es donde entra la utilización de las promesas, previamente explicadas en el punto anterior. Todo ello se pone en relación con el event loop, el encargado de implementar dichas operaciones asíncronas. 


### PT2: Explica con tus propias palabras cómo procesa JavaScript los siguientes fragmentos de código y por qué. (1p)

Fragmento 1:

```js
function hello(text) {
  console.log('Hello ' + text);
}

setTimeout(() => hello('Foo'), 0);
hello('bar');

// Hello bar
// Hello Foo
```
La función hello(), aún siendo lo primero que se define, lo primero que se invoca es el metodo setTimeout(), el cual es enviado del call stack a la Web Api, en la que permanencen hasta que se active una acción, en este caso, hasta que finalice el tiempo de espera especficiado en el método setTimeOut() (0 milisegundos).  Una vez transcurrido ese tiempo, es enviada al callback queue. En el momento que el método setTimout() abadona el call stack, se produce la llamada de la función hello(), ejecutándose y mostrando el string "Hello bar" por consola. En el momento en que el call stack esté vacío, la función asíncrona situada en el call back queue es enviada al call stack, ejecutándose y mostrando el  string "Hello Foo" por consola.

Fragmento 2:

```js
setTimeout(function timeout1() {
  console.log('timeout1');
}, 2000);
setTimeout(function timeout2() {
  console.log('timeout2');
}, 500);
setTimeout(function timeout3() {
  console.log('timeout3');
}, 1000);
setTimeout(function timeout4() {
  console.log('timeout4');
}, 0);

//timeout4
//timeout2
//timeout3
//timeout1

```

Todas son funciones asíncronas definidas dentro del método setTimeOut(). En primer lugar se invocan la función timeout1(); en segundo lugar, la función timeout2(); en tercer lugar, la función timeout3() y en último lugar, la función timeout4().

A medida que las funciones asíncronas se van invocando son llamadas y enviadas a la Web Api, en la que permanencen hasta que se active una acción, en este caso, hasta que finalice el tiempo de espera especficiado en el método setTimeOut(). Una vez transcurrido ese tiempo, son enviadas al callback queue. En el momento en que el call stack esté vacío, las funciónes asíncrona son enviadas al call stack en el orden en el que fueron llegando al callback queue, pudiendo comenzar a ejecutarse. La primera función que se muestra por consola es timeout4, ya que es a la se le especificó el menor tiempo de las cuatro funciones para ejecutarse, y así sucesivamente.

### PT3: Pregunta promesas (2p)

Explica con tus propias palabras, y de forma que demuestres que entiendes el contenido, cuál es la diferencia entre los siguientes ejemplos.
Presta atención al orden en el que se ejecutan las promesas y en qué ocasiones se ejecutarán en paralelo o en serie y a cómo se relacionan los resultados de unas promesas.

Por ejemplo:

```js
// Ejemplo 0
doSomething().then(doSomethingElse);
```

Se ejecutará en este orden:

Primero se ejecuta `doSomething`, cuando la promesa `doSomething` se resuelve se ejecuta `doSomethingElse` y recibe como parámetro el resultado de `doSomething`.

```
doSomething
|-----------------|
                  doSomethingElse(resultOfDoSomething)
                  |------------------|
```

```js
// Ejemplo 1
doSomething()
  .then(function () {
    return doSomethingElse();
  })
  .then(finalHandler);
```

Se ejecutará en este orden:

Primero se ejecuta `doSomething`, cuando la promesa `doSomething` se resuelve se ejecuta `doSomethingElse` y no recibe ningún parámetro del resultado de `doSomething`. Y por último, cuando la promesa `doSomethingElse` se resuelve se ejecuta `finalHandler` y recibe como parámentro el resultado de `doSomethingElse`.

```
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                                     finalHandler(resultOfDoSomethingElse)
                                     |------------------|
```

```js
// Ejemplo 2
doSomething().then(function () {
  doSomethingElse();
}).then(finalHandler);
```

Se ejecutará en este orden:

Primero se ejecuta `doSomething`, cuando la promesa `doSomething` se resuelve se ejecuta `doSomethingElse` y no recibe ningún parámetro del resultado de `doSomething`. A su vez, se ejecute en paralelo (y no en serie) `finalHandler`, ya que no se realiza un return del resultado de `doSomethingElse`, simplemente se ejecuta.

```
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                  finalHandler(undefined)
                  |------------------|
```
```js
// Ejemplo 3
doSomething().then(doSomethingElse())
  .then(finalHandler);
});
```

Se ejecutará en este orden:

Primero se ejecuta en paralelo `doSomething` y `doSomethingElse`, ya que `doSomethingElse` es una funcion que se invoca a la hora de preparar los argumentos. Cuando la promesa doSomething se resuelve se ejecuta `finalHandler` y recibe como parámetro el resultado de `doSomething`.

```
doSomething
|-----------------|
doSomethingElse(undefined)
|---------------------------------|
                  finalHandler(resultOfDoSomething)
                  |------------------|
```
```js
// Ejemplo 4
doSomething().then(doSomethingElse)
  .then(finalHandler);
```

Se ejecutará en este orden:

Primero se ejecuta `doSomething`, cuando la promesa doSomething se resuelve se ejecuta `doSomethingElse` y recibe como parámetro el resultado de `doSomething`. Y por último, cuando la promesa `doSomethingElse` se resuelve se ejecuta `finalHandler` y recibe como parámetro el resultado de `doSomethingElse`.

```
doSomething
|-----------------|
                  doSomethingElse(resultOfDoSomething)
                  |------------------|
                                     finalHandler(resultOfDoSomethingElse)
                                     |------------------|
```


## Preguntas Prácticas (5pts)

### PP2: Crear un _wrapper_ de la función utilizando promesas (1p)

La aproximación de _callbacks_ ha sido durante mucho tiempo la más utilizada en el ecosistema de JavaScript. Sin embargo tenía muchos problemas relacionados. Responde a las siguientes preguntas:

- ¿Qué pasa si necesitamos los resultados de dos carreras?
- ¿Cómo podemos crear una función que un _callback_ pasando dos resultados a la vez?


Para obtener el resultado de dos carreras se necesita, en primer lugar, llamar a la funcion "listResultsCallback", y en su funcion de callback, invocarla de nuevo pasando por parametro el resultado de la primera carrera. Y por último, en el callback de esta ultima, pasar los resultados de ambas carreras.

```js
function list2ResultsCallback(callback) {
	listResultsCallback(2019, 1, (r1) => listResultsCallback(2020, 2, (r2) => callback([r1, r2])));
}
```
