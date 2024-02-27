# CUMaS Vote

CUMaS Vote was a self imposed hackathon to cobble together a voting site within one week to be used by CUMaS members to vote for their new committee.

It uses SvelteKit at its core, with data handling and realtime state management being handled by PocketBase.

## Deploying

**CUMaS Vote is still in Beta. Therefore, deploy at own risk!**

### Prerequisites
1. Server with NGINX or any preferred reverse proxy, configured to do HTTPS properly, and with the proper routing in place.
2. NodeJS version 17 or higher.

### Pocketbase

Install [PocketBase](https://pocketbase.io) (tested with pocketbase v0.13), create an admin user, and upload `pb_schema.json` to set up the required collections. This is just a base setup, and collections can be added and customised to suit your needs.

Also register a user with role set to `moderator`. This user will have access to the admin panel. Regular users should have their role set to `user`.

PocketBase should be configured to listen on localhost.

### NodeJS

To manage the app deployment, [pm2](https://pm2.keymetrics.io/) is highly recommended.

```bash
npm install pm2 -g
```

Then, clone this repo and build. At build time, the environment variables `HOST`, `PORT`, `ORIGIN`, `PUBLIC_POCKETBASE_URL` and `PUBLIC_VERSION` are expected.

```bash
git clone https://github.com/infinus-electronics/cumas-vote.git
npm install
HOST=127.0.0.1 ORIGIN=YOURVOTINGSITEURL PORT=NGINXPORT PUBLIC_POCKETBASE_URL=YOURURL PUBLIC_VERSION=x.x.x npm run build
```
For example:
```bash
HOST=127.0.0.1 ORIGIN=https://cumas-vote.infinus-electronics.net PORT=4500 PUBLIC_POCKETBASE_URL=https://cumas-vote.infinus-electronics.net/api PUBLIC_VERSION=0.8.0 node build
```
To run the app, the environment variables `HOST=localhost`, `ORIGIN=YOURVOTINGSITEURL`, and `PORT=NGINXPORT` need to be supplied to pm2. This configuration assumes that a reverse proxy, such as nginx is used, thus HOST will be localhost. ORIGIN should be set to the domain that you are running the app on, since it is required by Node to do its CSRF protection.

```bash
HOST=localhost ORIGIN=YOURVOTINGSITEURL PORT=NGINXPORT pm2 start ./build/index.js --name app-name
```

For example:

```bash
HOST=127.0.0.1 ORIGIN=https://cumas-vote.infinus-electronics.net PORT=4500 PUBLIC_POCKETBASE_URL=https://cumas-vote.infinus-electronics.net/api PUBLIC_VERSION=0.8.0 pm2 start ./build/index.js --name cumas-vote
```

It should now be up and running.

**IMPORTANT: Do NOT add slashes willy-nilly, for some reason if any of the URLs here have slashes added to their backs everything breaks!!!**

### NGINX

A very minimalist, non-https NGINX config is:

```
server {
    listen 80;
    listen [::]:80;
    # listen 443 ssl;
    server_name cumas-vote.infinus-electronics.net;

    location / {
        #try_files $uri $uri/ /index.html;
        #root /var/www/html;
        #index index.html;
        #proxy_set_header Connection '';
        proxy_http_version 1.1;
        #proxy_read_timeout 360s;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;

        proxy_pass http://127.0.0.1:4500;
        #proxy_redirect default;
    }

    location /api/ {
        # check http://nginx.org/en/docs/http/ngx_http_upstream_module.html#keepalive
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        proxy_read_timeout 360s;

        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_pass http://127.0.0.1:8090/;
    }
}

```

Needless to say, this config does not have HTTPS, and is therefore **not for production**.

It is only included as a sample, or if you're using something like cloudflare tunnels to handle the HTTPS.

## Developing

Since this project is powered by SvelteKit, you need to supply a `.env` file in the root directory containing `PUBLIC_POCKETBASE_URL` and `PUBLIC_VERSION` before running `npm run dev`.

### Architecture

Where possible, CUMaS vote was written to be client side rendered. The server only handles authentication and guarding of forbidden routes.

In some cases, SvelteKit's page load functions enabled by exporting `load()` in `+page.ts` files is used to do things like counting votes to not clutter up the main `.svelte` files. Because SvelteKit runs load functions once in the server and once in the client by default, you need to explicitly set SSR to be false because SSR fetching of data using the PocketBase SDK is flaky, especially its authentication.

Prefetch has also been disabled to prevent making too many calls to PocketBase API which will be trigerred if the user rapidly hovers over menu items. It should be safe to enable though, since the PocketBase SDK has autocancel built in.

The admin utilities are very crude (and dangerous), make sure you know what they do before using them to avoid ruining your data.

## Future improvements

- [ ] Better streamline the authentication logic to share auth state between client and server.
- [ ] Add support for voting multiple people for roles that have more than one vacancy.
- [ ] Add error message for login fails: as of now if you enter invalid credentials the page just refreshes and gives the user no clue what went wrong.
- [ ] Better, less reckless admin utilities.
- [ ] Matrix UI to view which candidates are running for which roles.
- [ ] Fancy charts to illustrate vote ranks.