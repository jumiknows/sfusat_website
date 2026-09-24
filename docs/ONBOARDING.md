# Website Team Onboarding

This guide is for new members working on the SFU SAT website.

You do not need to understand the whole site before making your first contribution.

## First day

1. Ask the web lead for GitHub repository access.
2. Ask for the team Figma and Google Drive access you need.
3. Join the team communication channel used for website work.
4. Read this guide and the project workflow.
5. Pick a small ticket from the website board.

## Local setup

Install Git, Node.js and an editor such as VS Code.

Then run:

```bash
git clone https://github.com/jumiknows/sfusat_website.git
cd sfusat_website
npm ci
npm start
```

Open http://localhost:3000.

## Find a task

Use the website GitHub Project.

Start with a ticket in Ready.

If you are new to the codebase, choose a small content fix, layout fix or issue marked as a good first task.

Assign the issue to yourself before starting.

## Create a branch

```bash
git checkout main
git pull
git checkout -b feat/short-description
```

For fixes, use a name such as `fix/mobile-navbar`.

For content, use a name such as `content/update-sponsors`.

## Make the change

Keep the change focused on the ticket.

Run the site locally while you work.

If the change is visual, check both desktop and mobile layouts.

## Check your work

Before opening a pull request, run:

```bash
npm run check
```

Fix failures before requesting review.

## Open a pull request

Explain what changed, why it changed and how you tested it.

Add screenshots for visible changes.

Link the pull request to the issue when there is one.

Wait for review before merging.

## Designers

Use the team Figma files for approved designs and handoff.

Keep component names and page names clear enough that a developer can match the design to the website.

Do not treat an unfinished concept as approved production content.

## Content and outreach members

You do not need to edit React for every request.

Create a content ticket with the exact text, page, image and source of approval.

For team member information, ask people to confirm their own name, role and photo. Do not identify people by guessing from photos.

## Web lead

The web lead should know who has access to GitHub, GitHub Pages, Squarespace DNS, Figma and approved media storage.

The web lead should also review the project board, open pull requests, Dependabot updates and failed GitHub Actions runs.

Do not store passwords or recovery codes in this repository.

## Useful reading

Read [PROJECT_WORKFLOW.md](PROJECT_WORKFLOW.md) for tickets and the board.

Read [MAINTENANCE.md](MAINTENANCE.md) for recurring website updates.

Read [../CONTRIBUTING.md](../CONTRIBUTING.md) before making larger code changes.
