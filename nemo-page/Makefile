DOCKER_COMPOSE	:=	docker compose
DOCKER_COMPOSE_FILE	:=	./docker-compose.yaml
PROJECT_NAME	:=	nemo
NETWORK_NAME := network-inception

.PHONY:	all
all:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up --build

.PHONY:	up
up:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up

.PHONY:	down
down:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

.PHONY: clean
clean: down
	docker system prune --all

.PHONY: fclean
fclean: clean
	docker ps -aq | xargs docker rm

.PHONY: re
re: fclean all