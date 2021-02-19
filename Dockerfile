FROM python:3.9
# enabled buffered output to the docker terminal console
# output stores in buffer and displayed when buffer full
# thus saving some I/O calls or time
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY . /app


# this is the docker port
# we need to map this port with port of host in docker-compose
#CMD 'python manage.py runserver 0.0.0.0:8000'