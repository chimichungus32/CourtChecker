FROM python:3.8.10-slim

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

CMD ["sh", "-c", "uvicorn main:app --port=$PORT --host=0.0.0.0"]