# Deployers

Simple glue tools which make use of SSH, Docker, Docker Compose, Kubernetes (tbd), Handlebars ...
to present simple and clean interface for application deployment while enforcing standard and (hopefully) best practices.


## Gpg

Passphrase to the dev key is `pass`. Fingerprint if `895EA94211D99463FCDEF2753E0AB97B69A7F284`.


## TODO

- If run as npm script from Intellij idea there is program with Docker login via GCP.
- e2e tests runnable in CI 

### Features
- enforce log rotation settings in the Docker Compose file
- flag for app restart after config deployment
- improved logging (with professional logger lib)
- user friendly and clean error handling
- K8s support
- templateless app deployment (without Docker compose file or K8s files)
- export API for main functionality
- helpers for showing logs, status of service (?)
- health checks (?)

### Dev
- Gpg in CI image is not ready for tests yet.


