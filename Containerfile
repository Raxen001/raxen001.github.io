# developer container
FROM ghcr.io/gohugoio/hugo:latest

# i am mounting this via compose.yml
# COPY . /app

WORKDIR /app

EXPOSE 1313

# entrypoint passes the args to hugo
CMD ["server", "--disableFastRender", "-D", "--navigateToChanged", "--bind", "0.0.0.0", "--baseURL", "http://0.0.0.0/"]
