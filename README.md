# andrew-kincaid.com
### Running the app with docker-compose
#### Development
- `docker-compose up -d --build`
#### Production
- `docker-compose -f docker-compose.prd.yml up -d --build`
### Viewing the logs
#### Development
- `docker-compose logs -f`
#### Production
- `docker-compose -f docker-compose.prd.yml logs -f`
### Running a bash shell in a service
- `docker-compose [-f docker-compose.prd.yml] <service> bash`
- Our services are web, backend, and db