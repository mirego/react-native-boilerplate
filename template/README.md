# ProjectName

| Section                                               | Description                                            |
| ----------------------------------------------------- | ------------------------------------------------------ |
| [🎯 Objectives and context](#-objectives-and-context) | Project introduction and context                       |
| [🚧 Dependencies](#-dependencies)                     | Technical dependencies and how to install them         |
| [🏎 Kickstart](#-kickstart)                            | Details on how to kickstart development on the project |
| [🚀 Environments and builds](#-environments-and-builds)    | Environments, how to deploy and DevOps stuff           |

## 🎯 Objectives and context

…

### OS Support

| OS      | Constraint |
| ------- | ---------- |
| Android | 11+        |
| iOS     | 15+        |

## 🚧 Dependencies

- Node.js
- Yarn
- Ruby
- Bundler

Canonical versions of dependencies are located in `.tool-versions`.

### A note for node.js version managers

If you have installed node.js with a version manager e.g. asdf, nvm, etc. you will need to tell XCode where to find the node executable.

1. Create a file `ios/.xcode.env.local`
2. Add `export NODE_BINARY=path/to/node`

## 🏎 Kickstart

### Environment variables

All required environment variables are documented in [`.env`](./.env).

### Initial setup

1. Create `.env.local` from empty values in [`.env`](./.env)
2. Run the command `bundle install` to install the required packages for the setup
4. Install dependencies with `make dependencies`

### Run the application in development mode

First, start the development server:

```bash
yarn start
```

Second, either open the app on iOS:

- Open Xcode (ProjectName.xcworkspace) and press Play
- Or run the following command:

```bash
yarn run ios
```

Or Android:

- Open Android studio and press Play
- Or run the following command:

```bash
yarn run android
```

### Metro server error on Android

If you have a Metro error when running the Android app, try to run these commands in order to allow communications through port 8081:

```bash
adb reverse tcp:8081 tcp:8081
```

or if you have more than one device/emulator:

```bash
# List adb devices
adb devices

# Copy the device ID and enable port forwarding
adb -s <device ID> reverse tcp:8081 tcp:8081
```

### Tests

Tests can be ran with the following script and do not need any environment variables as they should not create side effects (eg. they should not make any network calls, they should not read from storage, etc.)

```bash
make test
```

### Linting and formatting

Several linting and formatting tools can be ran to ensure coding style consistency:

- `make lint` ensures TypeScript, JavaScript, TSX and JSX code follows our best practices
- `make check-format` ensures all code is properly formatted
- `make format` formats files using Prettier
- `make check-types` ensures our code passes typecheck

## 🚀 Environments and builds

…
