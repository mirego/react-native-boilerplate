# Build configuration
# -------------------

APP_NAME = `grep -m1 name package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
APP_VERSION = `grep -m1 version package.json | awk -F: '{ print $$2 }' | sed 's/[ ",]//g'`
GIT_REVISION = `git rev-parse HEAD`

# Linter and formatter configuration
# ----------------------------------

PRETTIER_FILES_PATTERN = '{src,__mocks__,__tests__}/**/*.{js,ts,tsx,svg,json}' '**/*.md'
SCRIPTS_PATTERN = '{src,__tests__,__mocks__}/**/*.{js,ts,tsx}'

# Introspection targets
# ---------------------

.PHONY: help
help: header targets

.PHONY: header
header:
	@echo "\033[34mEnvironment\033[0m"
	@echo "\033[34m---------------------------------------------------------------\033[0m"
	@printf "\033[33m%-23s\033[0m" "APP_NAME"
	@printf "\033[35m%s\033[0m" $(APP_NAME)
	@echo ""
	@printf "\033[33m%-23s\033[0m" "APP_VERSION"
	@printf "\033[35m%s\033[0m" $(APP_VERSION)
	@echo ""
	@printf "\033[33m%-23s\033[0m" "GIT_REVISION"
	@printf "\033[35m%s\033[0m" $(GIT_REVISION)
	@echo "\n"

.PHONY: targets
targets:
	@echo "\033[34mTargets\033[0m"
	@echo "\033[34m---------------------------------------------------------------\033[0m"
	@perl -nle'print $& if m{^[a-zA-Z_-\d]+:.*?## .*$$}' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-22s\033[0m %s\n", $$1, $$2}'

# Development targets
# -------------------

.PHONY: dependencies
dependencies: ## Install dependencies required by the application
	- yarn install
	- yarn run pod-install

.PHONY: ci-dependencies
ci-dependencies: ## Install dependencies required by the application in CI
	yarn install --frozen-lockfile

.PHONY: build-app
build-app: ## Build the application
	yarn build

.PHONY: ci-test
ci-test: ## Run the test suite in CI
	CI=true yarn test --forceExit --detectOpenHandles

.PHONY: test
test: ## Run the test suite
	yarn test --forceExit --detectOpenHandles

# Check, lint and format targets
# ------------------------------

.PHONY: check
check: check-format lint

.PHONY: check-all
check-all: check-format lint check-types

.PHONY: check-format
check-format:
	yarn prettier --check $(PRETTIER_FILES_PATTERN)

.PHONY: check-types
check-types:
	yarn tsc

.PHONY: format
format: ## Format project files
	- yarn prettier --write $(PRETTIER_FILES_PATTERN)
	- yarn eslint --fix $(SCRIPTS_PATTERN)
	- npx accent-cli format --order-by=key

.PHONY: lint
lint: ## Lint project files
	yarn eslint --max-warnings 0 $(SCRIPTS_PATTERN)

.PHONY: accent-sync
accent-sync:
	npx accent-cli sync --order-by=key --add-translations

# Versioning
# ------------------------------
.PHONY: build-version
build-version: 
	- bundle exec fastlane version v:build

.PHONY: patch-version
patch-version: 
	- bundle exec fastlane version v:patch

.PHONY: minor-version
minor-version:
	- bundle exec fastlane version v:minor

.PHONY: major-version
major-version:
	- bundle exec fastlane version v:major
