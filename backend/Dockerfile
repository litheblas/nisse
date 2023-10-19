FROM alpine:3.17.5

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
RUN pipenv run python3 manage.py collectstatic --no-input

EXPOSE 80
CMD [ "pipenv", "run", "web" ]
