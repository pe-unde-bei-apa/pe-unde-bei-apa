import pytest
from website.server.main import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_index_route(client):
    response = client.get("/")
    assert response.status_code == 302


def test_generate_route(client):
    response = client.get("/generate")
    assert response.status_code == 200


def test_reels_route(client):
    response = client.get("/reels")
    assert response.status_code == 200


def test_sentence_route(client):
    response = client.get("/sentence/1")
    assert response.status_code == 200


def test_vectorsearch_route(client):
    response = client.get("/vectorsearch")
    assert response.status_code == 200


def test_chat_route(client):
    response = client.get("/chat")
    assert response.status_code == 200
