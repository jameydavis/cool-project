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

Open **http://127.0.0.1:5000** (or http://localhost:5000).

`bin/dev` starts three processes via Foreman:

- Rails server on **http://localhost:5000**
- JS watcher (esbuild → `app/assets/builds/astryx_app.js`)
- CSS watcher (esbuild → `app/assets/builds/astryx.css`)

## Email in development

Password reset and other Devise emails are previewed with [letter_opener](https://github.com/ryanb/letter_opener). When you trigger a mailer (for example, via **Forgot your password?**), the email opens in your default browser instead of being sent to a real inbox.

Email links use the same port as the running app (`PORT`, default **5000**). Restart `bin/dev` after changing the port.

## Homebrew Ruby note (macOS)

Always run:

```bash
source bin/ruby-env
```

before Bundler/Rails commands (or add those exports to your `~/.zshrc`). This is required if:

- `bundle install` fails with a permission error on `rdoc_plugin.rb`
- you use **chruby** (or similar) and see “missing extensions” / gems not found — chruby leaves `GEM_HOME` pointed at another Ruby, and `bin/ruby-env` overrides that

## Tests

```bash
source bin/ruby-env
bin/rails test
```
