# React Streaming Demo

Code demo from youtube video: [React Streaming In Depth: NextJS! Remix! DIY!
](https://www.youtube.com/watch?v=o3JWb04DRIs)

Added Next.js version and Remix version.


## Nginx config if you run it with your nginx server

```
server {
    listen 80;
    server_name your-dev-domain.test;
    
    # SSR
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Upgrade $http_upgrade;

        # Make sure to include this line; 
        # This means that the proxy will buffer the entire request before forwarding it to the proxied server if it is `on`.
        # For react steaming, we want to turn it off. We flush the buffer to the client as soon as we get some.
        proxy_buffering off;
    }
    
    # webpack-hmr
    # This is for hot module replacement
    location /_next/webpack-hmr {
        proxy_pass http://localhost3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}

```
