# versión: La versión de Laravel es la 8.0
Se puede utilizar también la 7.0 si alguno lo prefiere. Pero es mejor utilizar la última que es la más estable.
Además versiones anteriores dan algunos problemas con algún bug solucionado en las nuevas versiones.


Descripción y enunciado
En esta práctica se pretende desarrollar el backend de un portal de noticias y un API de consulta básico de manera similar a como lo hemos hecho en la PEC2 pero utilizando Laravel y sus herramientas asociadas.

La entidad noticia dispondrá de los siguientes campos

- Título (texto inferior a 255 carácteres)
- Autor (como entidad)
- Fecha de publicación
- Contenido (texto largo)
- Imagen
- Categoria (como entidad)

La práctica consiste en los siguientes pasos

- Instalación de Laravel
- Creación de las migraciones, modelos y controladores necesarios
- Creación de fakers y seeders para generar contenidos
- Desarrollo de la API de consulta de datos
- Migración al servidor de pruebas

En concreto se pide

a) En primer lugar instalar Laravel en el servidor local y comprobar su funcionamiento. Comentar posibles problemas y cómo se han solucionado. Compara el proceso con el de CodeIgniter. (Máximo 500 palabras) (25 puntos)

b) Crear las migraciones y modelos necesarios.
Para generar contenidos ficticios utilizaremos un Factory. Factory es un mecanismo que nos permite generar datos en la base de datos
https://laravel.com/docs/5.8/database-testing#generating-factories
Utilizaremos Faker para generar contenidos ficticios
Con estas herramientas crearemos al menos 100 noticias automáticamente

(máximo 300 palabras)(25 puntos)

c) A continuación desarrollaremos todos los puntos de entrada a la API y comprobaremos su funcionamiento en un navegador web.

- api/noticias/  Con un parámetro para seleccionar cada una de las páginas de resultado (con 10 noticias por página). Devuelve un listado con los títulos, ids y fechas de publicación de cada una de las notícias.

- api/noticia/ Donde es el identificador de cada noticia. Devuelve todos los campos de la noticia.

- api/categoria//  Donde es el identificador de la categoria. Devuelve un listado con los títulos, ids y fechas de publicación de cada una de las noticias. Y la página de resultados deseada.

- api/autor/ Lo mismo con los autores
 (máximo 300 palabras)(20 puntos)


d) Finalmente migraremos el prototipo en la web de pruebas de la  documentando brevemente los pasos seguidos y comprobando su funcionamiento.
Especificar la url de la aplicación en el servidor.

(Máximo 300 palabras)(20 puntos)

e) Comenta las diferencias más importantes entre los dos entornos utilizados para realizar esta aplicación (Code Igniter y Laravel) y las ventajas e inconvenientes de cada uno según tu experiencia.
(Máxima 200 palabras) (10 puntos)
Evaluación y formato de entrega

 Se deberá entregar un informe con todas las respuestas en formato odt o pdf especificando claramente la URL de la aplicación en el servidor de la UOC. Además es necesario entregar los archivos de la aplicación comprimidos en un archivo zip.
