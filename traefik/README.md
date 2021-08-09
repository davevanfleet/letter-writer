# Traefik Container

This container routes all traffic to the correct container based on subdomains or path prefexes. Note the following pain points with configuration, and suggested resolutions:

- error `uses a non-existent resolver: lets-encrypt`:
  - When this error appeaers in the logs, there likely is also a privacy/security error in the browser, `NET::ERR_CERT_AUTHORITY_INVALID`. Likely, the cert shown in the browser is the default Traefik cert, which is invalid.  The problem, essentially, is that there is bad data in `acme.json`.  For traefik to work properly, an empty file named `acme.json` needs to be created with `600` permission. Traefik will automatically write to this file with the auto generated certs from Let's Encrypt