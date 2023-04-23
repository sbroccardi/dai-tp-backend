# ScreenSpace API 🎟️

ScreenSpace API es parte de la plataforma ScreenSpace, que permite a los usuarios navegar y comprar boletos para películas exhibidas en cines asociados. La plataforma proporciona una variedad de funciones para hacer que la experiencia de ir al cine sea más agradable para los usuarios, incluyendo la capacidad de buscar películas, ver horarios de proyección, comprar boletos y calificar películas después de verlas.

Una de las funciones principales es proporcionar a los usuarios información sobre las películas que se están proyectando actualmente en los cines. Los usuarios pueden navegar por una lista de películas disponibles, filtrarlas por criterios como género o calificación, y ver información como el reparto, director y sinopsis. La API también puede proporcionar a los usuarios imágenes y trailers para ayudarles a decidir qué películas quieren ver.

Una vez que un usuario ha elegido una película, la aplicación muestra los horarios de proyección disponibles en los cines cercanos y permite a los usuarios seleccionar sus asientos preferidos y pagar por sus boletos utilizando una pasarela de pago segura. Después de la compra, los usuarios reciben boletos electrónicos en su teléfono móvil, que pueden escanear en el cine para entrar.

Después de ver una película, los usuarios pueden calificarla utilizando el sistema de calificación de la aplicación. Esto permite a otros usuarios ver qué películas son populares y cuáles no, ayudándolos a tomar decisiones informadas sobre qué ver. Además, la aplicación utiliza la calificación y los datos de visualización del usuario para proporcionar recomendaciones personalizadas de películas que pueden ser de interés para el usuario.

En resumen, la aplicación móvil de ScreenSpace es una solución completa y fácil de usar para los cinéfilos, que les permite explorar, comprar y disfrutar de las películas en los cines cercanos de manera más eficiente y personalizada.

## Comenzando 🚀

_Estas instrucciones permiten obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

* [NodeJS](https://nodejs.org/es/)
* [Docker & Docker Compose](https://www.docker.com/products/docker-desktop/) (Opcional)
* [MongoDB Docker image](https://hub.docker.com/_/mongo) (Opcional)

### Instalación 🔧

_Una serie de ejemplos paso a paso que debes ejecutar para tener un entorno de desarrollo ejecutandose_

1. Descomprimir el contenido de este ZIP

    Unix-based
    ```Bash
    $ unzip main.zip -d /tmp/screenspace
    ```
    
    Windows
    ```PowerShell
    PS C:\> Expand-Archive -Path 'C:\main.zip' -DestinationPath 'C:\screenspace\'
    ```

2. Descargar las dependencias del backend

    Unix-based
    ```Bash
    $ cd /tmp/screenspace/api
    $ npm install
    ```

    Windows
    ```powershell
    PS C:\> cd 'C:\screenspace\api'
    PS C:\screenspace\api\> npm install
    ```

3. Establecer configuración

    Unix-based
    ```Bash
    $ cp example.env .env
    ```

    Windows
    ```powershell
    PS C:\screenspace\api\> copy example.env .env
    ```

4. Iniciar el backend

    Unix-based
    ```Bash
    # development
    npm run devstart

    # watch mode
    npm run start:dev

    # production mode
    npm run start:prod
    ```

    Windows
    ```powershell
    # development
    PS C:\screenspace\api\> npm run devstart
    
    # watch mode
    PS C:\screenspace\api\> npm run start:dev

    # production mode
    PS C:\screenspace\api\> npm run start:prod
    ```

4. Ingresar al [estado de salud](http://localhost:3000/api/health) del backend.

5. Ingresar a [Swagger](http://localhost:3000/api/swagger).

## Docker

_Instrucciones para ejecutar el backend mediante docker_

1. Construir imagen

Unix-based
```Bash
$ docker build . -t screenspace-api
```

Windows
```powershell
PS C:\screenspace\api\> docker build . -t screenspace-api
```

2. Ejecutar contenedor

Unix-based
```Bash
$ docker run --name screenspace-api -p 3000:3000 -d screenspace-api
```

Windows
```powershell
PS C:\screenspace\api\> docker run --name screenspace-api -p 3000:3000 -d screenspace-api
```

## Docker Compose

1. Ejecutar contenedores

Unix-based
```Bash
$ docker-compose up
```

Windows
```powershell
PS C:\screenspace\> docker-compose up
```

2. Detener contenedores

Unix-based
```Bash
$ docker-compose down
```

Windows
```powershell
PS C:\screenspace\> docker-compose down
```

## Ejecutando las pruebas ⚙️

Unix-based
```Bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

Windows
```powershell
PS C:\screenspace\api\> npm run test
```

### Análisis de pruebas end-to-end 🔩

Detallado en documento x

## Despliegue 📦

_Agregar notas adicionales sobre como hacer deploy_

## Construido con 🛠️

_herramientas utilizadas para crear el backend_

- [NodeJS](https://nodejs.org/es/)
- [ExpressJS](https://expressjs.com/es/)
- [Nest](https://github.com/nestjs/nest)
- [Mongoose](https://mongoosejs.com/)

## Versionado 📌

Usamos [SemVer](http://semver.org/) para el versionado. Para todas las versiones disponibles, mira los [tags en este repositorio](https://github.com/sbroccardi/dai-tp-backend/tags).

## Documentación
- [Miro](https://miro.com/app/board/uXjVMbn0zvo=/)

## Autores ✒️

* Sorgentini, Ignacio - *Legajo 1126105* (isorgentini@uade.edu.ar)
* Severi, Pedro - *Legajo 1129592* (peseveri@uade.edu.ar)
* Güerini, Timoteo - *Legajo 1106625* (tguerini@uade.edu.ar)
* Gil Broccardi, Sergio - *Legajo 1126105* (sgilbroccardi@uade.edu.ar)
