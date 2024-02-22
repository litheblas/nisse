events {}
http {
        server {
        listen ${LISTEN_PORT};

        location /media {
            alias ${APP_ROOT}/nisse_backend/media;
            include         /etc/nginx/auth_params;
        }

        location = /verify {
            proxy_pass http://${APP_HOST}:${APP_PORT}/verify;
            proxy_pass_request_body off;
            proxy_set_header Content-Length "";
        }

        location / {
            proxy_pass      http://${APP_HOST}:${APP_PORT};
            include         /etc/nginx/proxy_params;
        }
    }
}
