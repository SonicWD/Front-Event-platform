# CODE LAS CONNECT - Web Project

Este proyecto es parte de la iniciativa de nuestra nueva empresa CODE LAS CONNECT, centrada en la creación de soluciones innovadoras y experiencias web dinámicas. El proyecto cuenta con un backend desarrollado en FastAPI con autenticación mediante JWT, y un frontend construido con Vite, Tailwind CSS, y Framer Motion para animaciones fluidas y modernas.

## Características

- **Backend**: Implementado en FastAPI con JWT para autenticación segura.
- **Base de datos**:
    - SQLite en modo de desarrollo.
    - PostgreSQL para producción.
- **Frontend**: Construido con Vite, usando Tailwind CSS para estilos, Yup para validaciones de formularios y Framer Motion para las animaciones.

## Tecnologías Utilizadas

### Backend:
- Python (FastAPI)
- SQLite (Desarrollo)
- PostgreSQL (Producción)
- JWT (Autenticación)
- Uvicorn (Servidor ASGI)

### Frontend:
- Vite (Herramienta de construcción rápida)
- React (Biblioteca para la interfaz de usuario)
- Tailwind CSS (Estilos CSS utilitarios)
- Yup (Validaciones de formularios)
- Framer Motion (Animaciones)

## Instalación y Ejecución del Proyecto del back

### 1. Clonar el repositorio

```bash
git clone https://github.com/LASM24/event_app_backend
cd event_app_backend
```

### 2. Ejecución del Backend

#### Requisitos previos:
- Python 3.x
- Pip (gestor de paquetes de Python)
- PostgreSQL (solo para producción)

#### Configuración de entorno

Crea un entorno virtual:

```bash
python -m venv event-fapi
```

Activa el entorno virtual:

En Windows:

```bash
.\event-fapi\Scripts\activate
```

En Mac/Linux:

```bash
source event-fapi/bin/activate
```

Instala las dependencias del backend:

```bash
pip install -r requirements.txt
```


#### Iniciar el servidor de desarrollo:

```bash
uvicorn app.main:app --reload
```

El servidor estará disponible en [http://127.0.0.1:8000](http://127.0.0.1:8000).


### 3. Ejecución del Frontend

#### Requisitos previos:
- Node.js (Recomendado v14 o superior)
- Yarn o npm (gestores de paquetes de Node.js)

#### Instalación de dependencias

Ve al directorio del frontend y clona el repo del front:

```bash
git clone https://github.com/SonicWD/Front-Event-platform
```

Instala las dependencias:

Con npm:

```bash
npm install
```

Con Yarn:

```bash
yarn install
```

#### Iniciar el servidor de desarrollo:

Con npm:

```bash
npm run dev
```

Con Yarn:

```bash
yarn dev
```

El frontend estará disponible en [http://localhost:3000](http://localhost:3000).

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto, por favor sigue los siguientes pasos:

1. Fork el repositorio.
2. Crea una nueva branch.
3. Haz tus cambios.
4. Envía un pull request.

## Contacto

Este proyecto es parte de la empresa CODE LAS CONNECT. Si tienes alguna duda o deseas colaborar, no dudes en ponerte en contacto.
gracias por leer ;)