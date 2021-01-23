# pull official base image
FROM ubuntu:focal

# set work directory
WORKDIR /usr/src/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# update apt-get
RUN apt-get update

# install python 3.9
RUN apt-get --assume-yes install software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt update
RUN apt-get --assume-yes install python3.9

# set python 3.9 as the default
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.9 1

# install psycopg2 dependencies
RUN apt-get --assume-yes install postgresql-12 python3.9-dev libpq-dev gcc python3-pip netcat libxml2-dev libxslt-dev

# install dependencies
RUN python -m pip install --upgrade pip setuptools wheel
COPY ./requirements.txt .
RUN python -m pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh .

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/usr/src/backend/entrypoint.sh"]
