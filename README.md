# Trabajo práctico final

Vamos a programar algo que toda persona que programa hace al menos una vez en su vida: nuestro propio blog. Para esto vamos a definir una serie de endpoints RESTful para gestionar usuarios, posts y autenticación. Considerando la utilización de MongoDB y un middleware de autorización para usuarios administradores, los endpoints podrían quedar de la siguiente manera:

### **Usuarios**

- **`POST /users`** - Registro de nuevos usuarios. Cada usuario debe tener nombre de usuario, contraseña, y un booleano isAdmin
- **`POST /users/login`** - Inicio de sesión para usuarios.
- **`GET /users`** - Listado de usuarios
- **`GET /users/{id}`** - Obtener detalles de un usuario específico.
- **`PUT /users/{id}`** - Actualizar un usuario específico (solo su propio perfil o si es administrador).
- **`DELETE /users/{id}`** - Eliminar un usuario (solo administradores).

### **Posts**

- **`POST /posts`** - Crear un nuevo post (solo usuarios registrados). Los post tendrán id, título, autor, contenido y un array de categorías
- **`GET /posts`** - Listado de todos los posts. Debe admitir parámetros para paginar resultados (el default de resultados si no hay param será 10)
- **`GET /posts/{id}`** - Ver detalles de un post específico.
- **`PUT /posts/{id}`** - Actualizar un post (solo el autor o administradores).
- **`DELETE /posts/{id}`** - Eliminar un post (solo el autor o administradores).
- **`GET /posts/user/{userId}`** - Ver todos los posts de un usuario específico.

### **Búsqueda y Filtrado**

- **`GET /posts/search`** - Buscar posts por título, contenido, etc. Debe admitir parámetros para paginar resultados (el default de resultados si no hay param será 10)
- **`GET /posts/filter`** - Endpoints adicionales para filtrar posts por categoría o autor

### **Administración**

- **`GET /admin/users`** - Obtener todos los usuarios (solo administradores).
- **`DELETE /admin/users/{id}`** - Eliminar usuarios (solo administradores).
- **`GET /admin/posts`** - Obtener todos los posts con opciones de moderación (borrar o editar) (solo administradores).

Cada endpoint protegido debe ser asegurado mediante el middleware de autenticación, y para las rutas administrativas, un middleware adicional que verifique si el usuario es un administrador.

Los endpoints deberán ser documentados para poder ser consumidos por un frontend. También se incluirán test y logging donde corresponda.

# Notas

## Acceder a la base de datos de Docker

- Con el comando `docker ps` verificamos el id o nombre del contenedor

```bash
docker ps

CONTAINER ID   IMAGE         COMMAND                  CREATED              STATUS              PORTS                                       NAMES
fbc2e2b732c1   postgres:13   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   final-project-postgres-1
```

- Una vez que tenemos el id o nombre del contenedor, podemos acceder a la base de datos con el comando `docker exec`

```bash
docker exec -it fbc2e2b732c1 psql -U emi -d blog
```

- Para acceder a la base de datos, una vez dentro del contenedor, debemos acceder con las credenciales

```bash
# -U <nombre_usuario> -d <nombre_base_de_datos>
psql -U emi -d blog
```

### Comandos útlies de postgres

- `\d`: Lista las tablas
- `\d+ <nombre_tabla>`: Lista los campos de una tabla
- `\d+ <nombre_tabla> <nombre_campo>`: Lista los valores de un campo
- `\d+ <nombre_tabla> <nombre_campo>=<valor>`: Lista los valores de un campo que coincidan con el valor
- `\d+ <nombre_tabla> <nombre_campo>=<valor>`: Lista los valores de un campo que coincidan con el valor
- `\q`: Salir del psql
- `\l`: Lista las bases de datos
- `\c <nombre_base_de_datos>`: Cambia de base de datos
- `\dt`: Lista las tablas de la base de datos actual
