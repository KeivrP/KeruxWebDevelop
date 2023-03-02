# KeruxWebDevelopment

Sistema de manejo de tickets de soporte para Kentron Sistemas

## Preparación

Para instalar el sistema en cualquier ambiente es necesario:

### Hosts
---
* keruxweb: a dirección ip de la base de datos.

### Variables de Entorno
---
**REACT_APP_BACKEND**: Utilizada para definir el backend a usar en un ambiente determinado puede ser una de ***[production, staging, development]***.

**REACT_APP_MAINTENANCE**: Puede ser utilizada para colocar el sistema en modo mantenimiento limitando el acceso al frontend ***[true, false]*** por defecto esto es ***false*** y no es necesario setearla.

**REDIS_URL**: Utilizada para definir la ip y puerto en la cual se ejecuta redis por defecto ***"redis://localhost:6379/1"***.

### Herramientas Adicionales ###
---
El sistema requiere tener instalado [**Redis**](https://kentronsistemas.atlassian.net/l/c/0Vw3jTRQ) para el funcionamiento de los websockets.

### Bases de Datos
---
**Oracle**

El sistema utiliza la una base datos Oracle por lo que es necesario tener el [**Ambiente Oracle**](https://kentronsistemas.atlassian.net/l/c/q2B2JdFN).

## Instalación
Una vez culminada la preparación se siguen los pasos del [**How to Deploy**](https://kentronsistemas.atlassian.net/l/c/DaU3mnXZ) dependiendo del ambiente.
