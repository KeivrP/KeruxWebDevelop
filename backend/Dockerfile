# Crea una nueva imagen basada en Nginx con Passenger
FROM phusion/passenger-ruby30:latest

# Instala las dependencias del sistema necesarias para Oracle
RUN apt-get update -qq && \
    apt-get install -y libaio1 unzip

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

# Instalación de Ruby y establecimiento del entorno de trabajo
ENV RUBY_VERSION="3.0.0" \
    SHELL="/bin/bash"

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      git-core \
      curl \
      zlib1g-dev \
      build-essential \
      libssl-dev \
      libreadline-dev \
      libyaml-dev \
      libsqlite3-dev \
      sqlite3 \
      libxml2-dev \
      libffi-dev && \
      rm -rf /var/lib/apt/lists/* && \
    curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-installer | bash && \
    echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> $HOME/.bashrc && \
    echo 'eval "$(rbenv init -)"' >> $HOME/.bashrc && \
    . $HOME/.bashrc && \
    rbenv install $RUBY_VERSION && \
    rbenv global $RUBY_VERSION && \
    gem update --system && \
    gem install bundler && \
    rbenv rehash

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Copia el archivo tnsnames.ora necesario para la resolución del servicio TNS
COPY oracle/tnsnames.ora /opt/oracle/instantclient_11_2/network/admin/tnsnames.ora

# Establece el usuario que se utilizará para ejecutar el siguiente comando (no se ejecutará como root)
USER app

# Instala las gemas de Rails y la versión específica de Bundler
RUN gem install bundler:2.2.29 && \
    bundle install

# Agrega el servidor web Nginx y Passenger
RUN apt-get update && \
    apt-get install -y nginx-extras passenger nano

# Copia la configuración de Nginx y Passenger
COPY nginx/webapp.conf /etc/nginx/conf.d/
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80 para que Nginx pueda recibir solicitudes
EXPOSE 80

# Inicia Nginx y Passenger al iniciar el contenedor
CMD ["nginx", "-g", "daemon off;"]
