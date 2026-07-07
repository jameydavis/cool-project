# Cool Project

A Ruby on Rails 8 app with Devise authentication and the [Astryx](https://astryx.atmeta.com/docs/getting-started) design system.

## Requirements

- Ruby 4.0.5 (see `.ruby-version`)
- Node.js 18+ and npm
- SQLite 3

## Setup

```bash
source bin/ruby-env
bin/bundle install
npm install
npm run build
bin/rails db:prepare
```

Or run everything at once:

```bash
bin/setup --skip-server
```

## Run locally

```bash
source bin/ruby-env
bin/dev
```

`bin/dev` starts three processes via Foreman:

- Rails server on **http://localhost:3000**
- JS watcher (esbuild → `app/assets/builds/astryx_app.js`)
- CSS watcher (esbuild → `app/assets/builds/astryx.css`)

## Homebrew Ruby note (macOS)

If `bundle install` fails with a permission error on `rdoc_plugin.rb`, always run:

```bash
source bin/ruby-env
```

before Bundler commands, or add the exports from `bin/ruby-env` to your `~/.zshrc`.

## Tests

```bash
source bin/ruby-env
bin/rails test
```
