events {}
http {
        include /etc/nginx/mime.types;

        server {
        listen ${LISTEN_PORT};

        location /media {
            alias ${APP_ROOT}/nisse_backend/media;
        }

        location / {
            proxy_pass      http://${APP_HOST}:${APP_PORT};
            include         /etc/nginx/proxy_params;
        }
    }
}
