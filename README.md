## Preguntas Teóricas (5pts)

### PT1 Responde con tus propias palabras a las siguientes cuestiones: (2p)

#### PT1.1: ¿Cómo funciona el modelo de concurrencia de JavaScript? (0.4p)

El modelo de concurrencia de JavaScript es:

**- De un solo hilo de ejecución (_single-threaded_).** Un hilo es la unidad básica de ejecución de un proceso, cada hilo solo puede realizar una tarea a la vez. JavaScript es un _single-threaded_, aún con múltiples procesadores, solo puede ejecutar tareas en un solo hilo.

```
Task A --> Task B --> Task C
```

**- No bloqueante (_non-blocking_).** JavaScript es un lenguaje no bloqueante, lo que permite que las tareas que se lleven a cabo no se queden bloqueadas esperando a ser finalizadas. Esto también evitará que el _thread_ no quede bloqueado en estado de espera. 

Por ejemplo: La creación de una función que se activa en caso de que se produzca un determinado suceso, como puede ser un click de ratón del usuario. Si se tratase de un lenguaje _blocking_, se quedaría bloqueado esperando a que el usuario activase la tarea, no se podrían seguir ejecutando las demás funciones. 

**- Asícrono (_asynchronous_).** La asincronía en JavaScript es la capacidad de diferir una tarea para seguir ejecutando las demás. Esto es, si el programa se encuentra con una operación que va a llevar tiempo en completarse, deja que esta corra y continua con las demás.

**- Concurrente (_concurrent_).** JavaScript es concurrente, lo que significa que tiene la habilidad para ejecutar dos o más procesos simultáneamente. Aclarar que la concurrencia no es lo mismo que el paralelismo, que varias tareas progresen simultáneamente, no tiene por qué significar que sucedan al mismo tiempo.

Pero, **¿cómo un lenguaje con un único hilo de ejecución puede ser no bloqueante, concurrente y asíncrono?** Esto es debido a que el modelo de concurrencia en JavaScript no funciona de la misma forma que en otros lenguajes, sino que está basado en un **bucle de eventos (_event loop_)**.


#### PT1.2: ¿Qué es el _event loop_? ¿Cuales son sus 4 fases fundamentales? (0.4p)

JavaScript funciona con un modelo de concurrencia basado en un **bucle de eventos (_event loop_)**. Es parte de la arquitectura del motor de JavaScript y el encargado de implementar las operaciones asíncronas o el _non-blocking_. Debido al _event loop_, JavaScript es un lenguaje dirigido por eventos, lo que significa que no existe un punto de comienzo o final, sino que el motor del lenguaje ejecuta las tareas que se encuentren en la pila de ejecución (_call stack_). 

Fases fundamentales para el funcionamiento del  _event loop_:

**- Pila de ejecución (_call stack_).** Es una estructura de datos que apila de forma organizada las instrucciones de un programa. Funciona según el principio LIFO (_Last In, First Out_), el último elemento que entra en la pila es el primero en ser atendido. Las funciones que están a punto de ejecutarse son añadidas al _callback queue_, y si la función llama a su vez a otra función, es agregada sobre la anterior. Si se trabaja con operaciones asíncronas, estas poseen _callbacks_ que se ejecutarán una vez que el proceso de la operación haya terminado, añadiéndose al _callback queue_.

**- _Web APIs_.** Las _Web APIS_ permiten que las aplicaciones se comuniquen y puedan aprovechar desarrollos ya construidos en lugar de tener que crearlos desde cero. Abstraen el código más complejo para proveer una sintaxis más fácil de usar. Además, el motor de JavaScript es independiente de todas estas _APIs_, es responsabilidad de cada ambiente de agregar esa funcionalidad extra. En el event loop es el espacio en el que se agregan y permanecen las llamadas a las _Web APIs_ hasta que se active una acción. La acción puede ser un evento de click, una solicitud HTTP, etc. Una vez que se active esa acción, la función de _callback_ es agregada al _callback queue_.

**- Cola de tareas (_callback queue_).** En el _callback queue_ se agregan los _callbacks_ o funciones que se ejecutan una vez que las operaciones asíncronas hayan terminado. También funciona según el principio LIFO (_Last In, First Out_), el último elemento que entra en la pila es el primero en ser atendido.

**- Bucle de eventos (_envent loop_).** Se encarga de revisar que el _call stack_ esté vacío para añadir lo que está dentro del _callback queue_ y ejecutarlo. 


#### PT1.3: ¿Qué sucede con las tareas encoladas (_queue_) si una función del _stack_ tarda mucho tiempo o se llama a si misma recursivamente? (0.4p)

Si una función del _stack_ tarda mucho tiempo o se llama a si misma recursivamente, el navegador no puede ejecutar ningún otro código, se quedaría bloqueado. La mayoría de los navegadores ante este escenario de bloqueo muestran un mensaje de alerta en el que sugieren detener la tarea con la página completa. 

En el caso de una función recursiva, se produciría el llamado _overflowing_. Comenzaría a llamarse a sí misma sin condiciones de terminación, agregándose al _call stack_ una y otra vez y alcanzando el tamaño máximo del mismo. 

Por lo tanto, al igual que el resto del código, las tareas encoladas (_queue_) se quedarán bloqueadas sin poder ejecutarse. Son tareas que se ejecutan en segundo plano con el fin de no recargar el servidor, bien sea 1 segundo o 1 hora después de haber sido agregadas al _callback queue_.

Una solución para resolver este problema, es que la función que tarda mucho tiempo o se llama a si mismas recursivamente (práctica no recomendable) sea asíncrona. Esto permitiría que se agregara al _callback queue_ y evitaría que se apilase en el _call stack_. Utilizar una excesiva cantidad de código síncrono puede provoca una degradación muy notable en la reactividad de la aplicación. Hay que recordar que JavaScript presenta un único hilo de ejecución y un único _call stack_.


#### PT1.4: ¿Qué es una promesa? ¿En que estados puede estar una promesa? ¿Para que sirve? ¿Qué relación tiene con el _event loop_? (0.4p)

Las promesas son objetos que permiten gestionar situaciones futuras en el flujo de ejecución de un programa. Como no se conoce cuándo van a estar disponibles, todas las operaciones dependientes de ese valor, tendrán que posponerse en el tiempo.

Las promesas se crean usando un constructor llamado `Promise` y pasándole una función que recibe dos parámetros, `resolve` y `reject`.

Aunque en JavaScript se introducen en el estándar en ES6, se vienen usando desde hace tiempo, varias librerías ya las habían implementado para solucionar sus necesidades de una manera más elegante.

Los tres posibles estados de una promesa son:

**- Pendiente.** Estado inicial, antes de que la promesa sea resuelta o rechazada.

**- Resuelta.** Promesa completada. Pasará a estar resuelta en el momento que se llame al parámetro `resolve`, ejecutando la función que se ha introducido en el método `.then`. 

**- Rechazada.** Promesa fallida. Pasará a estar rechazada en el momento que se llame al parámetro `reject`. Usualmente se lanza un error con el motivo de ese rechazo, ejecutándose la función que se ha introducido en el método `.catch`.

 Su relación con el _event loop_ es que las promesas son objetos que permiten gestionar la asincronía en JavaScript de una forma más elegante y práctica (que, por ejemplo, utilizando funciones _callbacks_ directamente), y el _event loop_ es el que se encarga de implementar las operaciones asíncronas.
 
 
#### PT1.5: ¿Qué es una función asíncrona? ¿Para que sirve? ¿Qué relación tiene con las promesas? ¿Qué relación tiene con el _event loop_? (0.4p)

Las funciones asíncronas son aquellas que tienen la capacidad de devolverle el control al programa antes de que se produzca su finalización, operándose en segundo plano.

Las funciones asíncronas son de gran utilidad para:

- Agilizar el proceso de ejecución, contribuyendo a tener una mejor respuesta en las aplicaciones y reduciendo el tiempo de espera del cliente.

- Evitar que se bloquee el único hilo de ejecución de JavaScript.

- Realizar tareas que tienen que esperar a que se produzca un determinado suceso (como puede ser un click del usuario), y reaccionar realizando otra tarea solo cuando dicho suceso ocurra.

Existen varias formas de gestionar la asincronía: mediante _callbacks_ (la forma más clásica de gestionar la asincronía en JavaScript), promesas (una forma más moderna y actual de gestionarla), _async/await_ o _top-level await_ (una variación de la anterior, donde no es necesario usar _async_).

 Es habitual que existan múltiples tareas asíncronas, dichas tareas puede que terminen resueltas o rechazadas e incluso que dependan de otras, por lo que deben respetar un cierto orden. Además, también es usual que no se conozca previamente cuanto tiempo van a tardar en finalizar, por lo que será de gran relevancia estar provisto de un mecanismo que permita controlar todos estos factores. Aquí es donde entra la utilización de las promesas, previamente explicadas en el punto anterior. Todo ello se pone en relación con el _event loop_, el encargado de implementar dichas operaciones asíncronas. 


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

Lo primero que se invoca es el método `setTimeout`, siendo enviado del _call stack_ a las _Web APIs_, en las que permanece hasta que se active una acción, en este caso, hasta que finalice el tiempo de espera especificiado en el método `setTimeOut` (0 milisegundos). Una vez transcurrido ese tiempo, es enviado al _callback queue_. En el momento en el que el método `setTimout` abandona el _call stack_, se produce la llamada de la función `hello`, ejecutándose y mostrando por consola el _string_ "Hello bar". Y por último, cuando el _call stack_ se quede vacío, la función asíncrona situada en el _callback queue_ es enviada al _call stack_, ejecutándose y mostrando por consola el _string_ "Hello Foo".

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

En este fragmento, todas las funciones son asíncronas y están definidas dentro del método `setTimeout`. En primer lugar, se invoca la función `timeout1`; en segundo lugar, la función `timeout2`; en tercer lugar, la función `timeout3` y en último lugar, la función `timeout4`.

A medida que las funciones asíncronas son invocadas, son llamadas y enviadas a las _Web APIs_, en las que permanecen hasta que se active una acción, en este caso, hasta que finalice el tiempo de espera especificado en el método `setTimeout`. Una vez transcurrido ese tiempo, son enviadas al _callback queue_. En el momento en que el _call stack_ quede vacío, son enviadas a dicho espacio por el orden en el que fueron llegando al _callback queue_, ejecutándose y mostrando por consola el _string_ correspondiente. `timeout4` es la primera función en ejecutarse y en mostrar por consola el _string_ "timeout4", ya que es a la que se le especificó el menor tiempo de espera de las cuatro funciones. Y así sucesivamente, hasta llegar a la función `timeout1`, con 2000 milisegundos de espera.


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

Primero se ejecuta `doSomething`, cuando la promesa `doSomething` se resuelve, se ejecuta `doSomethingElse` y no recibe ningún parámetro del resultado de `doSomething`. Y, cuando la promesa `doSomethingElse` se resuelve, se ejecuta `finalHandler` y recibe como parámentro el resultado de `doSomethingElse`.

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

Primero se ejecuta `doSomething`, cuando la promesa `doSomething` se resuelve, se ejecuta `doSomethingElse` y no recibe ningún parámetro del resultado de `doSomething`. En paralelo a `doSomethingElse`, se ejecuta `finalHandler`, ya que no se realiza un _return_ del resultado de `doSomethingElse`, simplemente se ejecuta.

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

Primero se ejecuta en paralelo `doSomething` y `doSomethingElse`, ya que `doSomethingElse` es una función que se invoca a la hora de preparar los argumentos. Cuando la promesa `doSomething` se resuelve, se ejecuta `finalHandler` y recibe como parámetro el resultado de `doSomething`.

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

Primero se ejecuta `doSomething`, cuando la promesa doSomething se resuelve, se ejecuta `doSomethingElse` y recibe como parámetro el resultado de `doSomething`. Y, cuando la promesa `doSomethingElse` se resuelve, se ejecuta `finalHandler` y recibe como parámetro el resultado de `doSomethingElse`.

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

Para obtener el resultado de dos carreras se necesita, en primer lugar, llamar a la función `listResultsCallback` y en su función de _callback_, invocarla de nuevo pasando por parámetro el resultado de la primera carrera. Y, en la función de _callback_ de esta última, pasar los resultados de ambas carreras.

```js
function list2ResultsCallback(callback) {
	listResultsCallback(2019, 1, (r1) => listResultsCallback(2020, 2, (r2) => callback([r1, r2])));
}
```
