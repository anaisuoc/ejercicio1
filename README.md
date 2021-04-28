# PJP PEC 2

## Entrega de la PEC

Una vez hayas realizado las actividades propuestas en este enunciado, la entrega de la PEC se realizará de forma doble:

- Enviar tu PEC 2 al Registro de Evaluación Continua (REC) del campus virtual de la UOC.
  Deberás crear un archivo ZIP con el contenido del repositorio (recuerda **NO** incluir las carpetas `.git` y `node_modules` en el ZIP) y subir dicho fichero al REC.
  Puedes poner cualquier nombre que sea identificativo al fichero, por ejemplo, el nombre del repositorio en GitHub.
- Enviar los cambios de tu repositorio a GitHub Classroom, para ello debes añadir y enviar tus cambios a GitHub, utilizando los comandos add, commit y push.
  Si no recuerdas cómo ejecutar estos comandos, puedes revisarlos en el enunciado de la PEC 0.

Recuerda que este repositorio lo has clonado del repositorio en GitHub. Cuando trabajes en tu sistema, todos los cambios los harás en tus ficheros locales, los cuales tendrás que añadir y _comitear_ en tu repositorio Git. Estos cambios estarán en tu sistema hasta que hagas _push_ y los envíes al repositorio en GitHub. Puedes hacer varios envíos.

## Preguntas Teóricas (5pts)

Responde las siguientes preguntas. Para hacerlo, deberás crear un archivo con el nombre `readme.md` y responder en este nuevo archivo.

Adjuntamos algunos recursos que te ayudarán a responder las preguntas:

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop
- https://blog.avenuecode.com/understanding-the-javascript-concurrency-model
- https://www.freecodecamp.org/news/javascript-concurrency-model-and-event-loop/
- https://dev.to/sarthaksam/javascript-concurrency-model-4hod
- http://latentflip.com/loupe
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

### PT1 Responde con tus propias palabras a las siguientes cuestiones: (2p)

#### PT1.1: ¿Cómo funciona el modelo de concurrencia de JavaScript? (0.4p)

#### PT1.2: ¿Qué es el _event loop_? ¿Cuales son sus 4 fases fundamentales? (0.4p)

#### PT1.3: ¿Qué sucede con las tareas encoladas (_queue_) si una función del _stack_ tarda mucho tiempo o se llama a si misma recursivamente? (0.4p)

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
