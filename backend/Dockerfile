FROM alpine:3.18.4

ENV APP_HOST=localhost
ENV APP_PORT=8000
ENV LISTEN_PORT=80
ENV APP_ROOT=/app
WORKDIR ${APP_ROOT}

ENV LANG=en_US.UTF-8 \
    PATH=${APP_ROOT}/bin:${PATH} \
    TZ=Europe/Stockholm

COPY apk-packages.txt ${APP_ROOT}/
RUN apk add --no-cache $(grep -vE "^\s*#" ${APP_ROOT}/apk-packages.txt | tr "\r\n" " ")

RUN pip3 install --no-cache-dir pipenv
COPY Pipfile Pipfile.lock ${APP_ROOT}/
RUN pipenv install --deploy
COPY . ${APP_ROOT}/

COPY ./proxy/proxy_params /etc/nginx/
COPY ./proxy/auth_params /etc/nginx/
COPY ./proxy/nginx.conf.tpl /etc/nginx/

COPY scripts/entrypoint.sh entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "./entrypoint.sh" ]
