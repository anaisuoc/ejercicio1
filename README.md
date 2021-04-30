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

**- Montículo (Heap).** es el lugar (memoria) donde se almacenan los objetos cuando se definen las variables. 

**- Pila de ejecución(Call Stack).** Es una estructura de datos que registra en qué parte de ejecución del programa se encuentra el usuario en ese momento.  Funciona según el principio LIFO, el último elemento que entra en la pila es el primero en ser atendido. Cuando se está a punto de ejecutar una función, esta es añadida al stack. Si la función llama a su vez, a otra función, es agregada sobre la anterior. Y si en algún momento de la ejecución hay un error, este se imprimirá en la consola con un mensaje y el estado del call stack al momento en que ocurrió.

**- Cola de tareas(Callback Queue).** Aquí se agregan los callback o funciones que se ejecutan una vez que las operaciones asíncronas hayan terminado.

**- Event Loop.** El event loop es el que se encarga de revisar que el call stack esté vacío para añadir lo que está dentro del callback queue y ejecutarlo. 

Adicional al motor JavaScript, están las “Web APIs” que son provistas por los navegadores web, como DOM, AJAX, setTimeout, etc. Permiten que las aplicaciones se comuniquen y puedan aprovechar desarrollos ya construidos en lugar de tener que crearlos desde cero. Abstraen el código más complejo para proveer una sintaxis más fácil de usar. Además, el motor de JavaScript es independiente de todas estos APIs, es responsabilidad de cada ambiente de agregar esa funcionalidad extra.

#### PT1.3: ¿Qué sucede con las tareas encoladas (_queue_) si una función del _stack_ tarda mucho tiempo o se llama a si misma recursivamente? (0.4p)

Si una función del stack tarda mucho tiempo o se llama a si misma recursivamente, el navegador no puede procesar, no puede ejecutar ningún otro código, se quedaría bloqueado. La mayoría de los navegadores ante este escenario de bloqueo muestran un mensaje de alerta en el que sugieren detener la tarea con la página completa. 

En el caso de una función recursiva, se produciría el llamado Overflowing.  Comenzaría a llamarse a sí misma sin condiciones de terminación, agregándose a la Pila de ejecución una y otra vez, alcanzando el tamaño máximo de la misma. 

Por lo tanto, al igual que el resto del código, las tareas encoladas se quedarán bloqueadas sin poder ejecutarse. Son tareas que se ejecutan en segundo plano con el fin de no recargar el servidor, bien sea 1 segundo o 1 hora después de haber sido agregados al Callback Queue.

Una solución para resolver este problema, es que la función que tarda mucho tiempo o se llama a si misma recursivamente (práctica no recomendable) sea una función asíncrona. Esto permitirá que vaya al Callback Queue, evitando que se apile en el Call Stack. Utilizar una excesiva cantidad de código síncrono puede provoca una degradación muy notable en la reactividad de la aplicación. Hay que recordar que JavaScript presenta un único hilo de ejecución y un único Call Stack.

#### PT1.4: ¿Qué es una promesa? ¿En que estados puede estar una promesa? ¿Para que sirve? ¿Qué relación tiene con el _event loop_? (0.4p)

#### PT1.5: ¿Qué es una función asíncrona? ¿Para que sirve? ¿Qué relación tiene con las promesas? ¿Qué relación tiene con el _event loop_? (0.4p)

### PT2: Explica con tus propias palabras cómo procesa JavaScript los siguientes fragmentos de código y por qué. (1p)

Fragmento 1:

```js
function hello(text) {
  console.log('Hello ' + text);
}

setTimeout(() => hello('Foo'), 0);
hello('bar');
```

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
```

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

**Notas**:

- Las siguientes funciones debes implementarlas en el archivo `exercices.js`.
- El fichero `exercises.test.js` define una serie de test para validar las funciones que debes implementar. Asegúrate que tus funciones **pasan** los tests (utiliza el comando `npm t` para lanzar los tests, tal y como hiciste en la PEC 0).
- No debes modificar el código del fichero `exercises.test.js`.

### PP1: Implementar función utilizando `xmlhttprequest` y `fetch` (1p)

El caso de uso más habitual de la asincronía en JavaScript es realizar llamadas al servidor.

La primera parte de este ejercicio consiste en implementar una función `listResultsCallback`, que permite obtener los resultados de una carrera de F1 para una temporada concreta, haciendo uso de la API [XMLHTTPRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) del navegador.

Esta función recibe dos parámetros numéricos:

- `year`: Temporada de F1 de la que queremos obtener datos.
- `stage`: Número de carrera de la correspondiente temporada de la que queremos obtener datos.

y un tercer parámetro `callback`. Este _callback_ es una función que se ejecutará una vez se obtengan los resultados del servidor.

Esta función debe hacer uso de [la API de F1 de ergast.com](https://ergast.com/mrd/methods/results/), por ejemplo, para obtener los resultados de la primera etapa de 2020 hay que llamar al _endpoint_:

> https://ergast.com/api/f1/2020/1/results.json

### PP2: Crear un _wrapper_ de la función utilizando promesas (1p)

La aproximación de _callbacks_ ha sido durante mucho tiempo la más utilizada en el ecosistema de JavaScript. Sin embargo tenía muchos problemas relacionados. Responde a las siguientes preguntas:

- ¿Qué pasa si necesitamos los resultados de dos carreras?
- ¿Cómo podemos crear una función que un _callback_ pasando dos resultados a la vez?

La asincronía basada en _callbacks_ se vuelve muy compleja a medida que la aplicación crece produciéndose el fenómeno del [callback hell](http://callbackhell.com/). Para evitar esto aparecen en JavaScript las promesas.

El objetivo de este ejercicio es implementar la función `listResultsPromise`, que funciona igual que `listResultsCallback`, pero en lugar de recibir como tercer parámetro un _callback_ nos va a devolver una promesa.

### PP3: Reimplementar la función usando _fetch_ (1p)

Volver a implementar la función anterior utilizando la api de `fetch` del navegador.

La función debe cumplir estos requisitos:

- El nombre de la función debe ser `list`
- Debe devolver una promesa con la lista de resultados
- Debe utilizar la API de `fetch`

### PP4: Ejercicio sencillo de promesas (1p)

Implementar una función llamada `list2ResultsCallback(callback)` que recibe el parámetro _callback_. Esta función debe pedir los resultados de dos carreras, reutilizando la función `listResultsCallback`. En cuanto se disponga de ambos resultados, se debe lanzar la función de _callback_.

A continuación, implementar una función  `list2ResultsPromise()` que funcione igual que `list2ResultsCallback`, pero utilizando promesas.

### PP5: Ejercicio intermedio de promesas (1p)

Implementar una función llamada `getNationality(driverId)` que recibe como parámetro el identificador de un piloto y devuelve una promesa que se resuelve con solamente un string que representa la nacionalidad del piloto.

A continuación, implementar una función `listNationalities(year, stage)` que dado un año y una etapa de una carrera, devuelva una promesa que se resuelve con un array de strings que contiene las nacionalidades de los 5 primeros clasificados.
