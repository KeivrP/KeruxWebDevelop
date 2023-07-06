# Utiliza la imagen base de Ruby 3.0.0
FROM ruby:3.0.0 as build-stage

# Instala las dependencias del sistema necesarias para Oracle
RUN apt-get update -qq && \
    apt-get install -y libaio1

# Crea el directorio /opt/oracle y asigna permisos adecuados
RUN mkdir -p /opt/oracle && \
    chmod 777 /opt/oracle

# Copia los archivos del cliente de Oracle a la imagen
COPY instantclient-basic-linux.x64-11.2.0.4.0.zip \
     instantclient-sdk-linux.x64-11.2.0.4.0.zip \
     /opt/oracle/

# Extrae los archivos del cliente de Oracle y realiza la configuración necesaria
RUN cd /opt/oracle && \
    unzip instantclient-basic-linux.x64-11.2.0.4.0.zip && \
    unzip instantclient-sdk-linux.x64-11.2.0.4.0.zip && \
    rm instantclient-basic-linux.x64-11.2.0.4.0.zip \
       instantclient-sdk-linux.x64-11.2.0.4.0.zip && \
    cd instantclient_11_2 && \
    ln -s libclntsh.so.11.1 libclntsh.so && \
    ln -s libocci.so.11.1 libocci.so

# Establece la variable de entorno LD_LIBRARY_PATH
ENV LD_LIBRARY_PATH="/opt/oracle/instantclient_11_2:$LD_LIBRARY_PATH"

# Agrega la carpeta del cliente de Oracle a la configuración ldconfig
RUN echo "/opt/oracle/instantclient_11_2" > /etc/ld.so.conf.d/oracle-instantclient.conf

# Actualiza los run-time bindings
RUN ldconfig

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Copia el archivo tnsnames.ora necesario para la resolución del servicio TNS
COPY oracle/tnsnames.ora /opt/oracle/instantclient_11_2/network/admin/tnsnames.ora

# Instala las gemas de Rails y la versión específica de Bundler
RUN gem install bundler:2.2.29 && \
    bundle install

# Crea una nueva imagen basada en Nginx con Passenger
FROM phusion/passenger-ruby30:latest

# Agrega el servidor web Nginx y Passenger
RUN apt-get update && \
    apt-get install -y nginx-extras passenger nano

# Copia la configuración de Nginx y Passenger
COPY nginx/webapp.conf /etc/nginx/conf.d/
COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app /app

# Expone el puerto 80 para que Nginx pueda recibir solicitudes
EXPOSE 80

# Inicia Nginx y Passenger al iniciar el contenedor
CMD ["nginx", "-g", "daemon off;"]
