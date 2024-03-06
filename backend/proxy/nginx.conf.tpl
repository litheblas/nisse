events {}
http {
        include /etc/nginx/mime.types;

        server {
        listen ${LISTEN_PORT};

        location /media {
            alias ${APP_ROOT}/nisse_backend/media;
            auth_request    /authorize/;
        }

        location = /authorize/ {
            proxy_pass http://${APP_HOST}:${APP_PORT}/authorize/;
            include         /etc/nginx/auth_params;
        }

        location / {
            proxy_pass      http://${APP_HOST}:${APP_PORT};
            include         /etc/nginx/proxy_params;
        }
    }
}
