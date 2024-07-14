events {}
http {
        include /etc/nginx/mime.types;

        server {
        listen ${LISTEN_PORT};

        location /media {
            alias ${APP_ROOT}/nisse_backend/media;
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' '${FRONTEND_ORIGIN}';
                add_header 'Access-Control-Allow-Methods' 'GET, POST, UPDATE, DELETE, PUT, PATCH, OPTIONS';
                add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type, Accept';
                add_header 'Access-Control-Max-Age' 86400;
                return 204;
            }
            add_header 'Access-Control-Allow-Origin' '${FRONTEND_ORIGIN}';
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
