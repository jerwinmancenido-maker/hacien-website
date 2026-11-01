# Cloud Agent base image: pin Node 20.20.2 (Hostinger-matched) + npm 10.
# Do not COPY project source; Cursor checks out the requested commit.
FROM ubuntu:24.04

ARG NODE_VERSION=20.20.2

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
        sudo \
        xz-utils \
        build-essential \
        python3 \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
       | tar -xJ -C /usr/local --strip-components=1 --no-same-owner \
    && echo "ubuntu ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/ubuntu \
    && chmod 0440 /etc/sudoers.d/ubuntu

USER ubuntu
WORKDIR /home/ubuntu
